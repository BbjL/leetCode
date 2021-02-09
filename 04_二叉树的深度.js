/* 

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：
给定二叉树 [3,9,20,null,null,15,7]，

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const root = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
      val: 20,
      left: { val: 15, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  };

/**
 * @param {TreeNode} root
 * @return {number}
 */
// 深度优先遍历
function maxDepth_deepFitst (root) {
    if (root === null) {
        return 0
    }
    return Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1);
};

// 广度优先遍历
function maxDepth_widthFirst () {
  if (root === null) {
    return 0;
  }

  let depth = 0;
  let bfs = [root];

  while (bfs.length) {

    depth++;
    let tempBfs = [];

    for (let i = 0; i < bfs.length; i++) {
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


console.log(maxDepth_widthFirst(root));