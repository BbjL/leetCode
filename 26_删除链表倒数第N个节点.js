/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 借助栈获得倒数第n个节点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if (head === null) {
        return 
    }
    const stack = [];
    const initHead = head;
    let current;
    let preNode;

    while (head) {
        stack.push(head);
        head = head.next;
    }
    while (n > 0) {
        current = stack.pop();
        n--
    }
    preNode = stack.pop();
    if (preNode === undefined) {
        return null
    }else {
        preNode.next = current.next;
        return initHead;
    };
}

/**
* 双指针一次遍历实现
* @param {ListNode} head
* @param {number} n
* @return {ListNode}
*/
var removeNthFromEnd = function(head, n) {
    if (head === null) {
        return 
    }
    let beforeH, afterH;
    beforeH = afterH = head;
    const stack = []; // 保存当前节点的前后节点
    while (n > 0) {
        beforeH = beforeH.next;
        n--
    } 
    if (beforeH) {
        while (beforeH) {
            beforeH = beforeH.next;
            stack.push(afterH);
            afterH = afterH.next;
            if (beforeH === null) { // 找到节点删除
                let current = afterH;
                let preNode = stack.pop();
                preNode.next = current.next;
            }
        }
    }else { // 如果删除的第一个节点
        afterH = afterH.next;
        return afterH;
    }
    return head;
}


const ListNode = {
    val: 1,
    next: null
}

console.log(removeNthFromEnd(ListNode, 1));