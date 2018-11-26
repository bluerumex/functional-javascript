let users  = [
    {id:1, name:'ID', age:36},
    {id:2, name:'BJ', age:32},
    {id:3, name:'JM', age:32},
    {id:4, name:'PJ', age:27},
    {id:5, name:'HA', age:25},
    {id:6, name:'JE', age:26},
    {id:7, name:'JI', age:31},
    {id:8, name:'MP', age:23}
]

// 1. 명령형 코드
    // 1. age가 30 이상인 users를 거른다.
    let temp_users = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].age >= 30) {
            temp_users.push(users[i]);
        }
    }
    // console.log(temp_users);
    
    // 2. age가 30 이상인 user의 name을 수집한다.
    let temp_users_names = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].age >= 30) {
            temp_users_names.push(users[i].name);
        }
    }
    // console.log(temp_users_names);

// 2. _filter, _map으로 리펙토링
    // 2.1 _filter
    function _filter(list, predi) {
        var new_list = [];
        for (var i = 0; i < list.length; i++) {
            if (predi(list[i])) {
                new_list.push(list[i]);
            }
        }
        return new_list;
    }
    
    let over_30 = _filter(users, user => user.age >= 30);
    let under_30 = _filter(users, user => user.age < 30);
    let numEven = _filter([1,2,3,4,5,6,7,8,9,10], num => (num % 2) == 0);
    console.log(`numEven: ${numEven}`);
    
    // 2.2 _map
    function _map(list, mapper) {
        var new_list = [];
        for (var i = 0; i < list.length; i++) {
            new_list.push(mapper(list[i]));
        }
        return new_list;
    }

    // 2.3 _each
    function _each(list, iter) {
        for (var i = 0; i < list.length; i++) {
            iter(list[i]);
        }
        return list;
    }

    let over_30_names = _map(over_30, user => user.name);
    let under_30_ages = _map(under_30, user => user.age);
    console.log(over_30_names);
    console.log(under_30_ages);
