function ajax(success, fail) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange(function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                return success(xhr.responseText);
            } else {
                return fail(xhr.status);
            }
        }
    });
}
