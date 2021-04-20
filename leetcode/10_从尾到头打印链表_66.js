const ListNode = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: null
                }
            }
        }
    }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    const stack = [];
    const reserve = [];
    let len = 0;

    while (head) {
        len++;
        stack.push(head.val);
        head = head.next;
    }

    for (let i = 0; i < len; i++) {
        reserve.push(stack.pop());
    }
    return reserve;
};
