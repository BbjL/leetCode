/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {

    const dx = [-1, 0, 1, 0]; // 当前点的左上右下
    const dy = [0, -1, 0, -1]; // 
    const board = [];
    let total = 0;

    // 构建一个矩阵
/*     for (let i = 0; i < m; i++) {
        board.push([]);
        for (let j = 0; j < n; j++) {
            board[i][j] = 1;
        }   
    } */

    function dfs (x, y, board, k) {
        // if (!exceedLimit(x, y, k)) return
        if (x >= m || x < 0 || y >= n || y < 0 || !exceedLimit(x, y, k)) return 
        total++;
        for (let i = 0; i < 4; i++) {
            const kx = x + dx[i];
            const ky = y + dy[i];
            dfs(kx, ky, board, k)
        }
    }
    dfs(0, 0, board, k);

    return total;
};

function exceedLimit (m, n, k) {
    let result = 0;

    while (m > 0) {
        num = m % 10;
        result += num;
        m = (m - num) / 10;
    }

    while (n > 0) {
        num = n % 10;
        result += num;
        n = (n - num) / 10;
    }

    return result <= k;
}

console.log(movingCount(5, 6, 3));
console.log(exceedLimit(11, 1, 2));