/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
};

function exceedLimit (m, n, k) {
    let result = 0;

    while (m > 0) {
        num = m % 10;
        result += num;
        m = (m - num)
    }
    console.log(result)
}




exceedLimit(387)