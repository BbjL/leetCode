/* 

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]

*/

/**
 * 暴力解法
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) { // 
    const len = nums.length; 
    if (!len) return 
    const index = [];
    for (let i = 0; i < len; i++) {
        let otherNum = target - nums[i];
        for (let j = i; j < len; j++) {
            if (i !== j && otherNum === nums[j]) {
                index.push(i)
                index.push(j)
            }
        }

    }
    return index;
};


/**
 * 哈希表解法
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) { // 
    const len = nums.length; 
    if (!len) return 
    const index = [];
    // 将没有匹配的存入哈希表
    const map = new Map([
        [nums[0], 0]
    ]);
    for (let i = 0; i < len; i++) {
        let otherNum = target - nums[i];
        if (map.get(otherNum) !== undefined && map.get(otherNum) !== i) {
            return [map.get(otherNum), i];
        }
        map.set(nums[i], i)
    }
};



console.log(twoSum([3,2,4],6));