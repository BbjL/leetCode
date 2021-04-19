// 快速排序迭代实现
function quickSort(nums) {
  if (nums.length < 1) return nums;

  const left = [0]; // 存放指针
  const right = [nums.length - 1];

  while (left.length && right.length) {
    let leftIndex = left.pop(),
      rigthIndex = right.pop();
    pivotIndex = partition(nums, leftIndex, rigthIndex);

    if (pivotIndex - 1 > leftIndex) {
      left.push(leftIndex);
      right.push(pivotIndex - 1);
    }

    if (pivotIndex + 1 < rigthIndex) {
      left.push(pivotIndex + 1);
      right.push(rigthIndex);
    }
  }
  return nums;
}

// 递归实现
function quickSort(nums, left=0, right=nums.length-1) {
  if (nums.length < 1 || left > right) return nums;

  const mid = partition(nums, left, right);
  quickSort(nums, left, mid - 1);
  quickSort(nums, mid + 1, right);
  return nums;
}

function partition(nums, left, right) {
  if (nums.length < 1) return;

  let pivot = nums[left];
  while (left < right) {
    while (pivot <= nums[right] && left < right) {
      right--;
    }
    nums[left] = nums[right]; // 将比枢纽之小的放在左边
    while (pivot >= nums[left] && left < right) {
      left++;
    }
    nums[right] = nums[left]; // 将比枢纽之大的放在右边
  }
  nums[left] = pivot;
  return left;
}


console.log(quickSort([7, -2, 4, 1, 6, 5, 0, -4, 2]))