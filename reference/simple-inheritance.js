/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    this.Class = function(){};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == 'function' &&
            typeof _super[name] == 'function' && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        function Class() {
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;

        return Class;
    };
})();


var Person = Class.extend({
    init: function(isDancing){
        this.dancing = isDancing;
    },
    dance: function(){
        return this.dancing;
    }
});

var Ninja = Person.extend({
    init: function(){
        this._super( false );
    },
    dance: function(){
// Call the inherited version of dance()
        return this._super();
    },
    swingSword: function(){
        return true;
    }
});

var p = new Person(true);
p.dance(); // => true

var n = new Ninja();
n.dance(); // => false
n.swingSword(); // => true

// Should all be true
p instanceof Person && p instanceof Class && n instanceof Ninja && n instanceof Person && n instanceof Class