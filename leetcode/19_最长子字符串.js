/* 

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
示例 4:

输入: s = ""
输出: 0

*/

/**
 * 暴力解法
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const len = s.length;
    if ( len < 1 ) return 

    const set = new Set();
    let ans = 0;    // 最长子字符串长度
    let end = -1;   // 最长子符串的右指针位置
    for(let i = 0; i < len; i++) {
        if (i) {
            set.delete(s.charAt(i - 1))     // 左指针向右一格删除前面一个
        }
        while (end + 1 < len && !set.has(s.charAt(end + 1))) { // 指针向右移动
            set.add(s.charAt(++end));
        }
        ans = Math.max(ans, end - i + 1);
    }
    return ans
};


console.log(lengthOfLongestSubstring("pwwkew"));