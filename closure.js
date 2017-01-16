/**
 *  闭包的应用场景
 */

/**
 * 用于封装相关功能集，最常用
 * buffAr 数组被定义在外部函数表达式中，作为一个局部变量，它只被创建一次。
 * 数组的唯一实例对内部函数是可见的，所以它可以被用于每一次的内部函数执行
 * 空字符串仅仅被用来作为一个占位符，它将被内部函数的参数代替
 */
var getImgInPositionedDivHtml = (function () {

    // 模板数组作为闭包内的私有变量，不会被垃圾回收
    var buffAr = [
        '<div id="',
        '',   //index 1, DIV ID attribute
        '" style="position:absolute;top:',
        '',   //index 3, DIV top position
        'px;left:',
        '',   //index 5, DIV left position
        'px;width:',
        '',   //index 7, DIV width
        'px;height:',
        '',   //index 9, DIV height
        'px;overflow:hidden;\"><img src=\"',
        '',   //index 11, IMG URL
        '\" width=\"',
        '',   //index 13, IMG width
        '\" height=\"',
        '',   //index 15, IMG height
        '\" alt=\"',
        '',   //index 17, IMG alt text
        '\"><\/div>'
    ];

    // 返回一个内部函数对象，他是函数表达式执行返回的结果
    return (function (url, id, width, height, top, left, altText) {
        // 分配各种参数给对应的数组元素
        buffAr[1] = id;
        buffAr[3] = top;
        buffAr[5] = left;
        buffAr[13] = (buffAr[7] = width);
        buffAr[15] = (buffAr[9] = height);
        buffAr[11] = url;
        buffAr[17] = altText;

        // 返回连接每个元素后创建的字符串
        return buffAr.join('');
    });
})();

// 调用就会返回html字符串
getImgInPositionedDivHtml('http://www.qq.com', 12, 199,229, 10,20,'img');

/* ================================================================================ */

/*
 一个给对象实例关联一个事件处理器的普通方法，返回的内部函数被作为事件的处理器，
 对象实例被作为obj参数，对象上将要被调用的方法名称被作为第二个参数
 */
function associateObjWithEvent(obj, methodName) {
    /*返回的内部函数被用来作为一个DOM元素的事件处理器*/
    return (function (e) {
        /*
         事件对象在DOM标准的浏览器中将被转换为e参数，
         如果没有传递参数给事件处理内部函数，将统一处理成IE的事件对象
         */
        e = e || window.event;
        /*
         事件处理器调用obj对象上的以methodName字符串标识的方法
         并传递两个对象：通用的事件对象，事件处理器被订阅的元素的引用
         这里this参数能够使用，因为内部函数已经被执行作为事件处理器所在元素的一个方法
         */
        return obj[methodName](e, this);
    });
}

/*
 这个构造器函数，通过将元素的ID作为字符串参数传递进来，
 来创建将自身关联到DOM元素上的对象，
 对象实例想在对应的元素触发onclick、onmouseover、onmouseout事件时
 对应的方法被调用。
 */
function DhtmlObject(elementId) {
    /*
     调用一个方法来获得一个DOM元素的引用
     如果没有找到，则为null
     */
    var el = document.getElementById(elementId);
    /*
     因为if语句块，el变量的值在内部进行了类型转换，变成了boolean类型
     所以当它指向一个对象，结果就为true,如果为null则为false
     */
    if (el) {
        /*
         为了给元素指定一个事件处理函数，调用了associateObjWithEvent函数，
         利用它自己(this关键字)作为被调用方法的对象，并且提供方法名称
         */
        el.onclick = associateObjWithEvent(this, "doOnClick");
        el.onmouseover = associateObjWithEvent(this, "doOnMouseOver");
        el.onmouseout = associateObjWithEvent(this, "doOnMouseOut");
    }
}

DhtmlObject.prototype.doOnClick = function (event, element) {
    //doOnClick body
};
DhtmlObject.prototype.doOnMouseOver = function (event, element) {
    //doMouseOver body
};

DhtmlObject.prototype.doOnMouseOut = function (event, element) {
    //doMouseOut body
};