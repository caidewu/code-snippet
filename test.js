function A () {
    function B() {
        this.a = 'a';
        this.b = 'b'
    }

    return (B.b = function() { console.log('B.b')});

}

A()