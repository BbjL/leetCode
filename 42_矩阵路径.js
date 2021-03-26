/* 


请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。

[["a","b","c","e"],
["s","f","c","s"],
["a","d","e","e"]]

但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。


*/


/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    const w = board[0].length;
    const h = board.length;

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (board[i][j] === word[0]) {
                board[i][j] = '/';
                if (dfs(i, j, 1, board, word)) {
                    return true;            
                }
                // 回溯
                board[i][j] = word[0];
            }
        }
    }
    return false

    function dfs (y, x, len, board, word) {
        if (len === word.length) {
            return true
        }

        // 构建树模型
        for (let k = 0; k < 4; k++) {
            const boardX = x + dx[k];
            const boardY = y + dy[k];
            // console.log(boardX, boardY, boardX < w);
            if (boardX >= 0 && boardX < w && boardY >= 0 && boardY < h && board[boardY][boardX] === word[len]) {
                board[boardY][boardX] = '/';
                console.log(word[len]);
                if (dfs(boardY, boardX, len + 1, board, word)) {
                    return true
                }
                board[boardY][boardX] = word[len]
            }
        }
        return false
    }

};

console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"));