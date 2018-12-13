import lodash from 'lodash';
import _ from 'underscore';

let users  = [
  {id:1, name:'ID', age:32},
  {id:2, name:'HA', age:25},
  {id:3, name:'BJ', age:32},
  {id:4, name:'PJ', age:28},
  {id:5, name:'JE', age:27},
  {id:6, name:'JM', age:32},
  {id:7, name:'HI', age:24}
];

_.each([1, 2, 3], function(val, idx, list) {
  console.log(val, idx, list)
});

let list = [1, 2, 3, 4, 5, 6];

console.log(
  _.reject(list, num => num % 2 == 0)
);

console.log(
  _.pluck(users, 'name')
);

console.log(
  _.first([5, 4, 3, 2, 1]),
  _.first([5, 4, 3, 2, 1], 1),
  _.first([5, 4, 3, 2, 1], 2),
  _.last([5, 4, 3, 2, 1]),
  _.last([5, 4, 3, 2, 1], 2),
  _.rest([5, 4, 3, 2, 1]),
  _.rest([5, 4, 3, 2, 1], 2),
  _.initial([5, 4, 3, 2, 1]),
  _.initial([5, 4, 3, 2, 1], 2),
  _.lastIndexOf([5, 4, 3, 2, 1], 2),
  _.flatten([[1, 2, 3], [4, 5], 6]), // 깊이를 가진 배열을 펴준다.
  _.values({ id: 1, name: 'ID', age: 32 }), // 객체의 값들을 리턴
  _.keys({ id: 1, name: 'ID', age: 32 }),
  _.extend({ id: 1, name: 'ID', age: 32 }, { age: 36, job: 'Developer'}),
  // 왼쪽에 있는 객체에 오른쪽의 객체를 덮어 씌운다
  _.pick({ id: 1, name: 'ID', age: 32 }, 'name', 'age'),
  _.omit({ id: 1, name: 'ID', age: 32 }, 'name', 'age')
);

// 체인 방식으로 사용하기
console.log(
  _.filter(
    _.map([1, 2, 3], n => n * 2),
    n => n <= 4
  )
);

console.log(
  _.chain([1, 2, 3])
    .map(n => n * 2)
    .filter(n => n <= 4)
    .value()
);

var listArr = _.range(50);
// [0, 1, 2, 3, 4..........49]

// Underscore.js
var _i = 0;
var result1 = 
  _.chain(listArr)
    .filter(function(num) {
      _i++;
      return num % 2 == 0;
    })
    .take(5)
    .value();

console.log(result1, _i); // [0, 2, 4, 6, 8], 50회 반복

// Lodash 지연평가..
var lodash_i = 0;
var result2 = 
  _.chain(listArr)
    .filter(function(num) {
      lodash_i++;
      return num % 2 == 0;
    })
    .take(5)
    .value();

console.log(result2, lodash_i); // [0, 2, 4, 6, 8], 50회 반복
// _i 와 _lodash_i 의 결과값이 달라야 할텐데 동일하게 동작했다.
/*
lodash의 take를 이용한 filter 성능 개선 로직은 listArr.length가 200 이상일 때만 동작한다.
무조건 지연 평가를 하려면 선행 로직이 필요하고, 이 후 실행되었을때에도 take의 값으로
루프의 중간에 나가기 위해 반복문 내부에서 limit == list.length를
체크하는 로직이 추가되어야 하기 때문이다.
*/

_.filter2 = function(data, predi, limit) {
  var list2 = [];
  _.find(data, function(val, key, data) {
    return console.log(`pred: `, predi(val, key, data)) && list2.push(val) == limit;
  });
  return list2;
};

console.log(
  _.filter2(listArr, num => num % 2 == 0, 5)
);