import removeMd from "remove-markdown";

const markdownImageRegex = /!\[.*?\]\s*\((.*?)\)/g;

export const getFirstImage = (content: string) => {
  const match = markdownImageRegex.exec(content);
  markdownImageRegex.lastIndex = 0;
  return match ? match[1] : null;
};

export const getAllImages = (content: string) => {
  return [...content.matchAll(markdownImageRegex)].map((m) => m[1]);
};

export const removeMDFromContent = (content: string) => {
  return removeMd(content);
};
