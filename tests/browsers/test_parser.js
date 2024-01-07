import { assert } from "../../node_modules/chai/chai.js";

import * as conftest from "./conftest.js";
import { runTests } from "./../core/test_parser.js";

runTests(
  rereadMarkdown.Parser,
  conftest.readFile,
  assert,
  conftest.correctPath
);
