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

    // 1.1 age가 30 이상인 users를 거른다.
    let temp_users = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].age >= 30) {
            temp_users.push(users[i]);
        }
    }
    console.log(`명령형으로 추출(age >= 30) users: `, temp_users);
    
    // 1.2 age가 30 이상인 user의 name을 수집한다.
    let temp_users_names = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].age >= 30) {
            temp_users_names.push(users[i].name);
        }
    }
    console.log(`명령형으로 추출(age >= 30) names: `, temp_users_names);

// 2. _filter, _map으로 리펙토링

    // 2.1 _filter
    /* 
    function _filter(list , predifn) {
        var new_list = [];
        for (var i = 0; i < list.length; i++) {
            if (predifn(list[i])) {
                new_list.push(list[i]);
            }
        }
        return new_list;
    }
    */

    // 2.1 _fileter에 _each 적용
    function _filter(list, predifn) {
        var new_list = [];
        _each(list, function(val) {
            if (predifn(val)) {
                new_list.push(val);
            }
        });
        return new_list;
    }


    console.log(
        `age >= 30:`,
        _filter(users, 
            function(user) {
                return user.age >= 30;
            }
        )
    );

    console.log(
        `age < 30:`,
        _filter(users,
            function(user) {
                return user.age < 30;
            }
        )
    );

    // console.clear();

    // 2.2 _map
    /* 
    function _map(list, mapperfn) {
        var new_list = [];
        for (var i = 0; i < list.length; i++) {
            new_list.push(mapperfn(list[i]));
        }
        return new_list;
    };
     */
    
    // 2.2 _map에 _each 적용
    function _map(list, mapperfn) {
        var new_list = [];
        _each(list, function(val) {
            new_list.push(mapperfn(val))
        })
        return new_list;
    }

    var age_30_over = _filter(
        users,
        function(user) {
            return user.age >= 30;
        }
    );

    var age_30_over_names = _map(
        age_30_over,
        function(user) {
            return user.name;
        }
    );

    console.log(`age >= 30 names`, age_30_over_names);
   
    /* 
    console.log(
        `age >= 30인 names:`,
        _map(
            _filter(users, 
                function(user) {
                    return user.age >= 30;
                }
            ),
            function(user) {
                return user.name;
            }
        )
    );
    */

    // 2.3 _each
    function _each(list, iterfn) {
        for (var i = 0; i < list.length; i++) {
            iterfn(list[i]);
        }
        return list;
    }

    // 2.4 다형성
    // 객체지향형 프로그래밍 처리 순서
    // 데이터, 클래스 -> 메서드
    console.log(
        `배열의 map 메소드: `,
        [1,2,3,4,5].map(function(v) {
            return v * 2;
        })
    );

    /* error Array가 아니다. 유사배열 객체 
    console.log(
        document.querySelectorAll('*').map(function(node) {
            return node.name;
        })
    );
    */

    // 함수형으로 프로그래밍
    // console.log(`유사배열 객체:`, document.querySelectorAll('*'));
    console.log(
        _map(
            document.querySelectorAll('*'),
            function(node) {
                return node;
            }
        )
    );
    
    console.clear();

// 3. _curry, _curryr
    
    // 3.1 _curry
    /* 
    function _curry(fn) {
        return function(a) {
            return function(b) {
                return fn(a, b);
            }
        }
    }
    */

    // 3.1 _curry 인자 2개 일 경우
    function _curry(fn) {
        return function(a, b) {
            return arguments.length == 2 ? 
                fn(a, b) : 
                function(b) {
                    return fn(a, b);
                }
        }
    }

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

    /* Lamda
    let _curryl = (fn) => 
        (a) => 
            (b) => 
                fn(a,b);
    */
    
    let add = _curry(function(a, b) {
        return a + b;
    });

    console.log(add(5, 7));

    let sub = _curryr(function(a, b) {
        return a - b;
    });

    let sub10 = sub(10);
    // 표현력이 떨어진다. -5가 나오게 curryr 함수를 작성해보자
    console.log(sub10(5));

    // 3.3 _get
    /* 
    function _get(obj, key) {
        return obj == null ? undefined : obj[key];
    }
    */

    // 함수의 표현력을 키우기 위해 _curryr 적용
    let _get = _curryr(function(obj, key) {
        return obj == null ? undefined : obj[key];
    });

    console.log(
        `_get curryr: `,
        _get(users[1], 'name')
    );

    let get_name = _get('name');

    console.log(
        `get_name: `,
        get_name(users[1])
    );

    console.log(
        _get(users[1], 'name')
    );

    let user1 = users[0];
    _get(user1, 'name');

    console.log(
        _get(users[1], 'name')
    );

    console.log(
        _get(users[10], 'name')
    );

    // 기존 코드에 _get 함수 적용
    console.log(
        `age >= 30인 names:`,
        _map(
            _filter(users, 
                function(user) {
                    return user.age >= 30;
                }
            ),
            /* 
            function(user) {
                return user.name;
            }
            */
            _get('name')
        )
    );






/* 

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
    // function _get(obj, key) {
        // return obj == null ? undefined : obj[key];
    // }

    // let user1 = users[0];
    // console.log(user1.name);
    // console.log(_get(user1, 'name'));
   
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

// 4. _reduce
    var slice = Array.prototype.slice;
    function _rest(list, num) {
        return slice.call(list, num || 1);
    }

    function _reduce(list, iter, memo) {
        //return iter(iter(iter(0, 1), 2), 3);
        if (arguments.length == 2) {
            memo = list[0];
            list = _rest(list);
        }
        _each(list, function(val) {
            memo = iter(memo, val);
        });
        return memo;
    }

    let add = function(a, b) {
        return a + b;
    }

    console.log(
        _reduce([1, 2, 3], add, 0)
    );

// 5. 파이프라인 만들기
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

    let f1 = _pipe(
        function(a) { return a + 1 ;},
        function(a) { return a * 2 ;},
        function(a) { return a * a ;}
    );
        
    console.log(f1(1));
        
    _go(1,
        function(a) { return a + 1 ;},
        function(a) { return a * 2 ;},
        function(a) { return a * a ;}
    );

    _go(users,
        function(users) {
            return _filter(users, function(user) {
                return user.age >= 30;
            });
        },
        function(users) {
            return _map(users, _get('name'));
        },
        console.log
    );
*/