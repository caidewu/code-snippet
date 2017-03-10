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
    console.log('method1');
});

Observer.add(function() {
    console.log('method2');
});

Observer.fire();