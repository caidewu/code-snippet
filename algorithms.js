
function timer(callback) {
    var start = performance.now();
    callback();
    console.log('耗时：', performance.now() - start + 'ms');
}

function arrayGenerator(length) {
    var arr = [];
    // var unit = Math.pow(10,(''+length).length-1);
    var unit = length;
    while (length--) {
        arr.push(Math.floor(Math.random() * unit));
    }
    return arr;
}

/**
 * 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * 也就是说每次循环挑出一个最大值，然后忽略这个最大值排列剩下的
 */
function bubbleSort(array) {
    var start = performance.now();
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length -i; j++) {
            count++; // 计数，与算法无关
            if (array[j+1] < array[j]) { // 从小到大的排序
                // swap
                var tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
            }
        }
    }
    console.log('循环次数：', count);
    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}

/**
 * 标志位冒泡，不稳定，根据实际情况节约复杂度
 * 一次循环中，最后一次发生交换的位置的右边其实已经是OK的（否则还会继续发生交换）
 * 那么会存在可能一个以上的数都排好了，
 * 这是只需要排列发生交换位置的那个数左边的即可
 * @param array 需要进行排列的数组
 * @returns {*}
 */
function bubbleSort1(array) {
    var start = performance.now();
    var count = 0;
    var i = array.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++) {
            count++; // 计数，与算法无关
            if (array[j+1] < array[j]) { // 从小到大的排序
                // swap
                var tmp = array[j];
                array[j] = array[j+1];
                array[j+1]  = tmp;

                pos = j; // 替换结束位置
            }

        }
        i= pos; //为下一趟排序作准备
    }
    console.log('循环次数：', count);
    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}

/**
 * 双向冒泡   从时间复杂度上来说，双向冒泡和普通冒泡是一样的
 * 但冒泡算法有一个乌龟问题：如果从小到大排序，序列中的前面的都是较大的数，这样较大的数移到尾部就很慢???
 *
 * 我的理解，一边挑大的，一边挑小的，到后期的时候，最大的，最小的都被挑走了，剩下的顺序已经确定了，不会有换位，速度就很快了
 * 下面的案例把标志位优化也加进来，效果就更好了
 */
function bubbleSort2(array) {
    var start = performance.now();
    var count = 0;

    var large = array.length - 1;
    var small = 0;
    var tmp, j;
    while (large > small) {
        var pos = 0;
        for (j = small; j < large; j++) {
            count++; // 计数，与算法无关
            if (array[j] > array[j+1]) {
                // swap
                tmp = array[j];
                array[j] = array[j+1];
                array[j+1]  = tmp;

                pos = j; // 替换结束位置
            }
        }
        large = pos;
        for (j = large; j > small; j--) {
            count++; // 计数，与算法无关
            if (array[j-1] > array[j]) {
                // swap
                tmp = array[j];
                array[j] = array[j-1];
                array[j-1]  = tmp;
                pos = j;
            }
        }
        small = pos;
    }

    console.log('循环次数：', count);
    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}


// Test
var longStr = JSON.stringify(arrayGenerator(10000));
var longArray = JSON.parse(longStr);
bubbleSort(longArray);
longArray = JSON.parse(longStr);
bubbleSort1(longArray);
longArray = JSON.parse(longStr);
bubbleSort2(longArray);

/**
 * 循环次数： 50005000
 * 耗时： 739.230000000447ms
 * 循环次数： 49940597
 * 耗时： 253.0000000037253ms
 * 循环次数： 33443430
 * 耗时： 156.01999999955297ms
 */

/* ================================================================================ */
/**
 *
 */
function insertSort(array) {
    var start = performance.now();

    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}

/**
 * 1.假设一位是最值，然后用剩下的值与其比较
 */
function selectSort(array) {
    var start = performance.now();

    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}

/**
 * 快速排列 out-place
 */
function quickSort(array) {
    var start = performance.now();
    var count = 0;
    array = (function sort(arr) {
        if(arr.length <= 1) {
            return arr;
        }
        var center = Math.floor(arr.length/2),
            pivot = arr.splice(center, 1)[0], // 取一个中值，其实数组中任何值都行
            left = [],
            right = [];
        for (var i = 0; i < arr.length; i++) {
            count++;// 计数，与算法无关
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return sort(left).concat(pivot,sort(right));
    })(array);
    console.log('循环次数：', count);
    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}

longArray = JSON.parse(longStr);
quickSort(longArray);


/**
 * 快速排列 in-place
 *
 * 没有为分组的数据新建新的内存空间，使得排列速度又提升了一个数量级
 * @param arr
 * @returns {*}
 */
function quickSort1(array) {
    var start = performance.now();
    var count = 0;
    function swap(arr,index, storeIndex) {
        var tmp = arr[storeIndex];
        arr[storeIndex] = arr[index];
        arr[index] = tmp;

    }
    (function sort(arr, left, right) { // 因为每次传进来都是完整的数组，所以要通过数组下标来定位每次循环的是数组的哪一部分
        if (left > right) return;
        var pivot = arr[right],
            storeIndex = left;// 约定数组的left起始为小值区
        for (var i = left; i < right; i++) {
            count++;
            if (arr[i] < pivot) {
                // 交换
                swap(arr, i, storeIndex);// 把小值放入小值区
                storeIndex++; // 每为小值区域添加一个值，其下标就要加一
            }
        }
        swap(arr, right, storeIndex);// 把基准值放到storeIndex位置上，这样，基准左边的所有值都比右边小
        sort(arr, left, storeIndex - 1);// 基准左边的递归
        sort(arr, storeIndex + 1, right);// 基准右边的递归
    })(array, 0, array.length-1);
    console.log('循环次数：', count);
    console.log('耗时：', performance.now() - start + 'ms');
    return array;
}

longArray = JSON.parse(longStr);
quickSort(longArray);
longArray = JSON.parse(longStr);
quickSort1(longArray);

/**
 * 循环次数： 152952
 * 耗时： 17.780000001192093ms
 *
 * 循环次数： 147995
 * 耗时： 3.225000001490116ms
 */

/**
 * 没有把pivot放到分组的中间，循环次数多了一些,
 * 但每次循环中都少了一次换位，性能反而提升了
 * @param arr
 * @returns {*}
 */
function quickSort3(arr) {
    var start = performance.now();
    var count = 0;
    (function sort(array, left, right) {
        if (left < right) {
            var pivot = array[right],
                i = left - 1,
                temp;
            for (var j = left; j <= right; j++) {
                count++;
                if (array[j] <= pivot) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            sort(array, left, i - 1);
            sort(array, i + 1, right);
        }

    })(arr, 0, arr.length-1);

    console.log('循环次数：', count);
    console.log('耗时：', performance.now() - start + 'ms');
    return arr;
}




















