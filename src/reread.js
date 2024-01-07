import { Parser } from "./parser.js";
import { Tree } from "./tree.js";

export function reread(
  text,
  { rootTitle = "", tokenize = false, normalizeText = false } = {}
) {
  // Syntax tree.
  let sTree = Parser.parse(text);
  let rereadTree = null;
  let visitor;
  if (tokenize) {
    // *contents* and *title* are lists.
    rereadTree = new Tree({
      title: rootTitle === "" ? [] : rootTitle,
      depth: 0,
    });
    visitor = new TokenVisitor(text, rereadTree, normalizeText);
  } else {
    // *contents* and *title* are strings.
    rereadTree = new Tree({
      title: rootTitle,
      depth: 0,
    });
    visitor = new Visitor(text, rereadTree);
  }
  Tree.visit(sTree, sTree, visitor, Parser.getChildren);
  // After the last visit, some file contents may remain not attached.
  visitor.finalizeVisit();
  return rereadTree;
}

class Visitor {
  /**
   *
   * A Markdown syntax tree is visited in order to create a new tree reflecting
   * the structure of the parsed document.
   * The input tree is an ordered tree. It is visited using a DFS traversal.
   * The order corresponds to the parsed document flow.
   * Two types of nodes are distinguished: the heading nodes on the one hand and
   * the other nodes on the other hand. Contents (tokens) are accumulated until a
   * new heading node is encountered. Then, the previously encountered heading node is updated.
   * The output tree contains only heading nodes.
   * These nodes have two attributes: a title and contents.
   * https://github.com/syntax-tree/mdast
   *
   * The Visitor design pattern.
   * Visitors can accumulate *state* as they visit each element in a tree.
   * Transform a tree into another one, designed for printing.
   * JavaScript/Reference/Operators/this
   * There are the input tree and the output tree.
   *
   * Some information about the syntax tree is known by the visitor.
   *
   *
   */
  constructor(text, tree) {
    // Input text.
    this.text = text;
    this.tree = tree;
    this.currNodeOut = this.tree.root;
    this.currentDepth = this.tree.attributes[this.currNodeOut].depth;
    this.currentIndex = 0;
    // Contents related to a specific part of the document.
    this.tokens = [];
    this.visit = this.visit.bind(this);
  }
  /**
   * The nodes "in" (nodeIn) are visited.
   * They have not the same structure as the nodes "out" (nodeOut).
   * updateCurrNodeOut() and updateTokens() can be redefined by subclassing.
   * Contents (tokens) are accumulated until a new heading node is encountered. Then,
   * the previous heading node is updated.
   */
  visit(nodeIn, ancestors) {
    if (nodeIn.type === "heading") {
      return this.visitHeading(nodeIn, ancestors);
    } else {
      return this.updateTokens(nodeIn, ancestors);
    }
  }

  visitHeading(nodeIn, ancestors) {
    // The current "node out" is the previous heading node we encountered.
    this.updateCurrNodeOut(nodeIn);
    const parentNodeOut = this.findParentOut(nodeIn);
    const newNodeOut = this.tree.addNode({
      parentNode: parentNodeOut,
      attributes: {
        title: this.formatHeading(nodeIn),
        depth: nodeIn.depth,
        contents: null,
      },
    });
    this.currNodeOut = newNodeOut;
    return Tree.SKIP;
  }

  depart(nodeIn, ancestors) {
    return null;
  }
  /**
   *
   * Find the parent heading node of *nodeIn* among the heading nodes that have
   * been encountered so far.
   */
  findParentOut(nodeIn) {
    let parentNodeOut = this.currNodeOut;
    let parentDepth = this.tree.attributes[parentNodeOut].depth;
    while (parentDepth >= nodeIn.depth) {
      parentNodeOut = this.tree.predecessors[parentNodeOut];
      parentDepth = this.tree.attributes[parentNodeOut].depth;
    }
    return parentNodeOut;
  }
  /**
   *
   * The *tokens* field.
   */
  updateTokens(nodeIn, ancestors) {
    // Do something with this.tokens.
    return null;
  }
  /**
   * Attach the accumulated contents to the current *node out*.
   * *nodeIn* denotes the start of a new section of the document.
   */
  updateCurrNodeOut(nodeIn) {
    const endIndex = nodeIn.position.start.offset;
    const tokens = this.text.substring(this.currentIndex, endIndex);
    this.tree.attributes[this.currNodeOut]["contents"] = tokens;
    this.currentIndex = nodeIn.position.end.offset;
  }

  finalizeVisit() {
    const tokens = this.text.substring(this.currentIndex, this.text.length);
    this.tree.attributes[this.currNodeOut]["contents"] = tokens;
  }

  formatHeading(nodeIn) {
    const startIndex = nodeIn.position.start.offset;
    const endIndex = nodeIn.position.end.offset;
    return this.text.substring(startIndex, endIndex);
  }
}

class PrettyVisitor extends Visitor {
  formatHeading(nodeIn) {
    return Parser.toString(nodeIn);
  }
}

class TokenVisitor extends Visitor {
  /**
   * Some tokens are special: they are no text and they have a special
   * label prefixed by "new" for denoting their layout (new lines) meaning.
   *
   * Token labels correspond to the ancestors in the syntax tree.
   */
  constructor(text, tree, normalizeText) {
    super(text, tree);
    this.normalizeText = normalizeText;
  }

  visitHeading(nodeIn, ancestors) {
    this.updateCurrNodeOut(nodeIn);
    return null;
  }

  updateTokens(nodeIn, ancestors) {
    if (nodeIn.type === "text") {
      const labels = ancestors.map((ancestor) => ancestor.type);
      let text = this.normalizeText
        ? this.removeSpaces(nodeIn.value)
        : nodeIn.value;
      let newToken = { text: text, labels };
      if (labels.includes("link")) {
        const linkNode = ancestors.find((node) => node.type === "link");
        newToken.url = linkNode.url;
      }
      this.tokens.push(newToken);
    } else if (Parser.layoutTypes.includes(nodeIn.type)) {
      const labels = ancestors.map((ancestor) => ancestor.type);
      this.tokens.push({
        text: "",
        labels: [...labels, `new${this.capitalizeFirstLetter(nodeIn.type)}`],
      });
    }
  }

  depart(nodeIn, ancestors) {
    if (nodeIn.type === "heading") {
      const parentNodeOut = this.findParentOut(nodeIn);
      const newNodeOut = this.tree.addNode({
        parentNode: parentNodeOut,
        attributes: {
          title: this.tokens,
          depth: nodeIn.depth,
          contents: null,
        },
      });
      this.tokens = [];
      this.currNodeOut = newNodeOut;
    }
  }

  updateCurrNodeOut(nodeIn) {
    this.tree.attributes[this.currNodeOut]["contents"] = this.tokens;
    this.tokens = [];
  }

  finalizeVisit() {
    this.updateCurrNodeOut(null);
  }
  /**
   * To comply with the Mardown specification, space characters must be
   * processed specifically.
   */
  removeSpaces(text) {
    return text.replace(/[\n|\r\n]+/g, " ").replace(/[ ]{2,}/g, " ");
  }

  capitalizeFirstLetter(s) {
    return s ? `${s[0].toUpperCase()}${s.substring(1)}` : s;
  }
}
