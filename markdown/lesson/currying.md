# Currying

pipe함수를 사용하면 함수의 단계를 쉽게 파악할 수 있음(읽기 좋은 코드)

 -> parser에 사용해 볼까?(tokenizer -> lexer -> parser)

```javascript
var getTodoInfo = pipe(split, trimmedArray, makeTodoObject);
```



## Definition



* applicaition: 인자를 받아 함수를 적용시켜 리턴 값을 제공하는 절차


* partial application: 여러개의 인자를 받아 **더 적은** 파라미터를 가지는 함수를 리턴하는 절차. 리턴된 함수는 나중에 사용된다. 
* curry: 여러개의 인자를 받아 **단 하나**의 파라미터를 갖는 함수를 반환하는 함수



Funcition.length => 파라미터의 갯수를 알려줌

```javascript
console.log((function f(a,b){}).length) // 2
```



currying

```javascript
let curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2,3)(4)); // 24
console.log(curriedMultiply(2)(3,4)); // 24
console.log(curriedMultiply(2, 3, 4)); // 24

function multiply(a,b,c){
  return a*b*c;
}


function curry(fn){
    return function f(...args){
        if(args.length === fn.length) return fn(...args)
        return (...restArgs) => f(...args, restArgs);
    }
}
```



## 과정

```javascript
function curry(fn){
    return function f(...args){
        if(args.length === fn.length) return fn(...args)
        return f;
    }
}
```

* `f`의 리턴함수`f`에 `...args`를 전달해 줘야한다
  * `return f(...args)` 하면 f가 실행되서 안된다.
  * `return f` 를 하면 인자를 넘겨줄 수 없다.
  * 인자를 넘겨주면서 함수를 실행시키지 않는 방법이 있을까?
* 해결: 클로저와 익명함수를 이용하자!
  * `return (...a) => f(...args, ...a)` 
  * **익명함수**를 이용하면 함수 실행을 방지한다
  * 넘겨주고자 하는 인자`...args`를 **클로저를** 통해 안전하게 전달할 수 있다

## 나의 답

```javascript
function curry(fn){
  let acc = [];
  return function f1(...args){
    acc.push(...args);
    if(acc.length === fn.length) return fn(...acc);
    return f1;
  }
}

let curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2,3)(4)); // [Function : f1]
console.log(curriedMultiply(2)(3,4)); // [Function : f1]
console.log(curriedMultiply(2, 3, 4)); // [Function : f1]
```

왜 안됐을까? 

curry의 closure 스코프를 모두가 공유하고 있었기 때문!