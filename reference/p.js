/**
 * 通过中间函数（Bare）断开父子类的原型链
 */
var P = (function(prototype, ownProperty, undefined) {
    // 这个undefined是什么意思呢，明白了，是IE6之前并没有全局的undefined对象，
    // 这样第三个型参，因为没有实参传进来，所以就天然等于undefined，看来作者是个远古前端
    return function P(_superclass /* = Object */, definition) {
        // handle the case where no superclass is given, 没有父类的时候第一个参数为需要定义的类地方dfd
        if (definition === undefined) {
            definition = _superclass;
            _superclass = Object;
        }

        // C is the class to be returned.
        //
        // When called, creates and initializes an instance of C, unless
        // `this` is already an instance of C, then just initializes `this`;
        // either way, returns the instance of C that was initialized.
        //
        //  TODO: the Chrome inspector shows all created objects as `C`
        //        rather than `Object`.  Setting the .name property seems to
        //        have no effect.  Is there a way to override this behavior?
        function C() {
            var self = this instanceof C ? this : new Bare;
            self.init.apply(self, arguments);
            return self;
        }

        // C.Bare is a class with a noop constructor.  Its prototype will be
        // the same as C, so that instances of C.Bare are instances of C.
        // `new MyClass.Bare` then creates new instances of C without
        // calling .init().
        function Bare() {} // 空构造函数，用做集成原型
        C.Bare = Bare; // 如果只想继承C的原型，直接new MyClass.Bare就可以，所以把Bare这个开放出去

        // Extend the prototype chain: first use Bare to create an
        // uninitialized instance of the superclass, then set up Bare
        // to create instances of this class.
        var _super = Bare[prototype] = _superclass[prototype]; // Bare继承父类原型（如果有父类的话）
        var proto = Bare[prototype] = C[prototype] = C.p = new Bare;  // 创建C构造函数原型

        // pre-declaring the iteration variable for the loop below to save
        // a `var` keyword after minification
        var key;

        // set the constructor property on the prototype, for convenience
        proto.constructor = C; // ?????

        C.extend = function(def) { return P(C, def); }; // 新增对象的原型方法，把自己当父类，def是新加原型属性（方法）,返回新的子类

        return (C.open = function(def) {
            // 代码从这里开始执行
            if (typeof def === 'function') {
                // call the defining function with all the arguments you need
                // extensions captures the return value.
                def = def.call(C, proto, _super, C, _superclass); // 子类原型，父类原型，子类构造函数，父类构造函数
            }

            // ...and extend it, 通过extend方法增加原型上属性
            if (typeof def === 'object') {
                for (key in def) {
                    if (ownProperty.call(def, key)) { // 判断当前原型上没有该方法才增加，
                        proto[key] = def[key];
                    }
                }
            }

            // if no init, assume we're inheriting from a non-Pjs class, so
            // default to using the superclass constructor.
            if (!('init' in proto)) proto.init = _superclass;

            return C;
        })(definition);
    }

    // as a minifier optimization, we've closured in a few helper functions
    // and the string 'prototype' (C[p] is much shorter than C.prototype)
})('prototype', ({}).hasOwnProperty); // 妈蛋，不就是Object.hasOwnProperty吗，炫技！！


// test.js

var Person = P(function(proto, subProto, current, parent) {
    console.log(current);
    proto.init = function(name, age) {
        this.name = name;
        this.age = age;
    }

    proto.showName = function() {
        alert(this.name);
    }
});