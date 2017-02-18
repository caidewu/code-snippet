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
