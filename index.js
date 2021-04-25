// 手写一个数组扁平化
Array.prototype.myFlat = function () {
  return flat(this);
};

function flat(array) {
  if (!Array.isArray(array)) return;
  let flatarr = [];
  array.forEach((item) => {
    if (Array.isArray(item)) {
      const temp = flat(item);
      flatarr = flatarr.concat(temp);
    } else {
      flatarr.push(item);
    }
  });
  return flatarr;
}

const flatarr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]].myFlat();
console.log(flatarr);
