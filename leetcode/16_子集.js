


/* 

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]

二进制运算  2的n次方 可以使用 1 << n


*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                console.log(mask & (1 << i));
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};


var subsets = function(nums) {
    const len = nums.length;
    if (!len ) return
    const ans = [];
    for (let i = 0; i < 1 << len; i++) {
        let temp = [];
        for (let j = 0; j < len; j++) { // 判断数组所在位置是否与二进制数对应的位置是否都含有1 
            if (i & ( 1 << j)) {
                temp.push(nums[j])
            }
        }
        ans.push(temp);
    }
    return ans;
};

console.log(subsets([1,2,3]));