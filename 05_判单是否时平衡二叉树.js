/* 

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

*/

// 深度优先
function maxDepth (root) {
  if (root == null) {
    return 0;
  }
  return Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1);
}

// 广度优先 获取深度
function maxDepth_widthFirst (root) {
  if (roo === null) return 0

  let depth = 0;
  const bfs = [root]; // 用来存储每一层的的所有节点

  while (bfs.length) { //遍历当前层的所有节点
    depth++;
    const tempBfs = [];

    for (let i = 0; i < bfs.length; i++) { // 如果有子节点则添加到下一层所有节点
      if (bfs[i].left) {
        tempBfs.push(bfs[i].left);
      } 
      if (bfs[i].right) {
        tempBfs.push(bfs[i].right);
      } 
    }
    bfs = tempBfs;
  }

  return depth;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  if (root === null) {
    return true
  }
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  if (Math.abs(leftDepth - rightDepth) > 1) return false; // 
  return isBalanced(root.left) && isBalanced(root.right);
};

const root = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: {val: 14, left: null, right: null}, right: null },
    right: { val: 7, left: null, right: null },
  },
};

console.log(isBalanced(root));