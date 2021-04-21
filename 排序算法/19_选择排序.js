
/* 
选择排序的基本思想为每一趟从待排序的数据元素中选择最小（或最大）的一个元素作为首元素，直到所有元素排完为止。

*/

function selectSort(array) {

    let len = array.length;

    if (!Array.isArray(array) || len <= 1) return

    for (let i = 0; i < len; i++) {

        let minIndex = i;

        for (let j = i + 1; j < len; j++) {
            
            if (array[minIndex] > array[j]) {
                minIndex = j
            }

        }

        // 交换位置
        [array[i],  array[minIndex]] = [array[minIndex], array[i]]
    }

}

let arr = [3, 1, 5, 4, 1]
selectSort(arr);
console.log(arr);