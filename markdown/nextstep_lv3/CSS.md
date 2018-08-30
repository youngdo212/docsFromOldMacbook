## CSS를 HTML에서 사용하는 방법

`span { color : red;}`

* span: selector(선택자) : 스타일을 바꾸고 싶은 HTML 태그를 가리킴
* color: property
* red: value




### css attribute selector

* [attribute] : 태그의 해당 속성을 가지는 모든 태그를 선택

  * 단독으로 쓰일 수도 있고, selector 문법과 함께 쓰이기도 함

  * ```css
    a[target] {
        border: 1px;
    }
    .b[index="1"] {
        color: red;
    }
    ```

  * a태그 중 target 속성을 가지는 엘리먼트들

  * "b"클래스 중 index 속성값이 "1"인 엘리먼트들

  * https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors




### style을 HTML페이지에 적용하는 세가지 방법

inline(1순위) > internal(2순위) > external(3순위)



#### inline

html 태그 안에 넣는 방법 

`<span style = "color: blue;"></span>`



#### internal

head안에 스타일을 넣어줌

별도의 css파일을 관리하지 않아서 편리하다는 장점이 있다



#### external

별도의 css파일을 이용



```html
<html>
    <head>
        <!--internal-->
        <style>
            div > p {
                font-size: 20px;
            }
        </style>
        
        <!--external-->
        <link rel="stylesheet" href="css_basic.css">
    </head>
    <body>
        <div>
            <!--inline-->
            <p style="color:blue;">
                hello, world
            </p>
        </div>
    </body>
</html>
```

```css
/* css_basic.css */
div > p {
	border: 1px solid slategray;
}
```



## CSS에서의 상속 개념

> css combinator: selector들의 관계를 나타냄(자손선택자, 자식선택자 등)

css combinator를 이용해 하위 태그들에게 스타일을 상속할 수 있다.

**padding과 border같은 배치와 관련된 스타일은 상속을 받지 않는다.**

```html
<html>
    <head>
        <style>
            body > div{
              color: green; 
              font-size: 40px;
              border: 2px solid gray; // 상속 x
              padding: 20px; // 상속 x
            }
        </style>
    </head>
    <body>
        <div><span style="color: red;">i'm upper case</span>
          <ul>
            <li>im first</li>
            <li>
              <span>im second</span>
              <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur tempora atque minima. Similique sed cum placeat asperiores earum. Hic repellat ducimus aut minima ipsum nostrum excepturi suscipit aliquam nulla amet.</div>
            </li>
          </ul>
        </div>
    </body>
</html>
```



## 캐스캐이딩 - computedstyle이 결정되는 방식

> css : **cascading** style sheet

이름에서 보듯이 cascade는 css의 기반이 되는 중요한 개념이다.

> cascading: "Cascading" means that styles can fall (or cascade) from one style sheet to another, enabling multiple style sheets to be used on one HTML document. 여러 스타일 시트를 폭포처럼 흐르면서 스타일이 정해지는 것을 나타내는 듯?

css는 여러가지 스타일 정보를 기반으로 최종적으로 **경쟁**에 의해서 적절한 스타일이 반영된다.

cascase 상황에서 어떤 selector가 선택될 지는 다음과 같은 요인에 따른다. 

1. importance
2. specificity
3. source order

### 선언방식에 따른 차이

* inline > internal > external
* 나중의 것이 적용된다

```css
span {
    color: red;
}
span {
    color: blue;
}
/* blue가 적용 */
```

* 구체적인 표현이 적용된다

```css
body > span {
    color: red;
}
span {
    color: blue
}
/* red가 적용 */
```

* id가 적용된다

```html
<!--html-->
<div id="a" class="b">
    text
</div>
```

```css
/*css*/
#a {
    color: red;
}

.b {
    color: blue;
}
/* red 적용 */
```



**참고자료**: css specificity



## selector를 활용한 DOM탐색

트리구조(DOM tree)에서 원하는 정보를 tag, id, class, 속성등을 통해 빠르게 찾아가는 방법



#### class를 구체화 하기

`.myStyle` : class속성의 값이 myStyle

`span.myStyle` : span태그만 해당



#### 그룹 선택

```css
h1, span, div {
    color: red;
}
```



#### n번째 자식요소(nth-child)

**타입 상관없이** 부모의 자식 중 n번째 태그의 스타일을 바꾼다

물론 :앞의 태그의 타입과 일치해야 변경

```html
<div id="mando">
    <h2>단락 선택</h2>
    <p>첫 번째 단락</p>
    <p>두 번째 단락</p>
    <p>세 번째 단락</p>
</div>
```

