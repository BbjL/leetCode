/**
 * 暴力揭发  时间负责都n2
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


/* 
思路和算法

假设 \textit{nums}nums 数组的长度是 nn，下标从 00 到 n-1n−1。

我们用 f(i)f(i) 代表以第 ii 个数结尾的「连续子数组的最大和」，那么很显然我们要求的答案就是：

\max_{0 \leq i \leq n-1} \{ f(i) \}
0≤i≤n−1
max
​	
 {f(i)}

因此我们只需要求出每个位置的 f(i)f(i)，然后返回 ff 数组中的最大值即可。那么我们如何求 f(i)f(i) 呢？我们可以考虑 \textit{nums}[i]nums[i] 单独成为一段还是加入 f(i-1)f(i−1) 对应的那一段，这取决于 \textit{nums}[i]nums[i] 和 f(i-1) + \textit{nums}[i]f(i−1)+nums[i] 的大小，我们希望获得一个比较大的，于是可以写出这样的动态规划转移方程：

f(i) = \max \{ f(i-1) + \textit{nums}[i], \textit{nums}[i] \}
f(i)=max{f(i−1)+nums[i],nums[i]}

不难给出一个时间复杂度 O(n)O(n)、空间复杂度 O(n)O(n) 的实现，即用一个 ff 数组来保存 f(i)f(i) 的值，用一个循环求出所有 f(i)f(i)。考虑到 f(i)f(i) 只和 f(i-1)f(i−1) 相关，于是我们可以只用一个变量 \textit{pre}pre 来维护对于当前 f(i)f(i) 的 f(i-1)f(i−1) 的值是多少，从而让空间复杂度降低到 O(1)O(1)，这有点类似「滚动数组」的思想

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/maximum-subarray/solution/zui-da-zi-xu-he-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
    const len = nums.length;
    if (!len) return  
    const dp = [];
    let maxSub  = dp[0] = nums[0];
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        maxSub = Math.max(maxSub, dp[i]);
    }
    return maxSub;
};


console.log(
    maxSubArray([-2,1,-3,4,-1,2,1,-5,4])
);