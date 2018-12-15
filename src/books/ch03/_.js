// import lodash from 'lodash';
// import _ from 'underscore';

const _ = {};

let users  = [
  {id:1, name:'ID', age:32},
  {id:2, name:'HA', age:25},
  {id:3, name:'BJ', age:32},
  {id:4, name:'PJ', age:28},
  {id:5, name:'JE', age:27},
  {id:6, name:'JM', age:32},
  {id:7, name:'HI', age:24}
];

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function getLength(list) {
  return list == null ? void 0 : list.length; // void 0의 결과는 undefined
}

var isArrayLike = function(list) {
  var length = getLength(list);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

_.map = function(data, iteratee) {
  var new_list = [];
  if (isArrayLike(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      new_list.push(iteratee(data[i], i, data));
    }
  } else {
    for (var key in data) {
      if (data.hasOwnProperty(key)) new_list.push(iteratee(data[key], key, data))
    }
  }
  return new_list;
}

_.identity = function(v) {
  return v;
};

_.values = function(list) {
  return _.map(list, _.identity);
};

_.each = function(data, iteratee) {
  if (isArrayLike(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      iteratee(data[i], i, data);
    }
  } else {
    for (var key in data) {
      if (data.hasOwnProperty(key)) iteratee(data[key], key, data);
    }
  }
  return data;
};

_.isObject = function(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}

_.keys = function(obj) {
  return _.isObject(obj) ? Object.keys(obj) : [];
}

function bloop(new_data, body) {
  return function(data, iteratee) {
    var result = new_data(data);
    if (isArrayLike(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        body(iteratee(data[i], i, data), result);
      }
    } else {
      for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
        body(iteratee(data[keys[i]], keys[i], data), result);
      }
    }
    return result;
  }
}

_.map = bloop(function() {
  return [];
}, function(val, obj) {
  return obj.push(val);
});

_.each = bloop(function(v) {
  return v;
}, function() {});

_.filter = function(data, predicate) {
  var result = [];
  _.each(data, function(val, idx, data) {
    if (predicate(val, idx, data)) result.push(val);
  });
  return result;
}

console.log(
  _.filter([1, 2, 3, 4], function(val) {
    return val  > 2;
  })
)

function bloop(new_data, body) {
  return function(data, iter_predi) {
    var result = new_data(data);
    if (isArrayLike(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        body(iter_predi(data[i], i, data), result, data[i]);
      }
    } else {
      for (var i = 0, keys = _.keys(data), len = keys.length; i< len; i++) {
        body(iter_predi(data[keys[i]], keys[i], data), result, data[keys[i]]);
      }
    }
    return result;
  }
}

_.array = function() { return []; };

_.filter = bloop(
  _.array,
  function(bool, result, val) {
    if (bool) result.push(val);
  }
);

_.toArray = function(list) {
  return Array.isArray(list) ? list : _.values(list);
};

_.rest = function(list, num) {
  return _.toArray(list).slice(num || 1);
};

_.reverse = function(list) {
  return _.toArray(list).reverse();
};

_.rester = function(func, num) {
  return function() {
    return func.apply(null, _.rest(arguments, num));
  }
};

function sum(a, b, c, d) {
  return (a || 0) + (b || 0) + (c || 0) + (d || 0);
}

console.log(
  _.rester(sum)(1, 2, 3, 4)
);