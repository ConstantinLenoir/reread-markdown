import { strict as assert } from "node:assert";

import { Parser } from "reread-markdown";
import * as conftest from "./conftest.js";
import { runTests } from "./../core/test_parser.js";

runTests(Parser, conftest.readFile, assert, conftest.correctPath);
