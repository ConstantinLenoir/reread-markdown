export function runTests(Tree, assert) {
  describe("Test Tree in a simple case", function () {
    let tree;
    let expectedAttributes;
    let nodeToTest;
    class Visitor {
      constructor() {
        this.visitHist = [];
      }
      visit(node, parents) {
        this.visitHist.push([node, parents.length]);
      }
      depart(node, parents) {
        return null;
      }
    }
    this.beforeEach(function () {
      tree = new Tree();
      let _node = tree.addNode();
      tree.addNode({ parentNode: _node });
      expectedAttributes = { foo: "bar" };
      nodeToTest = tree.addNode({ attributes: expectedAttributes });
    });
    it("Check adjency list", function () {
      assert.deepEqual(tree.graph, [[1, 3], [2], [], []]);
    });
    it("Check predecessors", function () {
      assert.deepEqual(tree.predecessors, [0, 0, 1, 0]);
    });
    it("Check node attributes", function () {
      assert.deepEqual(tree.attributes[nodeToTest], expectedAttributes);
    });
    it("Test visit()", function () {
      // [visitedNode, level] tuples.
      const expectedVisitData = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 1],
      ];
      const visitor = new Visitor();
      Tree.visit(tree, tree.root, visitor);
      assert.deepEqual(visitor.visitHist, expectedVisitData);
    });
    it("Test visit() with SKIP signal", function () {
      // [visitedNode, level] tuples.
      const expectedVisitData = [
        [0, 0],
        [1, 1],
        [3, 1],
      ];
      class SkipVisitor extends Visitor {
        visit(node, parents) {
          super.visit(node, parents);
          if (node === 1) return Tree.SKIP;
        }
      }
      const visitor = new SkipVisitor();
      Tree.visit(tree, tree.root, visitor);
      assert.deepEqual(visitor.visitHist, expectedVisitData);
    });
    it("Test visit() with EXIT signal", function () {
      // [visitedNode, level] tuples.
      const expectedVisitData = [
        [0, 0],
        [1, 1],
      ];
      class ExitVisitor extends Visitor {
        visit(node, parents) {
          super.visit(node, parents);
          if (node === 1) return Tree.EXIT;
        }
      }
      const visitor = new ExitVisitor();
      Tree.visit(tree, tree.root, visitor);
      assert.deepEqual(visitor.visitHist, expectedVisitData);
    });
    it("Test toJSON()", function () {
      const expected_output = {
        data: null,
        children: [
          {
            data: null,
            children: [{ data: null, children: [] }],
          },
          { data: { foo: "bar" }, children: [] },
        ],
      };
      assert.deepEqual(tree.toJSON(), expected_output);
    });
  });
}
