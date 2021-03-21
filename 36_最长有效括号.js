


/* 
    给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
*/


/* 

具体做法是我们始终保持栈底元素为当前已经遍历过的元素中「最后一个没有被匹配的右括号的下标」，这样的做法主要是考虑了边界条件的处理，栈里其他元素维护左括号的下标：

对于遇到的每个 \text{‘(’}‘(’ ，我们将它的下标放入栈中
对于遇到的每个 \text{‘)’}‘)’ ，我们先弹出栈顶元素表示匹配了当前右括号：
如果栈为空，说明当前的右括号为没有被匹配的右括号，我们将其下标放入栈中来更新我们之前提到的「最后一个没有被匹配的右括号的下标」
如果栈不为空，当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」
*/

/**
 * 借用栈
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    const len = s.length;
    if (len <= 1) return 0
    const stack = [];
    stack.push(-1);
    let maxSub = 0;
    for (let i =0; i < len; i++) {
        if (s.charAt(i) === "(") {
            stack.push(i);
        }else { 
            stack.pop();;
            // 表示最后一个没有匹配的右括号
            if (!stack.length) {
                stack.push(i); 
            }else {
                maxSub = Math.max(maxSub, i - stack[length - 1]);
            }
        }
    }
    return maxSub;
};

number = '12000000'
number1 = 112000000.1111

console.log(number.replace(/(?!^)(?=((\d){3})+(\.|(?<!\..*)$))/g, ","));
console.log(Intl.NumberFormat().format(number));
console.log(number1.toLocaleString());