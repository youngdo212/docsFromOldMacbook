# ch11. Asynchronous



## promise

promise는 특정 시점에 완료되고, 값을 리턴하는 비동기 동작이다. `Promise.resolve`를 이용해서 Promise를 생성할 수 있다.

```javascript
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// → Got 15
```

resolve에 넣은 값은 promise안에서 감싸진다. 만약 넣은 값이 promise라면 그냥 그 promise를 리턴한다. 



**then 메소드**

promise의 결과를 얻기 위해서 then메소드를 사용한다. then메소는 promise가 값을 해결하고 제공할 때 호출될 콜백함수를 등록한다.

한 promise에 여러개의 콜백함수를 등록할 수 있는데, promise가 이미 resolve된 후에도 호출될 수 있다.

또한 then메소드는 다른 promise를 리턴한다.

handler function?



Promise 생성자안에 콜백함수가 들어간다. ~~이 콜백함수는 비동기적으로 실행되고~~ 성공했을 시 resolve함수를, 실패했을 시 reject함수를 실행



## promise 사용법

함수를 **붙일 수 있는** 객체를 리턴한다.

```javascript
function doSomething() {
  return new Promise((resolve, reject) => {
    console.log("It is done.");
    // Succeed half of the time.
    if (Math.random() > .5) {
      resolve("SUCCESS")
    } else {
      reject("FAILURE")
    }
  })
}

const promise = doSomething(); 
promise.then(successCallback, failureCallback);
```





guarantee

* js 이벤트 루프의 현재 실행이 완료되지 않으면 콜백함수는 호출되지 않는다
* 심지어 promise의 성공 또는 실패 이후에도,`.then`메소드를 통해서 콜백함수를 붙일 수 있다.
* 붙인 순서와 별개로 여러 콜백함수를 붙일 수 있다



chaining

두 개 이상의 비동기 작업을 연달아서 해야될 때, `.then`을 이용하여 promise chain을 한다.

```javascript
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```

`then`메소드는 새로운 promise를 리턴

새로운 promise는 `doSomething`뿐만아니라 `successCallback`과 `failureCallback`의 완료를 나타낸다.

콜백함수는 promise를 리턴할 수 있는데, 이 경우에 체이닝을 사용하여 붙여진 콜백함수는 큐 뒤에 붙는다.



예전에는 콜백함수를 연이어서 사용하려면 콜백헬이 발생했었음

```javascript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

promise 체이닝을 사용하면 이같은 현상이 없어짐

```javascript
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

* catch는 `then(null, failureCallback)`과 같다



#### 에러 증식

