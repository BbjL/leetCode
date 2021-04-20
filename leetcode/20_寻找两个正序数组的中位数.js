/* 

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
示例 3：

输入：nums1 = [0,0], nums2 = [0,0]
输出：0.00000
示例 4：

输入：nums1 = [], nums2 = [1]
输出：1.00000
示例 5：

输入：nums1 = [2], nums2 = []
输出：2.00000

*/



/**
 * 暴力解法，，  最好通过归并排序的方法合并两个数组
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const mergeList = nums1.concat(nums2).sort(function (v1, v2) {
        return v1 - v2
    });
    console.log(mergeList);
    const n = mergeList.length;
    let middle;
    if (n % 2) {
        middle = mergeList[Math.floor(n / 2)]
    }else {
        middle = ( mergeList[n / 2] + mergeList[(n / 2) - 1] ) / 2
    }
    return middle;
};

/**
* 我们不需要将两个数组真的合并，我们只需要找到中位数在哪里就可以了。
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
var findMedianSortedArrays = function(nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    let current, preview, middle;
    let index1 = 0;
    let index2 = 0;
    
    for (let i = 0; i <= parseInt((n + m)/2); i++) {
        preview = current;
        if (index1 < n && ( index2 >= m || ( nums1[index1] < nums2[index2]))) {
            current = nums1[index1++]
        }else {
            current = nums2[index2++]
        }
    }

    if ((n + m) % 2) {
        middle = current; 
    }else {
        middle = (preview + current) / 2;
    }
    return middle;
};

console.log(findMedianSortedArrays([3], [-2,- 1, 6, 8]));