```css
#mando > p:nth-child(2){
    color: red;
}
// "첫 번째 단락"의 스타일 변경
```



#### n번째 자식 타입요소(nth-of-type)

부모의 자식 중 :앞의 타입에 해당되는 n번째 태그의 스타일을 바꾼다

```html
<div id="mando">
    <h2>단락 선택</h2>
    <p>첫 번째 단락</p>
    <p>두 번째 단락</p>
    <p>세 번째 단락</p>
</div>
```

```css
#mando > p:nth-of-type(2){
    color: red;
}
// "두 번째 단락"의 스타일 변경
```





## COLOR, FONT와 같은 스타일 변경 방법

### color 변경

* color : rgb(red, green, blue, alpha);
* color: #ff0000; (=#f00);

### font 변경

* em: 부모로 부터 상속받은 기준 폰트 사이즈(디폴트는 16px)

* > em(M): 대문자 M의 가로 길이에서 유래됐다. 기준이 되는 폰트 사이즈를 뜻함

```html
<head>
    <style>
        body > div {
            font-size: 32px
        }
        span {
            font-size: 0.5em // 16px
        }
    </style>
</head>
<body>
    <div>
        <span>hello, world</span>
    </div>
</body>
```

* `font-family: san-serif` : 산세리프 폰트로 변경
  * `font-family: san-serif, monospace, …` : 산세리프를 적용하고, 없으면 모노스페이스, 없으면 그다음 ...

### background

* background-color: 배경 색
* background-image: url("...")
* background-position: center
* background-repeat: no-repeat(repeat-y)
  * 기본적으로 수직, 수평 반복하지만 값을 설정해 줄 수도 있다.
* 한 줄로 적용할 수도 있다(순서 상관 없음)
  * background: red url("…") no-repeat center top;





## BOX Model을 이용한 엘리먼트 배치

* width, height: contents의 크기
* border: 경계선의 굵기
  * `border: 4px solid slategray;`
* padding: 위 오른쪽 아래 왼쪽 패딩
  * `padding: 10px 10px 10px 40px`
* margin: 위 오른쪽 아래 왼쪽 마진 (두 개일 경우: 위아래 오른쪽왼쪽)
  * element간의 간격
  * margin-bottom : 아래 쪽 마진
  * `margin-bottom: 30px;`



### margin의 특성

**inline element는 양 옆만 마진이 붙는다**(패딩은 상하좌우 전부)



**인접한 두 개의 block element가 서로 다른 margin을 가진다면?**

* 큰 값을 가진 마진이 적용



**인접한 두 개의 inline element가 서로 다른 margin을 가진다면?**

* 두 마진의 합을 적용






## Position 속성을 이용한 Layout

```css
div {
    position: (value);
    (details);
}
```

top, right, left, bottom을 통해 세부적으로 조정할 수 있다.



### value 값

* static: 디폴트 값

  * 해당 스타일의 위치값(top, right, bottom, left)을 무시한다
  * static 스타일 엘리먼트는 상위의 위치값을 누적해서 적용받음

* relative: 상대적인 위치를 정할 때 사용

  * 상위 relative position을 누적해서 적용받음

  * ```css
    div {
        position: relative;
        top: 40px; /*위에서 40px 떨어짐*/
        left: 40px; /*왼쪽에서 부터 40px 떨어짐*/
    }
    ```

* absolute: 절대적인 위치

  * 상위 태그들을 확인하여 position이 static이 아닌 객체를 기준으로 위치를 잡음
  * top, left를 0px로 초기화 하는게 좋다
  * 절대적인 위치가 입력된 객체는 다른 객체들이 **무시한다**. 따라서 객체들이 겹쳐짐

* fixed: absolute와 비슷하지만 스크롤이 생길 때 움직이지 않음

  * 위치값이 없으면 상위 태그들의 누적된 위치를 적용받는다
  * 위치값을 설정하면 **오버라이딩**되어 이전의 위치값들을 전부 무시하고 적용된다
  * 다른 속성과는 다르게 뷰 포트에 갭을 남기지 않기 때문에 0px이 딱 달라 붙는다







## Float기반 레이아웃

* float속성을 가진 객체는 붕 뜨게 된다
  * float속성을 가지지 않은 다른 엘리먼트와 겹쳐진다
  * 하지만, 다른 엘리먼트의 문자는 겹쳐지지가 않는다
