import { readFile as fsReadFile } from "node:fs/promises";

export async function readFile(inputPath) {
  const text = await fsReadFile(inputPath, { encoding: "utf-8" });
  return text;
}

export function correctPath(path) {
  return path;
}
