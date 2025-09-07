export default function getImageFromContents(content: string) {
  const find = content.match(/\!\[\]\(\/.*\)/);
  if (!find) return null;
  const path = find[0].substring(4, find[0].length - 1);
  return path;
}
