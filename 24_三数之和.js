/**排序 + 双指针
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums = nums.sort((v1, v2) => v1 - v2);
    if (nums.length < 3 || nums[0] > 0) return 
    let ans = [];
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break;
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let leftIndex = i + 1;
        let rightIndex = nums.length - 1;
        while (leftIndex < rightIndex) {
            let total = nums[rightIndex] + nums[leftIndex] + nums[i]
            if (total === 0) {
                // 1.加入数组
                ans.push([nums[i], nums[leftIndex], nums[rightIndex]]);
                while (nums[leftIndex] === nums[leftIndex+1]) leftIndex++;
                while (nums[rightIndex] === nums[rightIndex-1]) rightIndex++;
                leftIndex++;
                rightIndex--;
            }else if (total > 0) {
                rightIndex--;
            }else if (total < 0){
                leftIndex++;
            }   
        }
    }
    return ans
};



// console.log(threeSum([-1,0,1,2,-1,-4]));
// console.log(threeSum([0, 0, 0]));
// console.log(threeSum([-2,0,1,1,2]));
console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]));