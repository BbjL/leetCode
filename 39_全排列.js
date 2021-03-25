/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const len = nums.length;
    const ans = [];
    if (len < 1) return ans;

    const dfs = function (temp) {
        if (temp.length === len) {
            ans.push(temp.slice());
            return 
        }
        for (let i = 0; i < len; i++) {
            if (temp.indexOf(nums[i]) !== -1) continue
            temp.push(nums[i]);
            dfs(temp)
            temp.pop();
        }
    }

    dfs ([]);
    return ans
};
// @lc code=end

