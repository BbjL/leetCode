/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const x = board.length;
    const y = board[0].length;
    const ans = [];
    if (x < 1) return 

    let matchHead = [];
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y; j++) {
            if (board[i][j] = word.charAt(0)) {
                let pos = matchHead.push([]);
                pos.push(i, j);
            }
        }
    }
    console.log(matchHead);

    return ans
};
// @lc code=end

for (let k of 'abc') {
    console.log(k);
}