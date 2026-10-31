const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const externalUrl = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

export function withBase(path = '/') {
    if (externalUrl.test(path)) return path;
    if (path === base || path.startsWith(`${base}/`)) return path;

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
}
