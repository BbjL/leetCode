/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

/* 


回溯，死抓三个要点
选择
在这里，每次最多两个选择，选左括号，或右括号，“选择”会展开出一棵解的空间树。
用 DFS 的方式遍历这棵树，找出所有的解，这个过程叫回溯。
约束条件
即，什么情况下可以选左括号，什么情况下可以选右括号。
利用约束做“剪枝”，即，去掉不会产生解的选项，即，剪去不会通往合法解的分支。
比如()，现在左右括号各剩一个，再选)就成了())，这是错的选择，不能让它成为选项（不落入递归）：

if (right > left) { // 右括号剩的比较多，才能选右括号
    dfs(str + ')', left, right - 1);
}
目标
构建出一个用尽 n 对括号的合法括号串。
意味着，当构建的长度达到 2*n，就可以结束递归（不用继续选了）。


*/

// @lc code=start
/**
 * 回溯--深度优先实现
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    if (n < 1) return [];
    const ans = [];
    // 剩下端左右括号
    const dfs = (lRemain, rRemain, str) => {
        if (str.length === 2 * n) {
            ans.push(str);
            return 
        }
        if (lRemain > 0) {
            dfs(lRemain - 1, rRemain, str + "(");
        }
        if (lRemain < rRemain) {
            dfs(lRemain, rRemain - 1, str + ")");
        }
    }
    dfs(n, n, "");
    return ans;
};
// @lc code=end

// 回溯算法： https://blog.csdn.net/weiyuefei/article/details/79316653
// 参考链接：https://leetcode-cn.com/problems/generate-parentheses/solution/shou-hua-tu-jie-gua-hao-sheng-cheng-hui-su-suan-fa/