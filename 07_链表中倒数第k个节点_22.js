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
 * 1 -使用栈反转指针
 * 放入栈结构再拿出来反转
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    const stack = [];
    const ans = [];
    while (head) {
        stack.push(head);
        head = head.next;
    }
    while (k > 0) {
        ans.push(stack.pop());
        k--
    }
    return ans[ans.length - 1];
};


/**
 * 2 -使用快慢指针
 * 
 * 一开始快指针和慢指针都指向链表头
    然后让快指针先走k步，走完k步之后让快指针和慢指针一起走
    最后慢指针所指向的位置就是n-k的位置，即倒数第k个节点
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let fast = head;
    let slow = head;

    for (let i = 0; i < k; i++) { // 快指针先手k步
        fast = fast.next;
    }
    while (fast) { // 快慢指针一起走，最后慢指针只想位置就是倒数第k个节点
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};

console.log(getKthFromEnd(ListNode, 2));