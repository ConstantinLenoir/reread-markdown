import { readFileSync } from "node:fs";
import { reread } from "reread-markdown";

const text = readFileSync("tests/data/subdivisions.md", "utf8");

console.log(reread(text).toJSON());
