var Commander = {
    find: function(id, content) {

    },
    cut: function(id, content) {

    },
    paste: function(id, content) {

    },
    execute: function (command) {
        return Commander[command.method](command.id, command.content);
    }
};