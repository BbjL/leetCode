// function bubbleSort(array) {

//     let len = array.length;

//     if (!Array.isArray(array) || len <= 1) return

//     let lastIndex = len - 1;

//     while (lastIndex > 0) {


//         for (let i = 0; i < lastIndex; i++) {
//             if (arr[i] > arr[i + 1]) {
//                 [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
//             }
//         }

//         lastIndex--
//     }

// 算法优化 内循环和外循环
function bubbleSort(array) {

    let len = array.length;

    if (!Array.isArray(array) || len <= 1) return

    let lastIndex = len - 1;

    while (lastIndex > 0) {

        let flag = true,
            k = lastIndex

        for (let i = 0; i < k; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                lastIndex = i;              // 记录每次交换位置的地方
                flag = false
            }
        }

        if (flag) break;            // 如果外循环没有出现位置交换 则证明已经是排好序的 直接返回
    }
}


// 一种是外层循环的优化，我们可以记录当前循环中是否发生了交换，
//           如果没有发生交换，则说明该序列已经为有序序列了。
//           因此我们不需要再执行之后的外层循环，此时可以直接结束。
// 
// 一种是内层循环的优化，我们可以记录当前循环中最后一次元素交换的位置，
//          该位置以后的序列都是已排好的序列，因此下 一轮循环中无需再去比较。
// 




let arr = [2, 5, 1, 3, 7, 4, 6]
bubbleSort(arr)
console.log(arr);