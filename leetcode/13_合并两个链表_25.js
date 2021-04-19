/* 
    输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
const l1 = {
	val: 1,
	next: {
		val: 3,
		next: {
			val: 4,
			next: null,
		},
	},
};

const l2 = {
	val: 1,
	next: {
		val: 2,
		next: {
			val: 4,
			next: null,
		},
	},
};
/**
 * 递归实现
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {

    if (l1 === null) return l2;
    if (l2 === null) return l1;
    let head = null;

    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        head = l1;
    }else {
        l2.next = mergeTwoLists(l2.next, l1);
        head = l2;
    }

    return head;
    
};

console.log(mergeTwoLists(l1, l2));