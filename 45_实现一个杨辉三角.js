/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if (numRows < 1) return 
  const result = []; 
  for (let i = 1; i <= numRows; i++) {
      result.push([]);
      for (let j = 0; j < i; j++) {
        if (j > 0 && j < i - 1) {
          result[i - 1].push(result[i - 2][j] + result[i - 2][j - 1]);
        }else {
          result[i - 1].push(1);
        }
      }
  }
  return result;
};
// @lc code=end

