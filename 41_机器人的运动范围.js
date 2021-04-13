/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var movingCount = function(m, n, k) {
  if (n < 1 || m < 1) return
  let count = 0;
  
  let axis = JSON.stringify([0, 0]);
  const obj = {};
  function dfs (x, y, k) {
    if (x < 0 || x >= m || y < 0 || y >= n || !exceedLimit(x, y, k)) return
    // 已经走过
    if (!obj[axis]) {
      count++;
      obj[axis] = true
      dfs(x + 1, y, k);
      dfs(x, y + 1, k);
    }
  }
  dfs(0, 0, k)

  return count;
};


function exceedLimit (m, n, k) {
  let acc = 0;

  while (m | n) {
    let num1 = m % 10; 
    let num2 = n % 10;
    m = (m - num1) / 10;
    n = (n - num2) / 10;
    acc += num1 + num2;
  }

  return acc <= k 
}


movingCount(1, 2, 1)