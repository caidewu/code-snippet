/**
 * Modal 是弹窗，有宽，高和内容
 * Dialog  是对话框， 有宽高，内容 还有一个按钮
 * Tips   是一个提示对话框， 有宽高，内容， 按钮，还有一个标题栏
 */

function Modal(height, width, content) {
    this.height = height;
    this.width = width;
    this.content = content;
}

Modal.prototype.open = function () {
    console.log('width:' + this.width + ' ,height:' + this.height + ' ,content:' + this.content);
};

function Dialog(height, width, content, button) {
    Modal.apply(this, arguments);
    this.button = button;
}
Dialog.prototype = Object.create(Modal.prototype);
Dialog.prototype.constructor = Dialog;
Dialog.prototype.showButton = function () {
    console.log('button:' + this.button)
};

function Tips(height, width, content, button, title) {
    Dialog.apply(this, arguments);
    this.title = title;
}
Tips.prototype = Object.create(Dialog.prototype);
Tips.prototype.constructor = Tips;
Tips.prototype.showTitle = function () {
    console.log('title:' + this.title)
};

/* ================================================================================ */

var tips = new Tips(100,200,'233333','ok','warn');

console.log(tips.__proto__ === Tips.prototype);                                     // true
console.log(tips.__proto__.__proto__ === Dialog.prototype);                         // true
console.log(tips.__proto__.__proto__.__proto__ === Modal.prototype);                // true
console.log(tips.__proto__.__proto__.__proto__.__proto__ === Object.prototype);     // true
console.log(tips.__proto__.__proto__.__proto__.__proto__.__proto__ === null);       // true

/* ================================================================================ */

/**
 * 如果没有Object.create()方法，
 * 就要通过一个空的构造函数来关联父类的原型
 */

function Modal(content) {
    this.content = content;
}

Modal.prototype.open = function () {
    console.log('content:' + this.content);
};

function Bridge() {}


function Dialog(content, button) {
    Modal.apply(this, arguments);
    this.button = button;
}
Bridge.prototype = Modal.prototype;
Dialog.prototype = new Bridge();
Bridge.prototype = null;

Dialog.prototype.constructor = Dialog;
Dialog.prototype.showButton = function() {
    console.log('button'+ this.button);
};


