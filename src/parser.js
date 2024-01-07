import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";

/**
 * The *mdast* specification.
 * Composition over inheritance.
 */
export class Parser {
  static layoutTypes = [
    "heading",
    "paragraph",
    "break",
    "thematicBreak",
    "list",
    "listItem",
  ];

  static parse(text) {
    return fromMarkdown(text);
  }

  static getChildren(tree, node) {
    return "children" in node ? node.children : [];
  }

  static toString(tree) {
    return toString(tree);
  }
}
