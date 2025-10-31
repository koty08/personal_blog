import removeMd from "remove-markdown";

const markdownImageRegex = /!\[.*?\]\s*\(.*?\)/g;

export const getFirstImage = (content: string) => {
  const find = content.match(markdownImageRegex);
  if (!find) return null;
  const path = find[0].substring(4, find[0].length - 1);
  return path;
};

export const getAllImages = (content: string) => {
  const find = content.match(markdownImageRegex);
  if (!find) return [];
  return find.map((e) => e.substring(4, e.length - 1));
};

export const removeMDFromContent = (content: string) => {
  return removeMd(content);
};
