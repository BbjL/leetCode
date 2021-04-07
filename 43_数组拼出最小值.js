/**
 * @param {number[]} nums
 * @return {string}
 */
 var minNumber = function(nums) {
  if (nums < 2) return nums.join('')
  return nums.sort( (a, b) => {
    return (""+a+b) - (""+b+a)
  }).join('')
};

/**快速排序
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
  if (nums < 2) return nums.join('')
  return quickSort(nums).join("")
};

function quickSort (nums, begin = 0, end = nums.length - 1) {
  if (nums.length < 2 || begin >= end)  return nums
  const mid = findIndex(nums, begin, end);
  quickSort(nums, begin, mid - 1);
  quickSort(nums, mid + 1, end);
  return nums;
}

function findIndex (nums, begin, end) {
  if (nums.length < 1) return end
  let priot = nums[begin];

  while (begin < end) {
    while ( ("" + priot + nums[end]) <= ("" + nums[end] + priot ) && begin < end) {
      end-- 
    }
    nums[begin] = nums[end];
    while (( "" + priot + nums[begin]) >= ( "" + nums[begin]  + priot ) && begin < end) {
      begin++
    }
    nums[end] = nums[begin];
  }
  nums[end] = priot;
  return end;
}

quickSort([1,1,1,1])
