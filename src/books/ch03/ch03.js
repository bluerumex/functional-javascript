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