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
 * 保存上一个节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let preNode = null;
    let current = head;

    while (current !== null) {
        const next = current.next;
        current.next = preNode;
        preNode = current;
        current = next;
    }
    return preNode;
};


//  递归
var reverseList = function(head) {
    if (head === null) return head;
    return reverseEveryNode(head, null)
};

var reverseEveryNode = function (head, preNode) {
    if (head === null) {
        return preNode;
    }
    const next = head.next;
    head.next = preNode;
    preNode = head;
    return reverseEveryNode(next, preNode);
}

console.log(reverseList(ListNode));
