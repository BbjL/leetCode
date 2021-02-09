/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const s = new Set();
    for(const num of nums) {
        const currentLength = s.size;
        s.add(num);
        if (currentLength === s.size) return num; 
    }
};

const array = [2, 3, 1, 0, 2, 5, 3];
console.log(findRepeatNumber(array));