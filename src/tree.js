export { Tree };

class Tree {
  /*
    Nodes are integers. They are stored in an adjacency list. A predecessor array is also 
    maintained internally.
    N-ary tree.
    */

  static SKIP = "skipSubtree";
  static EXIT = "exitVisit";

  constructor(rootAttributes = null) {
    this.root = 0;
    // Adjacency list.
    this.graph = [[]];
    // Node attributes.
    this.attributes = [rootAttributes];
    this.predecessors = [0];
    this.n = 1;
  }

  addNode({ parentNode = 0, attributes = null } = {}) {
    this.graph.push([]);
    this.attributes.push(attributes);
    const newNode = this.n;
    this.graph[parentNode].push(newNode);
    this.predecessors.push(parentNode);
    this.n++;
    return newNode;
  }
  /**
   * Visited nodes can be mutated by the visitor.
   * DFS pre-order traversal. The Cursor concept. Siblings.
   * Callback function.
   * As an elaborate Visitor can accumulate state, a simple DFS visit method should
   * be sufficient for all cases...
   * *visitor* is supposed to have two methods: visit() and depart(). *depart()* is called on a
   * node when its subtree has been visited.
   */
  static visit(tree, root, visitor, getChildren = null) {
    if (!(typeof getChildren === "function")) {
      getChildren = function (tree, node = null) {
        if (node === null) node = tree.root;
        return tree.graph[node];
      };
    }
    let nextIndexStack = [0];
    let nodeStack = [root];
    const signal = visitor.visit(root, []);
    if ([Tree.SKIP, Tree.EXIT].includes(signal)) return root;
    while (nodeStack.length) {
      const node = nodeStack.pop();
      const nextIndex = nextIndexStack.pop();
      const children = getChildren(tree, node);
      if (nextIndex < children.length) {
        const newNode = children[nextIndex];
        // A shallow copy of the ancestor stack is passed to the visitor.
        const signal = visitor.visit(newNode, [...nodeStack, node]);
        if (signal === Tree.EXIT) return newNode;
        if (signal === Tree.SKIP) {
          nodeStack.push(node);
          nextIndexStack.push(nextIndex + 1);
        } else {
          nodeStack.push(node, newNode);
          nextIndexStack.push(nextIndex + 1, 0);
        }
      } else {
        const signal = visitor.depart(node, [...nodeStack]);
        if (signal === Tree.EXIT) return node;
      }
    }
  }

  /**
   *
   * Under the assumption that parents are visited before children.
   */
  toJSON() {
    class Visitor {
      constructor(tree) {
        this.tree = tree;
        this.jsonTree = {};
        // Use an array as a map.
        this.outputNodes = Array(tree.n);
      }
      visit(node, ancestors) {
        // Initialization.
        if (!ancestors.length) {
          // Root.
          this.jsonTree = {
            data: this.tree.attributes[this.tree.root],
            children: [],
          };
          this.outputNodes[this.tree.root] = this.jsonTree;
        } else {
          let parentNode = ancestors.pop();
          const newOutputNode = {
            data: this.tree.attributes[node],
            children: [],
          };
          this.outputNodes[parentNode].children.push(newOutputNode);
          this.outputNodes[node] = newOutputNode;
        }
      }

      depart(node, ancestors) {
        return null;
      }
    }
    const visitor = new Visitor(this);
    Tree.visit(this, this.root, visitor);
    return visitor.jsonTree;
  }
}
