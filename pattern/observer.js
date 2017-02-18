var Observer = {
    callbacks: [],
    add: function(fn) {
        this.callbacks.push(fn);
    },
    fire: function() {
        this.callbacks.forEach(function(fn) {
            fn();
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