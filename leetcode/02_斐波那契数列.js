/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if (n === 0) {
          return 0
      } else if (n === 1) {
          return 1
      }
      const result = fib(n - 1) + fib(n - 2);
      return result > 1000000007 ? 1 : result
  };



  // 尾递归
  var fib2 = function (n, a = 1, b = 1) {
        if (n <= 1) return n;
        if (n === 2) return b;
        return fib2(n - 1, b, (a + b) % 1000000007);
  } 
