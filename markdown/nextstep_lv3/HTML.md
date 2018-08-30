# HTML

기본형태

```javascript
html
	head
    body
```



`<a href=“www.naver.com”>네이버로 갑니다</a>`

- a: 태그
- href: 속성(attribute)
- “www.naver.com”: 값




## Attribute

HTML 태그에서 사용자 attribute를 만들 수 있다.

```html
<p class="myElem" myAtt="mando">
    hello, world
</p>
```

```javascript
const itm = document.querySelector(".myElem");
console.log(itm.getAttribute("myAtt")); // "mando"
```



data Attribute라는 것도 존재한다. 

data-*문법을 사용해 attribute를 생성하면 dataset이라는 프로퍼티로 접근 가능하다(ie11이상만 지원)

```html
<p data-my-index='1000'>
    hello, mando!
</p>
```

```javascript
const itm = document.querySelector("p");
console.log(itm.dataset.myIndex); // '1000'
// my-index가 myIndex로 바뀜을 주의
```



css에서는 attribute selector를 이용해 속성값에 접근할 수 있다





## head 태그

메타데이터를 가지고 있는 태그

* 메타데이터: 데이터를 위한 데이터



### 기본 메타 태그 종류

`<meta charset="utf-8">`

웹사이트의 문자 인코딩을 명시하는 태그



`<title>Page Title</title>`

페이지의 타이틀을 정의하는 태그. 검색엔진에서 표시되는 **검색결과의 타이틀**로 나타나기 때문에 너무 길어서는 안된다.



`<meta name="description" content="Page description">`

현재 페이지를 설명하는 text snippet. 검색엔진에서 **웹페이지의 설명문(description)**으로 나타난다.



`<meta name="viewport" content="width=device-width, initial-scale=1">`

뷰포트가 모바일에서 어떻게 조정될 지 나타내는 메타 데이터. 일반적으로 위 처럼 쓰임



`<base href="//cdn.example.com/">`

css, js 등 외부 파일을 참조할 때 기본이 되는 디폴트 url을 나타냄. 

엄청 유용한 메타 태그는 아니지만, 이미지 태그를 예를 들자면, img태그의 src속성의 url길이를 줄여주고, 도메인이 변경됐을 때 수정해야 될 일을 줄여준다.



`<meta name="application-name" content="Application Name">`

어플리케이션 이름을 명시하므로서 웹페이지가 웹앱처럼 사용될 수 있도록 함.



### 추천 메타 태그

`<meta name="referrer" content="unsafe-url">`

referrer태그의 content속성에 따라 내 웹페이지가 referrer 데이터를 보낼지 말지를 결정한다. content속성이 unsafe-url이면 full referrer URL을 보낸다

* referrer data: 사용자가 하이퍼링크를 통해 어떤 웹페이지에 접속 시, 서버는 보안을 위해 사용자가 어느 페이지에서 접속했는지 referrer date를 통해 확인한다.
* referrer data에 대해 더 알고싶다면 https://blog.wsol.com/seo-for-https-sites-should-you-implement-the-meta-referrer-tag, https://en.wikipedia.org/wiki/HTTP_referer



`<link rel="stylesheet" href="https://example.com/styles.css">`

external css 스타일을 불러오는 태그



**참고 자료**

https://sympli.io/blog/2017/07/13/which-meta-tags-should-you-be-using-in-2017/




## HTML 태그 종류

`<div>` : division 더미 영역을 표현할 때 사용

`<ul>` : unordered list 순서없는 리스트

`<li>` : list item 리스트의 한 아이템

```html
<html>
    <head>
        
    </head>
    <body>
        <div>
            <h1>반갑습니다</h1>
            과일 리스트입니다
            <ul>
                <li>바나나</li>
                <li>사과</li>
            </ul>
        </div>
    </body>
</html>
```



## 레이아웃을 위한 태그

* header: 상단 영역
* section
* nav: navigation
* footer: 하단 영역
* aside

```html
<body>
    <header>header</header>
    <div id="container">
        <nav><ul>
            <li>home</li>
            <li>news</li>
            <li>sports</li>
        </ul></nav>
        <aside><ul>
            <li>로그아웃</li>
            <li>오늘의 날씨</li>
            <li>운세</li>
        </ul></aside>
    </div>
</body>
```

html layout tag 이미지 검색해보기



## HTML 구조화 설계

html structure design

```html
<html>
    <head>
        <title>JS Bin</title>
    </head>
    <body>
        <header>
            <h1>Company Name</h1>
            <img src="..." alt="logo">
        </header>
        
        <section>
            <nav><ul>
                <li>Home</li>
                <li>About</li>
                <li>Map</li>
            </ul></nav>
            
            <section>
                <botton></botton>
                <div><img src="" alt=""></div>
                <div><img src="" alt=""></div>
                <div><img src="" alt=""></div>
                <botton></botton>
            </section>
            
            <section>
                <ul>
                    <li>AboutUs</li>
                    <li>
                        <h3>what we do</h3>
                        <div>
                            Lorem Ipsum dolor ...
                        </div>
                    </li>
                    <li>AboutUs</li>
                </ul>
            </section>
        </section>
        
        <footer><span>Copyright @codesquad</span></footer>
    </body>
</html>
```



## ID와 class

* class : 요소들이 동일하게 적용될 스타일에 사용될 이름

  * element의 class속성값에 여러 클래스를 사용할 수 있다(중첩되는 경우 **css상에서** 나중에 선언된 스타일속성이 적용)

  * ```html
    <a href="url" class="color border text"></a>
    ```

* id: 요소의 고유한 이름

