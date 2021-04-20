
function ListNode(x){
    this.val = x;
    this.next = null;
}


/**
 * reverse the given linked list
 * 借用辅助栈
 * @param head ListNode类 the head of the linked list
 * @param n int整型 the N
 * @return ListNode类
 */
 function reverseLinkedList( head ,  n ) {
    // write code here
    let dummyHead, tail;
    dummyHead = tail = new ListNode();
    let i = 1;
    let stack = [];

    while (head) {
        stack.push(head);
        console.log(head);
        head = head.next;
        if (i % n === 0) {
            while (stack.length) {
                tail.next = stack.pop();
                tail = tail.next
            }
        }
        if (head === null) {
            while (stack.length) {
                tail.next = stack.pop();
                tail = tail.next
            }
            tail.next = null
        }
        i++;
    }
    return dummyHead.next
}
const l1 = {
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


console.log(reverseLinkedList(l1, 3));

console.log(111);

