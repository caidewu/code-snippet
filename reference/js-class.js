/**
 * 巧妙之处在于通过在构造函数本体内设置开关
 * 通过开关控制是生成一个空的构造函数还是完整的构造函数
 */
var JS = {
    VERSION: '2.2.1'
};

JS.Class = function(classDefinition) {

    function getClassBase() {
        return function() { // 构造函数本体
            if (typeof this['construct'] === 'function' && preventJSBaseConstructorCall === false) {
                this.construct.apply(this, arguments); // new的时候执行构造函数内的代码
            }
        }
    }

    /**
     * 类初始化函数
     * @param classDefinition
     * { statics: {},
     *   construct: function,
     *   xxxMethod: function
     * }
     *
     */
    function createClassDefinition(classDefinition) {
        var parent = this.prototype['parent'] || (this.prototype['parent'] = {});
        for (var prop in classDefinition) {
            if (prop === 'statics') {
                for (var sprop in classDefinition.statics) {
                    this[sprop] = classDefinition.statics[sprop]; // 静态属性设置到构造函数上
                }
            } else {
                if (typeof this.prototype[prop] === 'function') { // 把方法设置到parent属性上，继承有用
                    // var parentMethod = this.prototype[prop];
                    // parent[prop] = parentMethod;
                    parent[prop] = this.prototype[prop];
                }
                this.prototype[prop] = classDefinition[prop]; // 定义的属性或方法设置到原型上
            }
        }
    }

    var preventJSBaseConstructorCall = true;
    var Base = getClassBase();
    preventJSBaseConstructorCall = false;
    createClassDefinition.call(Base, classDefinition);

    Base.extend = function(classDefinition) {
        preventJSBaseConstructorCall = true;
        var SonClass = getClassBase();  // 生成空的子类
        SonClass.prototype = new this();// this是父类，继承父类原型,此时开关是关的，所以new的时候只生成了原型
        preventJSBaseConstructorCall = false;

        createClassDefinition.call(SonClass, classDefinition); // 子类原型
        SonClass.extend = this.extend; // 子类扩展方法

        return SonClass;
    };
    return Base;

};

var Animal = JS.Class({
   construct: function(name) {
       this.name = name;
   },
    shout: function(s) {
       console.log(s);
    }
});

var Dog = Animal.extend({
    construct: function(name, age) {
        this.parent.construct.apply(this, arguments); // 复用
        this.age = age;
    },
    run: function(r) {
        console.log(r)
    }
})