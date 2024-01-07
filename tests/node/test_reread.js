import { strict as assert } from "node:assert";

import * as conftest from "./conftest.js";
import { runTests } from "../core/test_reread.js";
import { reread } from "reread-markdown";

function assertEqual(output, expectedOutput) {
  assert.deepEqual(output, JSON.parse(expectedOutput));
}

runTests(reread, conftest.readFile, assertEqual, conftest.correctPath);
