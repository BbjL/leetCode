/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    const len = numbers.length;
    if (len < 1) return 
    let preNum = NaN;
    for (let i = 0; i < len; i++) {
        if (numbers[i] < preNum) return numbers[i];
        preNum = numbers[i];
    }
    return numbers[0];
};