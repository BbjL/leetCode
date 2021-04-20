/* 

给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
示例 3：

输入：s = "a"
输出："a"
示例 4：

输入：s = "ac"
输出："a"

*/


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const sList = s.split('');
    const len = sList.length;
    let leftIndex, rightIndex;
    let longestString = "";
    
    for (let i = 0; i < len; i++) {
        leftIndex = rightIndex = i;
        // 找到最长回文子串
        while (rightIndex < len) {
            let currentString = s.slice(leftIndex, rightIndex + 1);
            if (currentString === 'cabdkac') {
                console.log(11);
            }
            let isMatch = true;
            // 双指针
            for (let i = leftIndex, j = rightIndex; i <= parseInt(currentString.length / 2) + leftIndex; i++, j--) { // 双指针
                if (sList[i] !== sList[j]) {
                    isMatch = false;
                    break;
                }
            }

            if (longestString.length < currentString.length && isMatch) {
                longestString = currentString
            }
            rightIndex++
        }
    }
    return longestString
};


/**
 * 动态规划解决最优解问题
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const n = s.length;
    let ans = "";
    const dp = new Array(n); // 定义一个二维数组
    for (let i = 0; i < n; i++) {
        dp[i] = new Array();
    }
    // 各个长度的子串是否是回文字符串
    for (let len = 0; len < n; len++) {
        for (let i = 0; i + len < n; i++) {
            const j = i + len;
            // 动态规划的边界问题  
            // 子串长度为1、2时
            if (len === 0) {
                dp[i][j] = true;
            }else if (len === 1) {
                dp[i][j] = s.charAt(i) === s.charAt(j);
            }else {
                dp[i][j] = (s.charAt(i) === s.charAt(j)) && dp[i+1][j-1];
            }
            if (dp[i][j] && len + 1 > ans.length) {
                ans = s.slice(i, j + 1);
            }
        }
    }
    return ans;
} 


console.log(longestPalindrome("aasd"));


