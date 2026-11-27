import contributionsData from '../data/github-contributions.json';

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  isFuture?: boolean;
}

export interface HeatmapWindow {
  days: HeatmapDay[];
  weeks: number;
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
}

const DAYS_IN_WEEK = 7;

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getStartOfWeek(date: Date): Date {
  const start = new Date(date);
  const dayOffset = (start.getDay() + 6) % 7;
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - dayOffset);

  return start;
}

function toLevel(value: number): 0 | 1 | 2 | 3 | 4 {
  if (value >= 4) return 4;
  if (value === 3) return 3;
  if (value === 2) return 2;
  if (value === 1) return 1;
  return 0;
}

export function createGitHubHeatmap(weeks = 24): HeatmapWindow {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const safeWeeks = Math.max(1, Math.floor(weeks));
  const start = getStartOfWeek(today);
  start.setDate(start.getDate() - (safeWeeks - 1) * DAYS_IN_WEEK);

  const entriesByDate = new Map(
    (contributionsData.days as { date: string; count: number; level: number }[]).map((entry) => [
      entry.date,
      entry,
    ]),
  );

  const days: HeatmapDay[] = [];

  for (let index = 0; index < safeWeeks * DAYS_IN_WEEK; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = getDateKey(date);
    const isFuture = date > today;
    const entry = isFuture ? undefined : entriesByDate.get(key);

    days.push({
      date: key,
      count: entry?.count ?? 0,
      level: isFuture ? 0 : toLevel(entry?.level ?? 0),
      isFuture,
    });
  }

  const pastDays = days.filter((day) => !day.isFuture);
  const totalContributions = pastDays.reduce((sum, day) => sum + day.count, 0);
  const activeDays = pastDays.filter((day) => day.count > 0).length;

  let cursor = pastDays.length - 1;
  if (cursor >= 0 && pastDays[cursor].count === 0) {
    cursor -= 1;
  }

  let currentStreak = 0;
  while (cursor >= 0 && pastDays[cursor].count > 0) {
    currentStreak += 1;
    cursor -= 1;
  }

  return {
    days,
    weeks: safeWeeks,
    totalContributions,
    activeDays,
    currentStreak,
  };
}
