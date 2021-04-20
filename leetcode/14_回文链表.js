/* 

请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true


*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // 深度优先遍历
    const reverse = reverseList(JSON.parse(JSON.stringify(head)));
    console.log(reverse);
    console.log(head);
    return compareList(head, reverse);
};

var compareList = function (l1, l2) {
    if (l1 === null && l2 === null) return true;
    if ( l1 !== null && l2 !== null && l1.val === l2.val) {
        console.log(1);
        return compareList(l1.next, l2.next);
    }else {
        return false;
    };
}

// 反转链表
var reverseList = function (head) {
    if (head === null) return
    return reserveEveryNode(head, null)
}

var reserveEveryNode = function (current, preNode) {
    if (current === null ) return preNode;
    const next = current.next;
    current.next = preNode;
    return reserveEveryNode(next, current);
}

const ListNode = {
    val: 0,
    next: {
        val: 0,
        next: null
    }
}

console.log(isPalindrome(ListNode));