`<footer>` 대신  `<div id="footer">`를 쓴 이유: 브라우저 호환성 때문에 후자를 사용하는 경우가 있다. footer는 고유할 수 밖에 없기 때문에 id로 생성했다고 볼 수 있다.



## 디버깅(크롬 개발자도구의 element 탭)

inline style의 우선순위가 더 높다

`<div class="myStyle" style="color: red">…</div>`

* myStyle보다 style을 먼저 적용
* 디버깅의 우측 style탭의 element.style에서 바로 변경 가능





## 끄적끄적

```Html
// html
<span id="changeColor">I'm gonna change!</span>

// css
#changeColor{
	color: red;
}
```



## 태그

**이미지 태그: <img>**

`<img src="url" alt="">`

두 가지 속성을 가진다

* src: 이미지의 url 명시
* alt: 이미지를 대체하는 텍스트

`</img>`로 마무리 안해도 된다.



**a 태그: <a>**

`<a href="url"></a>`

한 페이지에서 다른 페이지로 가는 하이퍼링크(anchor)

* href(hypertext referenct): 링크가 이동하는 페이지의 url
* target: 링크된 문서가 어디에 열릴 지 결정
  * _blank: 새 탭
  * _top: 현재 탭



**이미지에 하이퍼링크를 다는 법**

```html
<a href="www.naver.com">
    <img src="url" alt="go to naver">
</a>
```



**h1~6 태그: <h1>**

`<h1>hello, world</h1>`

html heading을 정의하기 위한 태그

6으로 갈 수록 폰트가 작아짐



**div 태그: <div>**

block-level element이며 html element의 container로서 사용된다

container그 이상의 의미는 없다. 주로 다른 element와 구분짓거나 캡슐화를 하기위해 쓰인다.



**span 태그: <span>**

inline element이며 html text의 container로서 사용된다

아무 의미 없는 container로서의 태그지만 주로 id나 class를 이용해 스타일링을 하기 위해 사용된다



**p태그: <p>**

paragraph을 정의하는 태그

브라우저는 자동으로 p태그 앞 뒤에 마진을 붙인다. 마진은 css로 수정 가능.



**link 태그: <link>**

head태그 안에 쓰인다

`<link rel="stylesheet" href="css_basic.css">`

* rel(relationship) : 현재 문서와 링크된 문서의 관계를 나타냄. value가 정해져 있음
  * stylesheet: style sheet를 임포트
  * alternate
  * icon 등...
* href: url





**header 태그**



**section 태그**



**nav 태그**



**footer 태그**



**description list 태그:** <dl> <dt> <dd>

용어와 용어의 설명이 존재하는 리스트

* `<dt>` : 용어(이름)을 정의한다
* `<dd>` : 용어를 설명한다

```html
<dl>
    <dt>coffer</dt>
    <dd>- black hot drink</dd>
    <dt>milk</dt>
    <dd>- white cold drink</dd>
</dl>
```



**tamplet 태그:** <tampley>

렌더링 과정에서 화면에 표시되지 않지만 동적으로(자바스크립트 등) 꺼내 쓸 수 있는 엘러먼트

```html
<body>
    <template>
        <p>hello, wolrd</p>
        <button>click</button>
        <div>
            <span>hi</span>
        </div>
    </template>
</body>
```

```javascript
// cloneNode 이용
var temp = document.getElementTagName(“template”)[0]
var clon = temp.content.cloneNode(true);
document.body.appendChild(clon)

// importNode 이용
var clon = document.importNode(temp.content, true);
document.body.appendChild(clon)
```

* temp.content는 하나의 노드다(body처럼 하위 노드를 모두 달고 있음)
* temp.content를 사용하자! temp를 그냥 사용하면 안된다



## HTML이 궁금하다

**block-level element와 inline element**

- inline element: 
  - line break를 하지 않는다
  - 페이지 전체의 폭을 차지하지 않는다: line element의 태그의 시작과 끝 공간만 차지한다
  - `<a>` `<em>` `<img>` `<span>`
- block-level element:
  - line break를 한다: 새로운 라인에서 시작된다
  - 페이지 전체의 폭을 차지한다
  - 한 라인 또는 여러 라인을 차지한다
  - `<h1>` `<ul>` `<li>` `<div>`



**HTML에서 head는 무슨 역할을 할까?**



**id와 class는 무엇일까?**

css에서 ...

* id는 앞에 #
* class는 앞에 .

여러 element가 같은 스타일을 공유할 때 class를 사용한다. 한 페이지에서 class를 여러번 사용 할 수 있다.

유일한 element의 스타일은 id. 한 페이지에서 id는 유일해야 한다



`class는 item의 타입, id는 item의 유니크한 이름`



**semantic 태그란?**

>  semantic: 의미의, 의미론적인

의미를 나타내는 태그들을 semantic 태그라고 한다. 시맨틱 태그들은 태그가 갖는 의미를 브라우저와 개발자에게 명확하게 전달할 수 있어야 한다.

* `<header>` `<nav>` `<section>` `<form>` **`<h1>`**등

non-semantic 태그

* `<div>` `<span>`




**html templating**

template literal을 이용해서 미리 작성된 html코드를 템플릿으로 활용할 수 있다

참고 : <https://benfrain.com/html-templating-with-vanilla-javascript-es2015-template-literals/>



**html entities**

`<`와 같이 html이 사용하고 있는 예약어를 사용하고 싶을 때 character entity를 사용한다.

`<`는 `&lt;` 또는 `&#60`으로 나타낸다

대표적으로 non-breaking space인 `&nbsp;`가 있다

`nbsp;`를 사용하면

* white-space는 자동으로 line-break가 되지만 nbsp는 되지 않는다
* 또한 여러번의 띄어쓰기를 표현할 수 있다.