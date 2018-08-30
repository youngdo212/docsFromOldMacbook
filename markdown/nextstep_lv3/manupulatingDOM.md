# DOM조작의 다양한 방법들 

## AJAX

> AJAX : Asychronous Javascript And Xml

웹 페이지의 아주 일부분의 변경이 일어날 때 전체 페이지를 로드하면 얼마나 불편할까? 구글의 검색어 자동완성 기능이 예가 될 수 있다. 전체 페이지를 로드할 필요 없이 필요한 부분만 서버로 부터 제공받는 기술을 AJAX라고 한다.

* single page application: ajax를 이용해 한 웹페이지만으로 작성된 페이지

https://www.w3schools.com/xml/ajax_intro.asp





## JQuery

> jQuery: DOM과 HTML, CSS 등의 조작을 위한 javascript 라이브러리

자바스크립트를 웹 상에서 더 쉽게 사용할 수 있도록 만들어졌다.

jQuery는 싱글 자바스크립트 파일이므로 HTML에 head태그에서 스크립트 태그를 이용해서 불러와야 한다.

CDN을 이용한 방법이 많이 사용되고 있다. 이미 많은 클라이언트가 google이나 microsoft로 부터 jQuery를 다운받은 상태이기 때문에 캐시를 통해서 jQuery를 다운받을 것이다. 내가 직접 jQuery의 호스팅하는것 보다 이게 빠르기 때문에 이 방법을 사용한다.

* CDN(content Delivery Network): 콘텐츠의 오리진 서버에 직접 요청을 하는 대신 물리적으로 가까운 네트워크에 컨텐츠를 요청하는 방법. 오리진 서버의 트래픽 부하를 막고 속도를 빠르게 할 수 있는 장점이 있다.

```html
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
```



### 문법

`$(selector).action()`

* selector: css selector 문법을 이용해 HTML element를 찾거나 질의한다
* action: 해당 element에 요청할 행동(메소드)



```javascript
$(document).ready(function(){
    ...
})
```

* 이렇게 사용해야만 문서가 전부 로딩되기 전에 JQuery가 실행되는 것을 막아준다



https://www.w3schools.com/jquery/jquery_events.asp






## DOM APIs

DOM이 제공하는 기본 API를 이용하는 방법

옛날에는 Vanilla JS를 이용해 DOM을 조작하는 일이 JQuery보다 복잡했다. 하지만 `querySelector()` 과 같은 편리한 메소드가 등장함에 따라 바닐라 js로도 충분히 간편하게 DOM을 조작할 수 있게 됐다고 한다.

https://www.academind.com/learn/javascript/jquery-future-angular-react-vue/#what-changed






## REACT

트리 형태인 DOM에서 원하는 노드를 빠르게 찾는 것은 쉬운 일이 아니다. react는 virtual DOM이라는 개념을 대중화 시켰다. 

> virtual DOM: react의 로컬에 존재하는 HTML DOM의 추상화된 버전이다.

DOM의 변화가 일어나는 모든 일은 일단 virtual DOM에서 이뤄진다. 그 다음 변화된 부분을 확인하고(=diffing) 변화된 부분만 HTML DOM에서 변경된다(=reconciliation). 

