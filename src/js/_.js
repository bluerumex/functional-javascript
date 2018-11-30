let users  = [
    {id:1, name:'ID', age:36},
    {id:2, name:'BJ', age:32},
    {id:3, name:'JM', age:32},
    {id:4, name:'PJ', age:27},
    {id:5, name:'HA', age:25},
    {id:6, name:'JE', age:26},
    {id:7, name:'JI', age:31},
    {id:8, name:'MP', age:23}
];


// 2.1 _filter
function _filter(list, predfn) {
    var new_list = [];
    _each(list, function(val) {
        if (predfn(val)) {
            new_list.push(val);
        }
    });

    return new_list;
}

// 2.2 _map
function _map(list, mapperfn) {
    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapperfn(val))
    });

    return new_list;
}

// 2.3 _each
var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

var _length = _get('length');

function _each(list, iterfn) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        iterfn(list[keys[i]]);
    }
    return list;
};

// 3.1 _curry
function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? 
            fn(a, b) :
            function(b) {
                return fn(a, b);
            }
    }
};
    
// 3.2 _curryr
function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? 
            fn(a, b) :
            function(b) {
                return fn(b, a);
            }
    }
}

// 4.1 _reduce
function _reduce(list, iterfn, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function(val) {
        memo = iterfn(memo, val)
        // memo: accmulator
        // val: currentValue
    })
    
    return memo;
}

// 4.2 _rest
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

// 5.1 _pipe
function _pipe() {
    var fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg);
    }
};

// 5.2 _go 
// _pipe의 즉시 실행 버전
function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

// _filter, _map에 _curryr 적용
var _filter = _curryr(_filter),
    _map = _curryr(_map);