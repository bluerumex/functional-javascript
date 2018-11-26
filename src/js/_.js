// 2.1 _filter
function _filter(list, predi) {
    var new_list = [];
    _each(list, function(val) {
        if (predi(val)) {
            new_list.push(val);
        }
    })
    return new_list;
}

// 2.2 _map
function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    })
    return new_list;
}

// 2.3 _each
function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}