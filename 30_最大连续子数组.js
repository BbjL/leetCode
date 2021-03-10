/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    const len = nums.length;
    if (!len) return 
    if (len === 1) return nums[0];
    const dp = [];
    let maxSub = nums[0];
    for (let i = 0; i < len; i++) {
        dp.push([]);
        for (let j = i; j < len; j++) {
            let total;
            if (i === j) {
                total = nums[i]
                dp[i][j] = total;
            }else {
                dp[i][j] = dp[i][j - 1] + nums[j];
            }
            maxSub = Math.max(maxSub, dp[i][j]);
        }
    }
    return maxSub;
};

console.log(
    maxSubArray([-2,1,-3,4,-1,2,1,-5,4])
);