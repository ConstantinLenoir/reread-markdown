import { strict as assert } from "node:assert";

import { runTests } from "./../core/test_tree.js";
import { Tree } from "reread-markdown";

runTests(Tree, assert);
