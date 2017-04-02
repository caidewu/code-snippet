const _ = require('lodash');

// lodash underscore 的作用是为了实现函数式编程

//  drop(array, dropLength)
// 删除数组指定长度的的部分，剩下的作为新数组返回
console.log(_.drop([1, 2, 3]));     // [2, 3]
console.log(_.drop([1, 2, 3], 2));  // [3]
console.log(_.drop([1, 2, 3], 5));  // []
console.log(_.drop([1, 2, 3], 0));  // [1, 2, 3]


// pull(array, [,removeItem [,removeItem[,...]]])
// 删除数组中所有包含了指定的元素, 返回原来的数组
var array = ['a', 'b', 'c', 'a', 'b', 'c','dd'];
console.log(_.pull(array, 'a', 'c'));
console.log(array);
// => ['b', 'b', 'dd']

// _.pullAll(array, removeArray) 指定元素换成数组而不是参数列表




// is系列
// console.log(_.isMap(new Map()))      // true
// console.log(_.isEqual(1,'1'))        // false  这是个深比较

var c = {cd: 'dddd'}
var obj1 = {a: 1,b : {bb: 22,cc:c}};
var obj2 = {a: 1,b : {bb: 22,cc:c}};
console.log(_.isEqual(obj1, obj2)); // true

const shallowEquals = require('shallow-equals'); // 浅比较
console.log(shallowEquals(obj1, obj2)); // false

const val = {
  a: '12',
  b: {
    bb: '123',
    cc: '234'
  },
  c() {
    console.log('ccc');
  }
};
val.b = 'dd'
// val.b.cc = '456';
val.c = 'cccc'
console.log(val);

// 循环系列