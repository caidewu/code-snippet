// 最直接的单例子，没毛病
var mySingleton = {
    property1: "something",
    property2: "something else",
    method1: function () {
        console.log('hello world');
    }
};

/* ================================================================================ */
// 有私有变量的单例，其实就是用一个IIFE包起来了，形成闭包就可以定义私有变量
var mySingleton = (function () {

    /* 这里声明私有变量和方法 */
    var privateVariable = 'something private';
    function showPrivate() {
        console.log(privateVariable);
    }

    /* 公有变量和方法（可以访问私有变量和方法） */
    return {
        publicMethod: function () {
            showPrivate();
        },
        publicVar: 'the public can see this!'
    };
})();

mySingleton.publicMethod();


/* ================================================================================ */
// 调用时生成单例，懒汉式， 这个连单例实例都是闭包中的私有变量
var Singleton = (function () {
    var instantiated;
    function init() {
        /*这里定义单例代码*/
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();

/* ================================================================================ */

var single = mySingleton();
single.publicMethod();  // 输出 'something private'
console.log(single.publicVar); // 输出 'the public can see this!'


var SingletonTester = (function () {

    //参数：传递给单例的一个参数集合
    function Singleton(args) {

        //设置args变量为接收的参数或者为空（如果没有提供的话）
        args = args || {};
        //设置name参数
        this.name = 'SingletonTester';
        //设置pointX的值
        this.pointX = args.pointX || 6; //从接收的参数里获取，或者设置为默认值
        //设置pointY的值
        this.pointY = args.pointY || 10;

    }

    //实例容器
    var instance;

    return {
        name: 'SingletonTester',

        //获取实例的方法
        //返回Singleton的实例
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.pointX); // 输出 5


