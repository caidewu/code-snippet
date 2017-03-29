
function F() {
    let args = Array.apply(null, arguments);
    let ctx = args.shift();
    console.log('args:',args);
    console.log('ctx:',ctx);

    if (this === F) {
        let that = args.shift();
        console.log('args:',that);
        ctx.apply(that, args);
    } else {
        this.apply(ctx, args);
    }

}

Function.prototype.call1 = F;



class Task {
    static propTypes = {
        a: 'aaa',
        b: 'bbb',
    }

    constructor(...props) {
        this.c = 'ccc';
    }
}