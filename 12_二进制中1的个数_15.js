/**
 * 正则表达式解决
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
        const r = n.toString(2).match(/1/g); //  没有找到捕获组则会返回null
        console.log(r);
        return r ? r.length : 0;
};


/**
 * 与运算
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0;
    while (n) {
        n = n & (n - 1);
        count++
    }
    return count;
};

console.log(hammingWeight(9));