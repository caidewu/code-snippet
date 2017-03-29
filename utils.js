String.prototype.trim = function(){
    return this.replace(/(^\s+)|(\s*$)/g,"");
};


function getParam(param) {
    var rep = new RegExp('(^|&)' + param + '=([^&]*)($|&)');
    var ret = location.search.slice(1).match(rep);
    return ret ? decodeURIComponent(ret[2]) : '';
}

function getParam1(param) {
    var query = location.search.slice(1);
    var queryArray = query.split('&');
    var obj = {};
    queryArray.forEach(function(item) {
        var ret = item.split('=');

        if (ret[0]) {
            obj[ret[0]] = decodeURIComponent(ret[1]) || '';
        }
    });
    return param ? obj[param] : obj;
}




// 数组去重
Array.prototype.unique = function() {
    var obj = {},
        k,
        ret = [];

    this.forEach(function(v) {
        if (typeof v == 'number') {
            k = 'n' + v;
        } else {
            k = v;
        }

        if (!obj[k]) {
            ret.push(v);
            obj[k] = true;
        }

    });
    return ret;
};



Array.prototype.unique1 = function() {
    var obj = {},
        type,
        ret = [];

    this.forEach(function(v) {
       type = typeof v;

        if (!obj[v]) {
            ret.push(v);
            obj[v] = [type];
        } else if (obj[v].indexOf(type) === -1) {
            ret.push(v);
            obj[v].push(type);
        }

    });
    return ret;
};



function trycatch(fn, handle) {
    try {
        return fn();
    } catch (err) {
        return handle(err);
    }
}


// 不使用loop循环，创建一个长度为100的数组，并且每个元素的值等于它的下标？

// 方式1 利用字符串的类数组对象特性
Object.keys(" ".repeat(100)).map(Number);

// " ".repeat(100) 可以换成 new Int32Array(100)，Int32Array是会生成空数组
Object.keys(new Int32Array(100)).map(Number);

// 利用Number
Array.apply(null, {length: 100}).map(Number.call);

// keys把空数组转换成迭代器，扩展运算符执行迭代器生成数组
[...new Array(100).keys()]

// 通过fill初始化空数组, map把key赋给value
new Array(100).fill().map((_,i) => i);

// 通过Array.from初始化空数组
Array.from(new Array(100)).map((_,k) => k);

// 方式2 递归
var arr=[];
function fn(n) {
    if ( n != 0 ) {
        arr[n] = n;
        fn(n - 1)
    }else{
        arr[0] = 0;
    }
}
fn(99);
console.log(arr);

(function() {
    // 类数组对象的转换
    // 方式1：利用Array构造函数特性
    let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

    // 方式2：利用Array.prototype.slice方法,
    // 对参数使用slice会阻止某些JavaScript引擎中的优化 比如 V8 引擎
    let args1 = Array.prototype.slice.call(arguments);
})();
