/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**归并
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
    const len = lists.length;
    if ( !Array.isArray(lists) || len === 0) {
        return null
    }
    if (len === 1) {
        console.log(lists[0]);
        return lists[0]
    };

    let mid = parseInt(len / 2);
    let left = lists.slice(0, mid);
    let right = lists.slice(mid, len);

    return merge(mergeKLists(left), mergeKLists(right));
};

var merge = function (left, right) {
    let inithead = head = new ListNode();
    if (left === null && right === null) return null 
    while (left && right) {
        if (left.val < right.val) {
            head.val = left.val;
            head.next = new ListNode();
            head = head.next;
            left = left.next;
        }else {
            head.val = right.val;
            head.next = new ListNode();
            head = head.next;
            right = right.next;
        }
    }
    console.log(inithead);
    while (left !== null) {
        head.val = left.val;
        left = left.next
        if (left !==null ) {
            head.next = new ListNode()
            head = head.next;
        }
    }
    while (right !== null) {
        head.val = right.val;
        right = right.next;
        if (right !==null ) {
            head.next = new ListNode()
            head = head.next;
        }
    }
    return inithead;
}

/**
 * k根指针
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
    const len = lists.length;
    if ( !Array.isArray(lists) || len === 0) {
        return null
    }
    let dummyHead = tail = new ListNode();
    while (true) {
        let minNode = null;
        let minPointer = -1;
        for (let i = 0; i < len; i++) {
            if (lists[i] == null) {
                continue;
            }
            if (minNode === null || minNode.val > lists[i].val) {
                minNode = lists[i];
                minPointer = i;
            }
        }
        if (minPointer == -1) {
            break;
        }
        tail.next = minNode;
        tail = tail.next;
        lists[minPointer] = lists[minPointer].next;
    }    
    return dummyHead.next;
};

// @lc code=end

