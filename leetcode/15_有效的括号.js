/* 

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const LEN = s.length;
    let flag = true;
    if (LEN % 2 === 1) return false;

    const pairs = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ]);

    const stack = [];
    const splitArr = s.split('');
    // s.split('').findIndex((ch, index) => {
    //     if (index === 0 && pairs.has(ch)) return false;
    //     if (pairs.has(ch)) {
    //         if ( !stack.length ||  stack[stack.length - 1] !== pairs.get(ch)) {
    //             console.log(ch);
    //             return true
    //         }
    //         stack.pop();
    //     } else {
    //         stack.push(ch);
    //     }
    // })
    
    for (let index = 0; index < splitArr.length; index++) {
        let ch = splitArr[index];
        if (index === 0 && pairs.has(ch)) return false;
        if (pairs.has(ch)) {
            if ( !stack.length ||  stack[stack.length - 1] !== pairs.get(ch)) {
                return false
            }
            stack.pop();
        } else {
            stack.push(ch);
        }
    }

    console.log(stack.length);
    return !stack.length;
};

console.log(isValid(""));