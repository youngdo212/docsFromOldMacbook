# DOM & Event

## DOM

HTML element들은 노드로서 트리형태로 저장되는데 그것을 DOM(document object model) tree라고 한다.

DOM tree를 찾고 쉽게 조작할 수 있도록 다양한 메소드, 프로퍼티들이 제공된다(DOM api)



### DOM Element Object의 특징

DOM에 저장되는 노드 종류는 다음과 같다

* element node
* text node
* attribute node
* comment node



HTML의 요소들은 DOM에 저장될 때 element object형태로 저장되며 element node라고 부른다.

element node는 하위에 다음과 같은 노드를 가진다

* text node
* attribute node
* element node(자식 요소가 있을 경우)



text와 attibute노드는 element object의 property로 접근이 가능하다

```javascript
/* html문서
<a id="myAnchor" href="www.naver.com">this is naver</a>
*/
document.getElementById("myAnchor").text
// this is naver
document.getElementById("myAnchor").href = "www.google.com";
```





### document.getElementById(id)

id로 element에 접근하는 메소드

* getElementsByTagName(대문자 태그): 해당되는 태그이름의 요소들을 collection으로 리턴
* 찾아보면 다양한 get...메소드 존재



### element 메소드와 document 메소드

document.으로 사용할 수 있는 APIs : 

<https://www.w3schools.com/jsref/dom_obj_document.asp>

element. 으로 사용할 수 있는 APIs : <https://www.w3schools.com/jsref/dom_obj_all.asp>



### querySelector()

```
element.querySelector(CSS selector);
document.querySelector(CSS selector);
```

```javascript
let x = document.getElementById("myDiv");
x.querySelector(".example").innerHTML = "hello";
```

css의 selector문법으로 dom에 접근하는 방법

CSS selector에 매칭되는 **첫 번째** child element를 리턴한다.

메소드 체이닝으로 질의를 할 수 있게 해 줌



### querySelectorAll()

```css
element.querySelectorAll(CSS selectors)
```

```javascript
let x = document.getElementById("myDIV").querySelectorAll(".example");
x[0].style.backgroundColor = "red";
```

CSS selector에 매칭되는 child element들의 집단을 static Nodelist Object로 리턴한다.

노드들은 인덱스로 접근이 가능하다

length프로퍼티를 사용할 수 있음



### DOM 탐색 APIs

* tagName: 해당 엘리먼트의 태그를 **대문자**로 리턴

* textContent: 해당 노드와 **모든 자손 노드**의 text content를 수정하거나 리턴한다.

  * 해당 노드가 element 노드일 경우 하위 text 노드의 text content를 가져온다
  * text content를 수정할 경우 모든 자손 노드는 삭제되고 하나의 single text 노드로 대체된다
  * innerText 속성과 비슷하지만 다소 다르다

* nodeType: 노드의 타입을 **숫자로** 리턴

  * 1: element 노드인 경우
  * 2: attribute 노드인 경우
  * 3: text 노드인 경우
  * 8: comment 노드인 경우 `<!—comment—>`
  * **element의 속성과 텍스트 모두 노드로 저장되어 있구나**

* childNodes: 엘리먼트의 모든 child node의 집합을 리턴

  * ```html
    <body>				// text노드(줄바꿈)
        <!--comment-->  // comment노드, text노드(줄바꿈)
        <p></p>			// element노드, text노드(줄바꿈)
    </body>
    ```

  * whitespace(carriage return포함)가 있어야 text 노드로 인식

  * 소스코드에 쓰여진 순서대로 저장되어 있다

  * 인덱스로 접근

* firstChild: element.childeNodes[0]와 같다

* children: 엘리먼트의 모든 자식 **element노드** 집합을 리턴

* firstElementChild: element.children[0]와 같다

* parentElement: 부모 엘리먼트를 리턴

  * parentNode와 다른점: 부모 노드가 element가 아닐 경우 null을 리턴

* nextElementSibling: 형제 엘리먼트를 리턴

  * nextSibling: 형제 **노드**를 리턴



### DOM 조작 APIs

엘리먼트가 아닌, **노드**를 조작한다는 점을 잊지 말자. 



* element.removeChild(childelement): 해당 자식 노드를 삭제

  * ```javascript
    const list = document.getElementById("div");
    list.removeChild(list.children[0]);
    ```


