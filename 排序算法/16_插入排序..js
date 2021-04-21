function inserSort(array) {

    let len = array.length

    if(!Array.isArray(array)  || len <= 1) return 

    // 默认索引为1是已经排好序的
    for(let i = 0; i < len; i++) {

        // 保存当前需要排序的元素
        let temp = array[i]
        let j = i;

        // 在当前已排序序列中比较，如果比需要排序的元素大，就依次往后移动位置     
        while(j - 1 >= 0 && array[j -1] > temp ) {
            array[j] = array[j-1] // 
            j-- // 索引继续向前移动
        }

        array[j] = temp // 将待排序的值插入到空出来的位置

    }

}

// function inserSort(array) {

//     let len = array.length;

//     if (!Array.isArray(array) || len <= 1) return

//     for (let i = 0; i < len; i++) {

//         // 保存需要排序元素
//         let temp = array[i];
//         // 从索引位置0开始
//         let j = i;

//         // 找到插入位置
//         while (j - 1 >= 0 && array[j - 1] > temp) {
//             // 索引向后移动
//             array[j] = array[j - 1]
//             j--
//         }

//         array[j] = temp

//     }

// }



let arr = [2, 5, 1, 3]
inserSort(arr)
console.log(arr);