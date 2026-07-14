import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const readMarkdownFiles = <T>(folder: string): T[] => {
  const directory = path.join(CONTENT_DIR, folder);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const { data } = matter(source);
      return data as T;
    });
};

export const readMarkdownFile = <T>(
  folder: string,
  filename: string,
): T | null => {
  const filePath = path.join(CONTENT_DIR, folder, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);
  return data as T;
};
