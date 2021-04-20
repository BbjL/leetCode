/**
 * 动态规划
 * @param {number} n
 * @return {number}
 */
 var cuttingRope = function(n) {
  if (n < 1) return 0

  const dp = new Array(n + 1).fill(1);
  dp[2] = 1;
  for (let i = 3; i <=n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }
  return dp[n]
};


/**
 * 贪心
 * https://leetcode-cn.com/problems/jian-sheng-zi-lcof/solution/shuang-jie-fa-dong-tai-gui-hua-tan-xin-fa-fu-zha-2/
 * @param {number} n
 * @return {number}
 */
 var cuttingRope = function(n) {
  if (n <=  2) return 1

  // 先求出多少个三
  const a = Math.floor(n / 3);
  // 求出余数
  const b = n % 3;

  if (n === 1) return Math.pow(3, a - 1) * 4;
  if (n === 2) return Math.pow(3, a) * 2;
  return Math.pow(3, a)
};

