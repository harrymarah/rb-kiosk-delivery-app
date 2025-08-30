export const getProxiedImageUrl = (src: string): string => {
  if (!src) return '/placeholder.svg';
  // Only proxy external images; keep local/public assets as-is
  if (/^https?:\/\//i.test(src)) {
    try {
      const u = new URL(src);
      // images.weserv.nl expects host + path (no protocol). URL encodes spaces automatically in pathname
      const hostAndPath = `${u.host}${u.pathname}${u.search}`;
      return `https://images.weserv.nl/?url=${hostAndPath}&w=800&h=800&fit=contain&output=webp`; // optimize and improve reliability
    } catch {
      return '/placeholder.svg'; // fallback to placeholder if URL parsing fails
    }
  }
  return src;
};

