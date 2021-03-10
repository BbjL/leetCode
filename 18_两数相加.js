/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const head = new ListNode()
    return addSingleNum(head, head, l1, l2, 0);
};

var addSingleNum = function (root, head, l1, l2, carry) {
    let num = 0;
    if (l1 === null && l2 === null) {
        if (carry) head.val = carry
        return root
    }
    if (l1 === null) {
        num = l2.val + carry
    }else if (l2 === null) {
        num = l1.val + carry
    } else if (l1 !== null && l2 !== null) {
        num = l1.val + l2.val + carry;
    } else if (carry) {
        num = carry
    }
    head.val = num % 10;
    if ((l1 && l1.next) || (l2 && l2.next) ||  num >= 10) {
        console.log(1);
        head.next = new ListNode();
    }
    return addSingleNum(root, head.next, l1 && l1.next, l2 && l2.next, num >= 10 ? 1 : 0);
}

const l1 = {
    val: 9,
    next: {
        val: 9,
        next: null
    }
}

    const l2 = {
    val: 9,
    next: {
        val: 9,
        next: {
            val: 6,
            next: null
        }
    }
}

console.log(addTwoNumbers(l1, l2));