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
        _each(list, function(val) {
            if (predi(val)) {
                new_list.push(val);
            }
        })
        return new_list;
    }
    
    let over_30 = _filter(users, user => user.age >= 30);
    let under_30 = _filter(users, user => user.age < 30);
    let numEven = _filter([1,2,3,4,5,6,7,8,9,10], num => (num % 2) == 0);
    console.log(`numEven: ${numEven}`);
    
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

    let over_30_names = _map(over_30, user => user.name);
    let under_30_ages = _map(under_30, user => user.age);
    // console.log(over_30_names);
    // console.log(under_30_ages);

    console.log(
        _map(
            _filter(users, user => user.age >= 30),
            user => user.age
        )
    );

// 3. _curry, _curryr
    // 3.1 _curry
    function _curry(fn) {
        return function(a) {
            return function(b) {
                return fn(a, b);
            }
        }
    }

    // 3.1 _curry 첫번째 함수에서 arguments가 둘 이상 들어올 경우
    function _curry2(fn) {
        return function(a, b) {
            return arguments.length == 2 ? 
                 fn(a, b) : 
                 function(b) { return fn(a, b) }
        }
    }
    
    
    function _curryr(fn) {
        return function(a, b) {
            return arguments.length == 2 ? 
                fn(a, b) : 
                function(b) { return fn(b, a) }
        }
    }

    let addCurry = _curry(function(a, b) {
        return a + b;
    });

    let add5 = addCurry(5);
    console.log(add5(5));

    let sub = _curryr(function(a, b) {
        return a - b;
    });

    let sub10 = sub(10);
    console.log(sub10(5));

    // 3.2 _get을 만들어 좀 더 편하게 하기
    /* 
    function _get(obj, key) {
        return obj == null ? undefined : obj[key];
    }

    let user1 = users[0];
    console.log(user1.name);
    console.log(_get(user1, 'name'));
    */
   
    let _get = _curryr(function(obj, key) {
       return obj == null ? undefined : obj[key];
    });
    
    let user1 = users[0];
    console.log(_get('name')(user1));

    console.log(`_get: ${_get('name')}`);

    // _get을 이용해 더 간결하게
    console.log(
        _map(
            _filter(users, user => user.age >= 30),
            // user => user.age
            // function(user) { return user.age }
            _get('name')
        )
    );

    console.log(
        _map(
            _filter(users, user => user.age >= 30),
            // user => user.age
            // function(user) { return user.age }
            _get('age'),
        )
    );