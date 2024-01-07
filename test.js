import { readFileSync } from "node:fs";
import markdownit from "markdown-it";
const md = markdownit();

const text = readFileSync("tests/data/subdivisions.md", "utf8");

console.log(JSON.stringify(md.parse(text)), { depth: 10 });
