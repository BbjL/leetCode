function mergeSort (array) {
    const len = array.length;
    if (!Array.isArray(array) || len === 0) return 

    if (len === 1) {
      return array;
    }

    let middle = parseInt(len / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, len);

    return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
    let leftIndex = 0,
        rightIndex = 0,
        leftLength = left.length,
        rightLength = right.length,
        mergeList = [];

    while (leftIndex < leftLength && rightIndex < rightLength) {
        if (left[leftIndex] < right[rightIndex]) {
            mergeList.push(left[leftIndex]);
            leftIndex++;
        }else {
            mergeList.push(right[rightIndex]);
            rightIndex++;
        }
    }

    while (leftIndex < leftLength) {
        mergeList.push(left[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < rightLength) {
        mergeList.push(right[rightIndex]);
        rightIndex++;
    }

    return mergeList;
}

console.log(mergeSort([8,4,5,7,1,3,6,2]));