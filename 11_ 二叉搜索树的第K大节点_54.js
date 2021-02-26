
/* 

    二叉搜索树（又称为二叉查找树，二叉排序树）
        1. 二叉树的三种排序： 先序 中序 后序
        2.二叉排序树使用中序遍历是一个从小到大的

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
 * 使用逆中序遍历，第K个就是目标
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    if (root === null) return;

    const stack = [];
    let count = 0;

    while (root || stack.length) {
        if (root) {
            stack.push(root);
            root = root.right;
        }else {
            const target = stack.pop();
            if (++count === k) {
                return target.val;
            }
            root = root.left;
        }
    }
    return null;
};

