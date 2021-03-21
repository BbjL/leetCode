/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**找到最小值
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    const len = prices.length;
    if (!len) return 
    let max = 0;
    let min = prices[0];
    for (let i = 1; i < len; i++) {
        if (prices[i] < min) {
            min = prices[i];
        }else {
            max = Math.max(prices[i] - min, max);
        }
    }
    return max;
};

/* 

dp[i][j]：下标为 i 这一天结束的时候，手上持股状态为 j 时，我们持有的现金数。

j = 0，表示当前不持股；
j = 1，表示当前持股。


dp[i][0]：规定了今天不持股，有以下两种情况：

昨天不持股，今天什么都不做；
昨天持股，今天卖出股票（现金数增加），
dp[i][1]：规定了今天持股，有以下两种情况：

昨天持股，今天什么都不做（现金数与昨天一样）；
昨天不持股，今天买入股票（注意：只允许交易一次，因此手上的现金数就是当天的股价的相反数）。

*/

// @lc code=start
/**动态规划
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const len = prices.length;
    if (!len) return 0
    const dp = [];
    dp.push([]);
    dp[0][0] = 0;
    dp[0][1] = -prices[0];
    for (let i = 1; i < len; i++) {
        dp.push([]);
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
    }
    return dp[len-1][0];
};
// @lc code=end

