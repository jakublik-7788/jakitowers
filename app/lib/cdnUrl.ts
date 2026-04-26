const CDN_BASE = process.env.NEXT_PUBLIC_CDN_URL ?? "";

export const cdnUrl = (path: string): string => {
  console.log("CDN_BASE:", CDN_BASE, "path:", path);
  if (!path) return path;
  if (path.startsWith("http")) return path;
  return CDN_BASE + path;
};