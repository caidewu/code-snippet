var Observer = {
    callbacks: [],
    add: function(fn) {
        this.callbacks.push(fn);
    },
    fire: function(arg1,arg2,arg3) {
        this.callbacks.forEach(function(fn) {
            fn(arg1, arg2, arg3);
        })
    }
};

Observer.add(function() {
    console.log('method1',arguments[0]);
});

Observer.add(function(a,b) {
    console.log('method2', b);
});

Observer.add(console.log.bind(null, 'method3'));

Observer.fire('aa','bb','cc');