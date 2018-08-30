## capturing phase, bubbling phase

DOM event는 이벤트 증식의 3단계를 거친다

* capturing phase: 이벤트가 가장 상위의 노드부터 아래로 내려가는 단계
* target phase: 이벤트가 가장 하단의 노드(target)에 도달하는 단계. event.target이 정해짐
* bubbling phase: target노드부터 상위로 향하면서 각 노드의 핸들러를 호출하는 단계

https://javascript.info/bubbling-and-capturing#capturing



## Event delegation

> delegation: 위임



다음과 같은 경우가 있다

```html
<ul id="list">
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
</ul>
```

모든 `li`태그에 특정한 이벤트 핸들러를 넣는다면 너무 번거롭다. 이럴 땐 이벤트를 상위 태그에 위임할 수도 있다. 하지만 상위 태그에서 어떤 노드에서 이벤트가 발생했는지 어떻게 알 수 있을까? 이럴때 이벤트 객체를 이용한다. 

```javascript
let list = document.getElementById("list");
list.addEventListener("click", function(evt){
    evt.target.style.color = "red";
})
```

이벤트 객체는 capturing phase를 거치면서 이벤트가 발생한 가장 하위의 노드를 target프로퍼티로 지정한다.  이제 이벤트는 bubbling phase에서 각 노드의 이벤트 핸들러를 호출하는데, 이 이벤트의 target속성은 이미 정해져 있으므로 어떤 핸들러를 호출하던지 관계없이 항상 target값은 일정하다.

이렇게 이벤트 객체를 이용해 event delegation을 실행할 수 있다.