/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const root = {
  val: 1,
  left: { 
     val: 2, 
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
  right: {
     val: 2,
     left: { val: 15, left: null, right: null },
     right: { val: 7, left: null, right: null },
   },
 };

 /* 
 
 递归结束条件：

 都为空指针则返回 true
 只有一个为空则返回 false
 递归过程：

 判断两个指针当前节点值是否相等
 判断 A 的右子树与 B 的左子树是否对称
 判断 A 的左子树与 B 的右子树是否对称
 短路：

 在递归判断过程中存在短路现象，也就是做 与 操作时，如果前面的值返回 false 则后面的不再进行计算

 时间复杂度：O(n)O(n)
 
 */

/**
* @param {TreeNode} root
* @return {boolean}
*/
var isSymmetric = function(root) {
  if (root === null) return 
  return isMirror(root.left, root.right);
};

var isMirror = function (l1, l2) {
  if (l1.left === null && l2.right === null) return true;
  if (l1.left === null || l2.right === null) return false;

  return (l1.val === l2.val) && isMirror(l1.left, l2.right) && isMirror(l1.right, l2.left);
}

console.log(isSymmetric(root));