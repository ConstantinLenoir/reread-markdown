import resolve from "@rollup/plugin-node-resolve";

// $ rollup -c
export default {
  input: "src/index.js",
  output: {
    format: "iife",
    name: "rereadMarkdown",
    file: "reread-markdown.js",
  },
  plugins: [resolve()],
};
