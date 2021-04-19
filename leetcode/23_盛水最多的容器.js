



/* 

    采用双指针的做法，移动较小那边的指针
    参考链接 https://leetcode-cn.com/problems/container-with-most-water/solution/sheng-zui-duo-shui-de-rong-qi-by-leetcode-solution/

*/




/**
 * 双指针
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max = 0; // 返回最大面积
    let leftIndex = 0;
    let rightIndex = height.length - 1;
    while (leftIndex < rightIndex) {
        let tempArea = (rightIndex - leftIndex) * Math.min(height[leftIndex], height[rightIndex]);
        if (height[leftIndex] < height[rightIndex]) {
            leftIndex++
        }else {
            rightIndex--
        }
        max = Math.max(max, tempArea);
    }

    return max;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));