* `left: 10px`처럼 위치를 지정할 수 없기 때문에 **margin으로 컨트롤 해야된다**
* float 엘리먼트 끼리는 겹쳐지지 않는다



### float에서 발생하는 오류 해결

자식 태그가 float속성을 가질 때, 상위 태그가 자식 태그를 자신의 레이아웃 밖 범위로 내친다. 

* `overflow: auto` 나 `overflow: hidden` 속성을 상위 태그에 추가한다.



float속성 때문에 다른 엘리먼트들이 겹쳐진다

* 겹쳐지는 엘리먼트의 스타일 속성에 `clear`를 사용
* float속성 값에 따라 `clear`의 값을 설정하면 된다
  * `clear: left`
  * both를 이용하면 다양한 값을 커버 가능하다





## 클래스와 네이밍

* BEM(block element modifier): html 태그와 클래스 네이밍 방법론 중 하나

http://getbem.com/introduction/



* html5의 data attribute를 활용한 네이밍 방법

http://blog.saltfactory.net/using-html5-custom-data-attributes/





## FLEX기반 레이아웃

https://css-tricks.com/snippets/css/a-guide-to-flexbox/





## 엘리먼트 배치

엘리먼트 배치하는 과정 : layout작업, rendering 과정

중요한 속성

* display(block, inline, inline-block)
* position
* float(left, right)



### display

배치 설정, block, inline, inline-block 값을 가짐

* `display: block` : 블록 형태로 위에서 아래로 쌓임

  * ```css
    span {
        display: block; // span태그임에도 블록으로 쌓임
    }
    ```

* `display: inline` : 옆으로 inline으로 배치됨

  * ```css
    div {
        display: inline; // div태그임에도 옆으로 배치됨
    }
    ```

* `display: inline-block` : inline와 비슷하지만 넓이값, 위아래 마진을 설정할 수 있다

  * ```css
    span {
        display: inline-block;
        witdh: 50px;
        height: 50px;
        padding: 15px;
    }
    ```

* `display: none` : 표시하지 않음

### position

display보다 더 디테일한 배치 설정, 위에 참고



### float

위 참고



### box-model

하나의 엘리먼트는 박스 모델임

box shadow라는 건 무엇일까?



### 엘리먼트의 크기

자식은 부모의 크기만큼을 가진다



### box-sizing과 padding

box-sizing속성을 이용해 border라인을 고정시킨 상태로 패딩을 줄 수 있다

* `box-sizing: content-box` : 디폴트값, 패딩이 커지면 border-box도 커진다
* `box-sizing: border-box` : 패딩이 커지면 border-box 크기는 그대로고 content box가 줄어든다



### 그래서, 레이아웃 구현 방법은?

* float를 잘 이용해서 2단, 3단 컬럼배치를 구현
* 최근에 나온 css-grid나 flex속성 등을 잘 이용하자: 호환성 주의
* 특별한 위치는 absolute를 사용, 기준점을 relative
* 네비게이션의 엘리먼트는 block을 inline-block으로 변경해서 가로로 배치
* 엘리먼트 안의 텍스트의 간격과, 다른 엘리먼트간의 간격은 패딩과 마진을 이용






## CSS가 궁금하다

**자손선택자(descendant selector)와 자식선택자(child selector)**

자손선택자

* 공백을 이용: `div p`
* 해당되는 자손을 모두 일컫는다: div에 속하는 모든 p태그

자식선택자

* 부등호를 이용: `div > p`
* 직계 자식만 일컫는다: div의 바로 밑 p태그만



### align

`text-align: value`

하위에 속한 **text**와 **inline엘리먼트**의 수평 정렬을 맞춤

기준이 되는 **block엘리먼트**에 사용된다.

* center
* left
* right
* justify: 양쪽 정렬



`vertical-align`





`margin: auto`

**block 엘리먼트**의 수평 정렬을 가운데로 맞춤



`padding, text-align 혼합`

패딩과 text-align을 합쳐서 수평, 수직정렬을 맞출 수 있다.

단점: 콘텐츠가 늘어가면 전체 block크기도 변화



`line-height`



### pseudo-selectors

> pseudo: 가짜의

엘리먼트의 일부분이나 특정 문맥(상황)에서 엘리먼트를 선택하는 셀렉터. `:`와 `::`를 이용한다



**pseudo-classes**

특정 상황에서 엘리먼트를 선택. `:`와 함께 쓰인다

```css
p:hover {
    color: red;
}
```



**pseudo-elements**

엘리먼트의 일부분을 선택. `::`와 함께 쓰인다

```css
a::after {
    content: "<-good";
}
```

