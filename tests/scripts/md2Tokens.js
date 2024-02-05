/**
 * node tests/scripts/md2Tokens.js
 */

import { readFileSync } from "node:fs";
import { md2Tokens } from "reread-markdown";

const text = readFileSync("tests/data/subdivisions.md", "utf8");

console.log(md2Tokens(text));

console.log(
  md2Tokens(`
I am a very ***good*** *engineer* specialized in [**ML**](https://en.wikipedia.org/wiki/Machine_learning).

`)
);
