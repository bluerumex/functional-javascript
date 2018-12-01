/* 
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
*/

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
    _each(list, function(val, key) {
        new_list.push(mapperfn(val, key));
    });

    return new_list;
}

var _pairs = _map((val, key) => [key, val]);

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
        iterfn(list[keys[i]], keys[i]);
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

//------------------- chapter collection -------------------//

// _values
var _values = _map(_identity); // _map은 현재 _curryr로 구현

function _identity(val) {
    return val;
}

// _pluck
function _pluck(data, key) {
    return _map(data, _get(key));
}

// _reject
function _negate(func) {
    return function(val) {
        return !func(val);
    }
}

function _reject(data, predi) {
    return _filter(data, _negate(predi));
}

// _compact (true 한 값을 남김)
var _compact = _filter(_identity);

// _find
var _find = _curryr(function(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]];
        if (predi(val)) return val;
    }
});

// _find_index 
var _find_index = _curryr(function(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        if (predi(list[keys[i]])) return i;
    }
    return -1;
});

// _some (조건에 맞는 값이 하나라도 있을경우 true)
function _some(data, predi) {
    return _find_index(data, predi || _identity) != -1;
}

// _every (조건에 모든 값이 true일 경우 true)
function _every(data, predi) {
    return _find_index(data, _negate(predi || _identity)) == -1;
}

function _min(data) {
    return _reduce(data, function(a, b) {
        return a < b ? a : b;
    })
}

// 최대값 찾기
function _max(data) {
    return _reduce(data, function(a, b) {
        return a > b ? a : b;
    })
}

function _min_by(data, iter) {
    return _reduce(data, function(a, b) {
        return iter(a) < iter(b) ? a : b;
    })
}

function _max_by(data, iter) {
    return _reduce(data, function(a, b) {
        return iter(a) > iter(b) ? a : b;
    })
}

var _min_by = _curryr(_min_by),
    _max_by = _curryr(_max_by);

// 4.2 group_by, push

function _push(obj, key, val) {
    (obj[key] = obj[key] || []).push(val);
    return obj;
}

var _group_by = _curryr(function(data, iter) {
    return _reduce(data, function(grouped, val) {
        return _push(grouped, iter(val), val);
    }, {});
});

// 4.3 count_by, inc

var _inc = function(count, key) {
    count[key] = count[key] ? count[key]++ : 1;
    return count;
}

var _count_by = _curryr(function(data, iter) {
    return _reduce(data, function(count, val) {
        return _inc(count, iter(val));
    }, {})
});