## regex

#### 새롭게 배운 패턴

`[01]` : 0 또는 1

`[^0]` : 0이 아닌 모든 문자

`[^01]` : 0과 1이 모두 아닌 문자

`?` : 있거나 말거나

* `/\d?/` : digit이 있거나 없거나

`{}` : 등장 횟수를 나타냄

* `a{1}` : a가 한 번 등장
* `a{1,3}` : a가 1~3번 등장
* `a{3,}` : a가 3번 이상 등장
* n번 이하 등장은 없나? `a{,2}` 는 쓸 수 없음

`()` : subexpression, 하나의 요소로 본다

* `/(boo+)+/.test("boooobooboooooo")` : true
* `/bad(ly)?/`

`^` : 맨 앞글자

`$` : 맨 뒷글자

* `/^\d+$/` : 맨 앞과 맨 뒤가 digit이어야 한다

`\b` : boundary, /w와 /W로 구분되는 **경계선**을 나타낸다. 문자에 매칭되는게 아님을 주의하자

`\s` : whitespace character, " "와 "\n"을 검출

`|` : OR 연산자



/n을 제외한 모든 문자: `.`

/n을 포함한 모든 문자: `[^]`

* 활용: comment 지우는 정규표현식 `"".replace(/\/\/.*|\/\*[^]*?\*\//g,"")`



탐욕 수량자: `+`, `*`, `?`, `{}`



`/y`: stick flag

* g플래그는 매칭할 다음 인덱스(lastIndex)이후에 오는 모든 문자열을 검사하지만,
* y플래그는 lastIndex에 무조건 다음 패턴이 와야된다





#### regex 객체

정규표현식은 생성자를 이용해서 생성할 수 있지만 축약된 표현이 더 많이 쓰인다

```javascript
let pattern = new RegExp("abc");
let pattern = /abc/;
```



**정규표현식의 프로퍼티**

* source: 패턴을 문자열로 반환
* lastIndex: 다음 매칭될 인덱스
  * 매칭할 패턴이 없으면 0으로 초기화
  * exec메소드로 실행되어야 변경된다
  * flag가 `g`나 `y`여야 한다
  * 한 객체가 가지는 속성이므로 같은 패턴으로 다른 문자열에 매칭할 경우 **주의**

```javascript
const pattern = /\d/g
console.log(pattern.exec(“123”));
console.log(pattern.exec(“1abc”)); // lastIndex가 1로 변경되어 "1"을 못찾는다
```



**메소드**

* test: boolean값 반환

```javascript
/pattern/.test("string");
```

* exec: 한 개의 패턴 매칭을 실행

```javascript
/pattern/.exec("string");
```





#### regex를 사용할 수 있는 string의 메소드

**match**: 매치된 문자열을 반환한다

* 2개 이상이 매치될 경우 배열 형태로 반환

```javascript
console.log("123".match(/\d/));
// ['1', index: 0, input: '123' ]
console.log("123".match(/\d/g));
// [ '1', '2', '3' ]
```

* `()`와 함께 사용하면 substr도 보여준다

```javascript
console.log("12-13-55".match(/(\d{2})-(\d{2})-(\d{2})/))
// [ '12-13-55', '12', '13', '55', index: 0, input: '12-13-55' ]
```





**replace**: 찾은 문자열을 바꿔준다

* `string.prototype.replace(regex | substr , newSubstr | function)`


* `()`와 함께 사용하면 `$`를 이용해 다시 호출할 수 있다: `$1` ~ `$9`까지 사용 가능, `$&`는 매칭된 전체 substr을 가리킴

```javascript
const result = "doe, john".replace(/(\w+), (\w+)/, "$2 $1");
console.log(result); // john doe
```

* 두 번째 인자로 들어오는 콜백함수는 다음과 같이 인자가 들어간다

  * callback(`$&`, `$1`, `$2`, ...)

  * ```javascript
    function swap(match, left, right){
        return right + left;
    }
    const result = "doe, john".replace(/(\w+), (\w+)/, swap);
    console.log(result); // john doe
    ```



**search**: 인덱스 반환, 정규표현식을 사용할 수 없는 indexOf메소드 대신 사용한다.





#### 동적으로 정규표현식 사용하기: RegExp 생성자 활용

```javascript
let name = ‘mando’;
let str = ‘Hi, mando’;
let regexp = new RegExp(“\\b(” + name + “)\\b”, “g”);
// \\d에서 \를 두 번 쓰는 이유: 일단 string안에서 한 번 벗겨지기 때문인 듯
console.log(str.replace(regexp, “_$1_”));
// ‘Hi, _mando_'
```

* 주의할 점: 동적으로 사용하면 name변수에 패턴에 영향을 끼치는 특수문자가 올 수 있다는 것을 항상 염두해야한다
* 따라서 다음과 같이 모든 특수문자에 `\`를 붙여준다

```javascript
let name = ‘man+do’;
let str = ‘Hi, man+do’;

let escaped = name.replace(/[\\[.+*?(){|^$]/g, “\\$&”);

let regexp = new RegExp(“\\b(“ + escaped +”)\\b”, “g”);
console.log(…);
// ‘Hi, _man+do_’
```





#### 매치되는 결과가 null이 안나오게 하려면

문자열의 match메소드를 사용해 매치되는 패턴을 다음과 같이 출력하기로 했다

```javascript
const pattern = /\d+/;
const result = string.match(pattern)[0]
```

그런데 매치되는 결과가 없으면 `string.match(pattern)`이 null이 되면서 `null[0]`형태가 되어 오류가 발생한다.

매치되는 결과가 없을 때 빈 문자열을 반환하고 싶다면...

0개 일 경우도 포함하는 `*` 패턴을 사용하자

```javascript
const pattern = /\d*/;
const string = "abc"
const result = string.match(pattern)[0]; // [ '', index: 0, input: 'abc' ][0]
```

`*`을 사용하면 일반화하기 쉽다.



#### loop와 정규표현식

매치된 각각의 문자열을 루프를 이용해 조작하고 싶다면

```javascript
const pattern = /\b\d+\b/g;
const input = “12, 13, 14”;
let match;
while(match = pattern.exec(input)){
  console.log(“number is “ + match[0] + “, index is “ + match.index);
}
```

for of와 match메소드를 사용할 수도 있다

```javascript
const pattern = /\b\d+\b/g;
const input = “12, 13, 14”;
let match;
for(str of input.match(pattern)){
    ...
}
```





#### AND 연산자

정규표현식에서 OR연산자는 `[]`나 `|`를 이용해 쉽게 표현할 수 있지만 AND연산자는 표현하기가 어렵다.

`[^pattern]`패턴과 not matcher(/S, /W 등 대문자 형태)를 이용하면 AND연산자를 표현할 수 있다.

`! ( a || b ) === !a && !b`를 이용한 패턴이다

```javascript
// \w이고 e이 아닌경우
const pattern = /[^\We];
```