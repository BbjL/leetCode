function shellSort (arr) {

    let len = arr.length;

    if (!Array.isArray(arr) || len <= 1) return

    // 增量分组 直到增量为1
    for (let gap = parseInt(len >> 1); gap >= 1; gap = parseInt(gap >> 1)) {

        // 进行插入排序
        for (let i = gap; i < len; i++) { //  0到gap的默认已经排好序分组
            
            // 需要插入的元素
            let temp = arr[i]
            
            // 索引向后移动
            while (i - gap >= 0 && temp < arr[i-gap]) {
                arr[i] = arr[i - gap]
                i -= gap; 
            }

            arr[i] = temp;

        }

    }

}

let arr = [2, 4, 1, 5, 3]
shellSort(arr)
console.log(arr);