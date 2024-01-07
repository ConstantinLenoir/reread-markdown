export function runTests(reread, readFile, assertEqual, correctPath) {
  async function compareIO(f, inputPath, outputPath, options = {}) {
    try {
      inputPath = correctPath(inputPath);
      outputPath = correctPath(outputPath);
      const input = await readFile(inputPath);
      const expectedOutput = await readFile(outputPath);
      const output = f(input, options);
      assertEqual(output, expectedOutput);
    } catch (err) {
      throw err;
    }
  }

  function f(text, options) {
    return reread(text, options).toJSON();
  }

  describe("Test reread()", function () {
    it("Reread a simple example", async function () {
      await compareIO(
        f,
        "tests/data/example.md",
        "tests/data/example.reread.json"
      );
    });
    it("Reread a complex example", async function () {
      await compareIO(
        f,
        "tests/data/subdivisions.md",
        "tests/data/subdivisions.reread.json"
      );
    });
    it("Reread Markdown with tokens", async function () {
      await compareIO(
        f,
        "tests/data/rich_text.md",
        "tests/data/rich_text.tokens.json",
        { tokenize: true, normalizeText: true }
      );
    });
  });

  describe("Test reread() with tokens", function () {
    it("Simple example", async function () {
      await compareIO(
        f,
        "tests/data/example.md",
        "tests/data/example.tokens.json",
        {
          tokenize: true,
          normalizeText: true,
        }
      );
    });
    it("Complex example", async function () {
      await compareIO(
        f,
        "tests/data/rich_text.md",
        "tests/data/rich_text.tokens.json",
        { tokenize: true, normalizeText: true }
      );
    });
  });
}
