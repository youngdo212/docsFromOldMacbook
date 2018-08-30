## 비동기 프로그래밍

멀티스레드 : cpu는 하나지만 여러일이 일어나는 것

자바스크립트는 아쉽게도 싱글 스레드..

debugging 의 step out : 현재 스택에서 나옴

디버깅 시 콜 스택에서 자세한 내부사정은 생략될 수 있음

* 예 ) forEach안의 익명함수는 콜스택에 표시되지 않는다

### setTimeOut과 비동기

call back함수 : 되불려진다는 뜻을 가진 함수

콜 스택과 콜백 큐(callback queue)

* 콜 스택 : 실제 **실행되는** 함수가 존재하는 공간
* 콜백 큐(또는 스택 큐) : 나중에 실행될 함수의 주소(?)가 저장되는 공간

Non-blocking : 콜 스택이 비워지지 않은 상태에서 뭔가 들어오지 않는 특성

setTimeOut이 정확한 시간을 보장해 주지 않는 이유 : 앞서 스택에 쌓인 함수가 오래걸릴 경우

* 스택이 비워져야 새롭게 실행되는데, 
* 스택이라는 공간이 비워지지 않았지 때문이다(싱글 스레드의 특징)

결국 비동기는 블로킹하지 않는다.

이벤트 루프 : 스택이 비워져 있는지를 계속 확인하고 비워졌으면 콜백큐의 것들을 콜스택에 올림

```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) =>{
  for(var i = 0; i < arr.length; i++){
    setTimeout(()=> fn(i), 1000);
  }
}

asyncRun(baseData, idx => console.log(idx));
```

클로저 때문에 7이 7번 출력된다

```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) =>{
  for(let i = 0; i < arr.length; i++){
    setTimeout(()=> fn(i), 1000);
  }
}

asyncRun(baseData, idx => console.log(idx));
```

let으로 바꾼다면? (let이 블록 레벨 스코프를 가지기 때문에) 0,1,2,3,4,5,6이 출력된다.

(정확하진 않지만 아래와 같은 모습)

```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) =>{
  // for(let i = 0; i < arr.length; i++){
  //   setTimeout(()=>fn(i), 1000);
  // }
  {
    let i = 0;
    setTimeout(()=>fn(i), 1000);
  }
  {
    let i = 1;
    setTimeout(()=>fn(i), 1000);
  }
  { 
    let i = 2;
    setTimeout(()=>fn(i), 1000);
  }
  {
    let i = 3;
    setTimeout(()=>fn(i), 1000);
  }
  {
    let i = 4;
    setTimeout(()=>fn(i), 1000);
  }
  {
    let i = 5;
    setTimeout(()=>fn(i), 1000);
  }
  {
    let i = 6;
    setTimeout(()=>fn(i), 1000);
  }
}

asyncRun(baseData, idx => console.log(idx));
```





setTimeOut은 재귀적으로 호출해도 콜스택에 안쌓인다.

이벤트 큐



##### 왜 7이 7번 나왔을까?

1. asyncRun함수에 `baseData`와 콜백함수`(idx) => console.log(idx)`를 인자로 넣어준다
2. asyncRun이 실행되고 콜 스택에 쌓인다
3. 1. for루프가 실행된다
   2. 1. i가 0으로 초기화 되고 i < arr.len 이므로 for문 안의 setTimeOut가 실행되어 콜스택에 쌓인다.
      2. setTimeOut함수는 인자로 들어온 콜백함수 `( ) => (i) => console.log(i)`를 webApi에 1초 타이머를 킨 채로 보내준다; **여기서 아직 콜백함수가 실행되지 않았다는 사실에 주의한다**
      3. setTimeOut이 완료되면서 콜 스택에서 빠지게 된다.
      4. 이제 i++이 실행된다
      5. i는 1이 되고 여전히 i < arr.len 이므로 for문 안의 setTimeOut이 실행되어 콜 스택에 쌓인다
      6. 마찬가지로 콜백함수 `( ) => (i) => console.log(i)`를 webApi에 보낸다.
      7. 콜 스택에서 setTimeOut이 사라진다
      8. ...
      9. i가 7이되면 i < arr.len을 만족하지 않으므로 for문을 빠져나온다.
   3. for문이 실행이 끝나면 콜 스택에 쌓였던 asyncRun이 빠져 나온다
4. global context까지 완료되면 콜 스택은 이제 비어있게 된다.
5. 콜 스택이 비워졌으므로 이제 이벤트 루프가 콜백 큐를 확인한다.
6. 1초가 지난 뒤 webApi에 있던 익명함수`( ) => (i) => console.log(i)`들이 차례로 콜백 큐에 들어오게 된다.
7. 이벤트 루프가 첫 번째 `( ) => (i) => console.log(i)`를 콜스택에 올린다.
8. 익명함수 `( ) => (i) => console.log(i)`가 실행된다. 
9. `i`를 현재 스코프에서 찾을 수 없으므로 스코프 체인을 따라 클로져 스코프를 찾는다.
10. i는 for루프 과정에서 마지막에 7이 되어있으므로 7을 출력한다.
11. 실행이 완료된 익명함수 `( ) => (i) => console.log(i)`가 콜스택에서 빠진다
12. 콜 스택이 비워졌으므로 이벤트 루프가 큐에서 또 다른 `( ) => (i) => console.log(i)`를 콜 스택에 올린다
13. 결국 이 과정에서 7이 7번 출력된다.



##### setTimeOut을 재귀적으로 호출하면 어떻게 될까?

```javascript
function animate() {
   setTimeout(animate, 1000)
}
animate();
```

1. global context가 콜 스택에 먼저 쌓인다.
2. `animate`함수가 실행되면 콜 스택에 쌓이고 실행된다.
3. `setTimeOut`이 실행되어 콜 스택에 다시 쌓인다
4. `setTimeOut`은 `animate`함수를 webApi에 1초 타이머를 두고 넘겨준다.
5. `setTimeOut`은 실행이 완료되어 콜 스택에서 빠진다.
6. `animate`함수도 실행이 완료되어 콜 스택에서 빠진다.
7. global context도 더 이상 실행할 코드가 없으므로 콜 스택에서 빠진다.
8. 콜 스택이 비워졌으므로 이벤트 루프가 콜백 큐를 뒤진다
9. 1초 뒤 webApi에서 넘겨준 `animate`함수가 큐에 있으므로 이벤트 루프가 콜 스택에 `animate`를 올려준다
10. 콜 스택에서 `animate`를 실행한다.
11. 결국 animate가 재귀적으로 호출 되더라도 setTimeOut을 이용하면 콜 스택에 쌓지 않고 animate를 호출할 수 있다.

```javascript
function fibonacci(n, pprev = 1, prev = 0){
  if(n < 0) return ;
  const curr = pprev + prev;
  console.log(curr);
  setTimeout(() => fibonacci(n-1, prev, curr), 1000);
}

fibonacci(6);
```

비동기를 활용한 피보나치 재귀