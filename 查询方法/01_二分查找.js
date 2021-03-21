function binarySearch (nums, left, right, target) {
    const len = nums.length;
    let mid = parseInt((right + left ) / 2);

    if (len < 1) return  -1
    if (target === nums[mid]) {
        return mid;
    }else if (target > nums[mid] && right > mid) {
        return binarySearch(nums, mid + 1, right, target)
    }else if (target < nums[mid] && left < mid) {
        return binarySearch(nums, left, mid - 1, target)
    }else {
        return -1
    }
}

const binarySearch2 = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

let arr = [5,7,7,8,8,10];
console.log(binarySearch(arr, 0, arr.length - 1, 8));
console.log(binarySearch2(arr, 8, true));