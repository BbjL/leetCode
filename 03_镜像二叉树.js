/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function(root) {
    if (!root) {
        return null
    }
    const tempTree = root.left;
    root.left = root.right;
    root.right = tempTree;

    mirrorTree(root.left);
    mirrorTree(root.right);
    return root;
};

const root = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
      val: 20,
      left: { val: 15, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  };
