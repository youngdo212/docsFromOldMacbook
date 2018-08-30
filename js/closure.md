# closure
```
1 > var make = function() {  
2 >   var funs=[];  
3 >   while(true) {  
4 >       if(funs.length >9) break;  
5 >       var rValue =Math.random()*10;  
6 >       //console.log(rValue)  
7 >       funs.push(function(){return rValue});  
8 >   }  
9 >   return funs;  
10 > }  
11 > var randomDataFuns = make();
12 > console.log(randomDataFuns[3]());  //??
13 > console.log(randomDataFuns[5]());  //??
```

함수는 호출될 때, 즉 ()가 입력됐을 때 실행된다는 사실을 기억하고 시작한다.  
make함수는 배열을 리턴한다. 배열 안에는 10개의 함수가 들어가 있다. 배열안의 함수(임의로 f라 하자)는 make함수의 로컬변수인 rValue를 리턴하는 함수이다.
make함수안에 선언된 내장함수 f가 외부함수의 로컬변수 rValue를 참조하고 있으므로 함수f는 closure scope를 가진다로 할 수 있다.  

이제 실행순서를 나열해보자.

* 1번줄에서 make함수가 정의된다.
* 11번 줄에서 make함수가 호출된다.(1스택)
  * funs라는 배열을 생성한다.
  * 배열의 길이가 10이 될 때 까지 while문을 반복한다
    * 0 < rValue <= 10인 임의의 소수 rValue를 생성
    * rValue를 리턴하는 함수 f를 정의(**호출을 안했기 때문에 아직 rValue에 값이 담기지 않는다**)
    * 배열에 push
  * 함수 f가 10개 담긴 배열 funs를 리턴
* randomDataFuns에 배열이 담긴다(0스택)
* 12번 줄에서 randomDataFuns의 4번째 원소 함수 f를 호출(1스택)
  * rValue를 리턴해야 하지만 f 내부에 rValue가 없다
  * closure scope로 이동
  * rValue를 찾았다!(**마지막으로 정의된 랜덤한 소수이다**)
  * 찾은 값을 불러와 rValue에 담아 리턴
* 값이 출력된다(0스택)
* 13번 줄에서 randomDataFuns의 6번째 원소 함수 f를 호출(1스택)
  * rValue를 리턴해야 하지만 f 내부에 rValue가 없다
  * closure scope로 이동
  * rValue를 찾았다!(**마지막으로 정의된 랜덤한 소수이다**)
  * 찾은 값을 불러와 rValue에 담아 리턴
* 12번 줄과 **같은 값**이 출력된다(0스택)

결국 함수가 호출될 때에만 값에 접근하므로 같은 값(마지막으로 정의된 rValue)이 출력된다