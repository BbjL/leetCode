/* 

    排列组合

*/

/**深度优先遍历
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
	const len = digits.length;
	if (!len) return;

	// 构造哈希map
	const map = new Map([
		["2", "abc"],
		["3", "def"],
		["4", "ghi"],
		["5", "jkl"],
		["6", "mno"],
		["7", "pqrs"],
		["8", "tuv"],
		["8", "wxyz"],
	]);

	const result = [];
	const nums = digits.split("");
    // 深度优先遍历
	function dfs(str, num, index) { // num 表示树的深度
        if (index === len) {
            result.push(str);
            return
        }
        // 找到对应的值
        const charList = map.get(num);
        console.log(charList);
        for (let char of charList) {
            dfs(str + char, nums[index + 1], index + 1);
        }
	}
    dfs("", nums[0], 0);
    return result;
};

/**
 * 广度优先
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const len = digits.length;
    let result = [];
    if (!len) return result;
    // 构造哈希map
    const map = new Map([
        ["2", "abc"],
        ["3", "def"],
        ["4", "ghi"],
        ["5", "jkl"],
        ["6", "mno"],
        ["7", "pqrs"],
        ["8", "tuv"],
        ["9", "wxyz"],
    ]);
    const nums = digits.split("");

    let index = 0, temp;
    while (index < nums.length) {
        const charList = map.get(nums[index]);
        if (index === 0) {
            for (const char of charList) {
                result.push(char);
            }
            index++;
            continue;
        }
        temp = [];
        for (let i = 0; i < charList.length; i++) {
            for (let j = 0; j < result.length; j++) {
                temp.push(result[j] + charList[i])
            }
        }
        result = temp;
        index++;
    }
    return result;
};

console.log(letterCombinations("234"));