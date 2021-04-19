/**
 * 回溯方法
 * 1. 构造出树结构
 * 3. 剪枝(结果和重复解)
 * 2. 深度遍历
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
  const len = candidates.length;
  let ans = [];
  if (len < 1) return [];

  /**
   * @param {Number} begin 开始位置
   * @param {Array} temp  合法解
   * @param {Number} sum 总和
   */
  const dfs = function (begin, temp, sum) {
    if (sum >= target) {
      if (sum === target) {
        ans.push(temp.slice());
      };
      return 
    }
    
    for (let i = begin; i < len; i++) {
      temp.push(candidates[i]);
      dfs(i, temp, candidates[i] + sum);
      temp.pop();
    }
  }

  dfs (0, [], 0);
  return ans; 
};

console.log(combinationSum([2,3,6,7], 7));