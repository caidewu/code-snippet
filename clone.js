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


function extend(deep, target, source) {
    for (var i in source) {
        if (deep) {

        } else {
            if (source.hasOwnProperty(i)) { // 不要把原型上的属性拷贝过来
                target[i] = source[i];
            }
        }
    }
}

// 上面的方法并没有考虑到ES5属性描述的情况，也就是说如果有getter setter或对象被freeze了，这些特性是拷贝不过来的
function extend1(deep, target, source) {
    function isDescUse (obj) {
        return !obj.writable || !obj.enumerable || !obj.configurable || obj.get || obj.set;
    }
    for (var i in source) {
        if (deep) {
            // 这里就是递归了
            // 要注意先判断Array，然后Object，基本类型和function直接拷贝
        } else {
            if (source.hasOwnProperty(i)) { // 不要把原型上的属性拷贝过来
                var description = Object.getOwnPropertyDescriptor(source, i);

                if (description && isDescUse()) {
                    Object.defineProperty(target, i, description);
                } else {
                    target[i] = source[i];
                }
            }
        }
    }
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