
// 最简单的双向绑定 这应该就是vue2.0的做法
Object.defineProperty(user, 'name', {
    get: function () {
        return document.getElementById('foo').value;
    },
    set: function (newValue) {
        document.getElementById('foo').value = newValue;
    },
    configurable: true
});