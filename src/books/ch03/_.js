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

console.log(
  _.chain([1, 2, 3])
    .map(n => n * 2)
    .filter(n => n <= 4)
    .value()
); // [2, 4]