const markdownImageRegex = /!\[.*?\]\s*\(.*?\)/g;

export const getFirstImage = (content: string) => {
  const find = content.match(markdownImageRegex);
  if (!find) return null;
  const path = find[0].substring(4, find[0].length - 1);
  return path;
};

export const filterMarkdownImages = (content: string) => {
  const filteredText = content.replace(markdownImageRegex, "");
  return filteredText;
};
