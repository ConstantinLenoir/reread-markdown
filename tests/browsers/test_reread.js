import { assert } from "../../node_modules/chai/chai.js";
import { runTests } from "./../core/test_reread.js";
import * as conftest from "./conftest.js";
//import { reread } from "reread-markdown.js";
const reread = rereadMarkdown.reread;

function assertEqual(output, expectedOutput) {
  assert.deepEqual(output, JSON.parse(expectedOutput));
}

runTests(reread, conftest.readFile, assertEqual, conftest.correctPath);
