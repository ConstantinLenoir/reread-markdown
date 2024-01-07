export async function runTests(Parser, readFile, assert, correctPath) {
  describe("Test Parser", function () {
    let text;
    let expectedSTree;
    this.beforeEach(async function () {
      text = await readFile(correctPath("tests/data/example.md"));
      expectedSTree = JSON.parse(
        await readFile(correctPath("tests/data/syntax_tree.json"))
      );
    });
    it("Validate the structure of the Markdown syntax trees", function () {
      //
      const tree = Parser.parse(text);
      assert.deepEqual(tree, expectedSTree);
    });
  });
}