* appendChild(): 자식 노드를 마지막에 삽입

  * 노드 이동시키기: append만 사용해서 이동시킬 수 있다.

  * ```javascript
    let node = document.getElementById("myList2").lastChild;
    document.getElementById("myList1").appendChild(node);
    ```

* insertBefore(삽입할 노드, 기존 노드): 노드를 해당노드 앞에 삽입

  * ```javascript
    let node = document.getElementById("myList2").lastChild;
    let list = document.getElementById("myList1");
    list.insertBefore(node, list.childNodes[0]);
    ```

* element.cloneNode(deep): 복사된 노드를 리턴

  * deep: boolean, 모든 자손 노드를 clone할 지 선택(디폴트는 false) 

  * append나 insert할 때 자동으로 node가 이동하는 것을 방지하기 위해 사용할 수 있다.

  * ```javascript
    var itm = document.getElementById("myList2").lastChild;

    var cln = itm.cloneNode(true);


    document.getElementById("myList1").appendChild(cln);
    ```

* replaceChild(새로운 노드, 기존 노드): 노드를 대체함

* closest(): 

* document.createElement(name): element 노드를 생성

  * name은 대문자 또는 소문자

  * ```javascript
    let itm = document.createElement("li");
    ```

* document.createTextNode(text): text 노드 생성



### HTML을 문자열로 처리해주는 DOM API

* element.innerHTML : 엘리먼트의 내부 HTML을 문자열로 리턴하거나 수정할 수 있게 해준다
* element.innerText: 엘리먼트의 내부 텍스트노드를 변경
* insertAdjacentHTML(position, string) : 특정 포지션에 문자열을 삽입한다
  * afterbegin: element의 시작 후에(element시작태그뒤에)
  * afterend: element종료태그 뒤에
  * beforebegin: element 시작 태그 전에
  * beforeend: element 종료 태그 전에



### 실습을 해보니

element탐색은 어떻게 할까?

* querySelector메소드는 element, document 둘 다 지원한다. querySelector를 쓰는게 좋을 듯?


* document.getElementsByTagName()



childNodes보다 children이 많이 쓰일 것 같다



querySelectAll처럼 노드 리스트를 가져오는 api는 배열을 가져오진 않는다. 따라서 forEach등 array 메소드를 사용하려면 `Array.from(list)`을 이용하자!



## Event

자바스크립트를 통해 HTML의 element별로 이벤트를 등록 할 수 있다

> 이벤트: 화면 조정, 클릭, 스크롤 등의 브라우저 상에서 일어나는 특수한 상황



### 이벤트 등록

이벤트 등록 표준 방법

```javascript
let el = document.getElementById("outside");
el.addEventListener("click", function(){
    ... // 이벤트가 발생했을 시 내용
}, false);
```

* 위의 콜백함수를 이벤트핸들러(이벤트리스너)라고 한다.
* 이벤트핸들러는 event queue라는 메모리 공간에 보관, 이벤트가 발생할 때 실행된다.



```
.addEventListener(event, function, useCapture)
```

* event: 이벤트를 말한다. 이벤트 레퍼런스는 다음을 참조
  * https://www.w3schools.com/jsref/dom_obj_event.asp
  * https://developer.mozilla.org/en-US/docs/Web/Events
* function: 이벤트 발생 시 실행할 함수.
* useCapture: 이벤트가 capturing phase에서 실행될 지 bubbling phase에서 실행될 지 정하는 불리언 값
  * true: capturing phase
  * false: 디폴트, bubbling phase
  * capturing phase: 이벤트가 타겟팅 되면 document부터 타겟팅 된 이벤트까지 타고 들어가는 단계
  * bubbling phase: 타겟팅 된 이벤트부터 바깥 요소까지 버블링 되면서 이벤트가 발생하는 단계



### 이벤트에 관한 추가적인 학습

```javascript
window.addEventListner("resize", fn);
element.addEventListner("keydown", fn(){
  ...
});
```

```javascript
element.onkeydown = function(){
    ...
}
```

위의 방법(옛날 방법)은 하나의 함수만 실행시킬 수 있다.



#### 이벤트 객체

이벤트 객체는 다양한 프로퍼티를 가짐

다음과 같이 콜백함수의 인자에 이벤트 객체를 넣어줌으로서 이벤트 객체를 사용 할 수 있다.

```javascript
let el = document.querySelector(".eventArea");
el.addEventListener("click", function(evt){
    let layer = evt.target.nextElementSibling;
    layer.style.display = block;
})
```



더 자세히 알고 싶다면

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events