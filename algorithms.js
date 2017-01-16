
function timer(callback) {
    var start = performance.now();
    callback();
    console.log('耗时：', performance.now() - start + 'ms');
}

function simpleRandom(length) {
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
var longStr = JSON.stringify(simpleRandom(10000));
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


























