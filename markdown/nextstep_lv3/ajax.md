# Ajax

> **A**synchronous **J**avaScript **A**nd **X**ML

XHR을 통한 응답데이터는 문자열이다

* JSON.parse()를 통해 타입을 바꿔줘야 할 필요가 있다



CORS

JSONP(비표준 방법이지만 많이 사용)



다른 도메인과의 통신을 위해 CORS도 괜찮지만 JSONP도 많이 이용한다



history API > 좋은 UX

XHR 과 fetch패턴



## JSONP

비동기일까?

좀 나중에



# HTML templating

#### html 문자열을 보관하는 방법

1. 서버에서 file을 보관하고 ajax를 통해 불러온다
2. html에 숨겨둔다

#### html에 숨겨두는 방법

script태그의 type속성이 javascript가 아니면 렌더링하지 않음

```html
<script id="template-list-item" type="text/template">
  <li>
      <h4>{title}</h4><p>{content}</p><div>{price}</div>
  </li>
</script>
```

```javascript
var html = document.querySelector("template-list-item");
```

그 후에 replace사용

#### template literal

es6

#### tagged template literal

태그(함수)를 이용해 template literal를 사용한다

```javascript
// @param {Array} string - 표현식으로 나눠진 문자열의 배열
function fn(string, expression1){
	...
}
let s = fn`hello, ${name}! wordl`;
```



# Web Animation

세밀한 표현: js

성능: css(transition, transform)

FPS(1초당 프레임): 보통 60fps

## js 애니메이션

### 1. setInterval

잘 구현하지 않음

### 2. setTimeout

### 3. requestAnimationFrame

### 4. GPU 가속을 이용하는 속성으로 가속

## CSS; transition, transform

### transition: 

변경된 스타일의 변경 시간을 설정하는 속성

```javascript
let tar = document.querySelector('box');
tar.addEventListener('click', (e) => {
    e.target.style.widgh = 500px;
    e.target.style.heiht = 500px;
})
```

```css
box {
    ...
    transition: width 2s, height 2s
}
```

* 2초동안 스타일이 바뀜(start > end)
* 참고 : https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions


### transform

```css
.box {
    transform: translateX(100px);
    transform: rotate(10deg);
    transform: translate3d(0,0,0);
    ...
}
```

* tanslate를 이용하면 position속성보다 빠르게 연산함
* translate3d가 더 빠르다고 함

