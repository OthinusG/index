import { access, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'smol-toml';

const ROOT = resolve(import.meta.dir, '..');
const CONFIG_PATH = resolve(ROOT, 'src/config/site.toml');
const OUTPUT_PATH = resolve(ROOT, 'src/data/github-contributions.json');
const TIMEOUT_MS = 20_000;
const ATTEMPTS = 3;

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionSnapshot {
  user: string;
  syncedAt: string;
  days: ContributionDay[];
}

async function getGitHubLogin(): Promise<string> {
  const raw = await readFile(CONFIG_PATH, 'utf8');
  const config = parse(raw) as { config?: { profile?: { github?: string } } };
  const login = config.config?.profile?.github?.match(/github\.com\/([^/?#]+)/)?.[1];

  if (!login) {
    throw new Error(`Cannot determine GitHub login from profile.github in ${CONFIG_PATH}`);
  }

  return login;
}

function parseContributions(html: string): ContributionDay[] {
  const cells = new Map<string, ContributionDay & { id?: string }>();

  for (const match of html.matchAll(/<td([^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*)>/g)) {
    const attrs = match[1];
    const date = match[2];
    const level = Number(attrs.match(/data-level="(\d)"/)?.[1] ?? 0);
    const id = attrs.match(/id="([^"]+)"/)?.[1];

    cells.set(date, { date, count: 0, level, id });
  }

  const tooltips = new Map<string, string>();

  for (const match of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)) {
    tooltips.set(match[1], match[2]);
  }

  for (const day of cells.values()) {
    const tooltip = day.id ? tooltips.get(day.id) : undefined;
    const count = tooltip?.match(/^([\d,]+)\s+contributions?\b/)?.[1];

    if (count) {
      day.count = Number(count.replace(/,/g, ''));
    }
  }

  return [...cells.values()]
    .map(({ date, count, level }) => ({ date, count, level }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchContributions(
  login: string,
): Promise<{ html: string; days: ContributionDay[] }> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(`https://github.com/users/${login}/contributions`, {
        headers: {
          Accept: 'text/html',
          'Accept-Language': 'en',
          'User-Agent': 'OthinusG-site-contribution-sync',
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`GitHub returned HTTP ${response.status}`);
      }

      const html = await response.text();
      const days = parseContributions(html);

      if (days.length < 300) {
        throw new Error(`Parsed only ${days.length} contribution days`);
      }

      const reportedTotal = Number(
        html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1]?.replace(/,/g, '') ?? 0,
      );
      const parsedTotal = days.reduce((sum, day) => sum + day.count, 0);

      if (reportedTotal > 0 && parsedTotal === 0) {
        throw new Error('Contribution counts could not be parsed');
      }

      return { html, days };
    } catch (error) {
      lastError = error;
      console.warn(`[contributions] Attempt ${attempt}/${ATTEMPTS} failed: ${String(error)}`);

      if (attempt < ATTEMPTS) {
        await new Promise((resolveTimeout) => setTimeout(resolveTimeout, attempt * 1500));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function main() {
  const login = await getGitHubLogin();

  try {
    const { html, days } = await fetchContributions(login);
    const snapshot: ContributionSnapshot = {
      user: login,
      syncedAt: new Date().toISOString(),
      days,
    };

    await writeFile(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

    const total = days.reduce((sum, day) => sum + day.count, 0);
    const reportedTotal = html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1];
    console.log(
      `[contributions] Synced ${days.length} days, ${total} contributions` +
        (reportedTotal ? ` (GitHub reports ${reportedTotal} in the last year)` : ''),
    );
  } catch (error) {
    try {
      await access(OUTPUT_PATH);
      console.warn(
        `[contributions] Sync failed, keeping the existing snapshot at ${OUTPUT_PATH}: ${String(error)}`,
      );
    } catch {
      throw error;
    }
  }
}

await main();
