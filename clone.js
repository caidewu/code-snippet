// 数组复制

/**
 * 浅拷贝
 * @param arr
 */
function clone(arr) {
    return [].concat(arr);
}

/**
 * 简易深拷贝
 * 不支持function
 * 不支持低版本浏览器
 * @param arr
 */
function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

var arr = arrayGenerator(10000);


function arrayGenerator(length) {
    var arr = [];
    // var unit = Math.pow(10,(''+length).length-1);
    var unit = length;
    while (length--) {
        arr.push(Math.floor(Math.random() * unit));
    }
    return arr;
}


function cloneTesting(arr) {
    console.time('concat:');
    arr.concat();
    console.timeEnd('concat:');
    console.time('slice:');
    arr.slice();
    console.timeEnd('slice:');
    console.time('concat1:');
    [].concat(arr);
    console.timeEnd('concat1:');

}

cloneTesting(arr);