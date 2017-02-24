String.prototype.trim = function(){
    return this.replace(/(^\s+)|(\s*$)/g,"");
};


function getParam(param) {
    var rep = new RegExp('(^|&)' + param + '=([^&]*)($|&)');
    var ret = location.search.slice(1).match(rep);
    return ret ? decodeURIComponent(ret[2]) : '';
}

function getParam1(param) {
    var query = location.search.slice(1);
    var queryArray = query.split('&');
    var obj = {};
    queryArray.forEach(function(item) {
        var ret = item.split('=');

        if (ret[0]) {
            obj[ret[0]] = decodeURIComponent(ret[1]) || '';
        }
    });
    return param ? obj[param] : obj;
}




// 数组去重
Array.prototype.unique = function() {
    var obj = {},
        k,
        ret = [];

    this.forEach(function(v) {
        if (typeof v == 'number') {
            k = 'n' + v;
        } else {
            k = v;
        }

        if (!obj[k]) {
            ret.push(v);
            obj[k] = true;
        }

    });
    return ret;
};



Array.prototype.unique1 = function() {
    var obj = {},
        type,
        ret = [];

    this.forEach(function(v) {
       type = typeof v;

        if (!obj[v]) {
            ret.push(v);
            obj[v] = [type];
        } else if (obj[v].indexOf(type) === -1) {
            ret.push(v);
            obj[v].push(type);
        }

    });
    return ret;
};