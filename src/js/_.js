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


function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? 
             fn(a, b) : 
             function(b) { return fn(a, b) }
    }
}

let _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

// 5.1 _pipe
function _pipe() {
    var fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg)
    }
}

// 5.2 _go
function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

/* 
let _map = _curryr(_map),
    _filter = _curryr(_filter);
 */