# Modules

프로그램(코드)들이 꽉 뒤엉켜 있으면

* 한 번에 읽기가 어렵다
* 기능 수정을 할 때 차라리 다시 쓰는게 편하다

이런 코드들을 big ball of mud라고 함(공을 집어올렸을 때 공이 산산조각나면서 손이 더러워진다는 뜻)



## modules

이런 상황을 방지하는게 모듈.

모듈을 프로그램의 조각인데, 어떤 모듈에 의존하고, 어떤 기능을 다른 모듈에게 제공하는지를 나타낸다(interface)

사용하고 있는 모듈들의 집합을 *dependencies*이라고 함.

한 모듈이 다른 모듈의 코드 조각을 필요로 할 때 의존한다고 함

모듈이 제대로 작동하려면 자신만의 스코프를 가져야하는데, js파일로 구분한다고해서 실현되는 것이 아님. 나중에 배울 예정



## packages

하나 이상의 모듈로 이루어진 코드의 집합. 패키지를 통해 각 기 다른 프로그램이 원하는 기능을 제공받을 수 있다.

이 패키지를 관리하는 프로그램이 npm. npm의 대표적인 두 가지 기능

* 패키지를 다운로드(업로드) 할 수 있는 서비스
* 패키지를 관리하고 설치할 수 있도록 도와주는 프로그램



## improvised modules

2015년까지 자바스크립트는 빌트인 모듈 시스템이 없었다. 그래서 다른 방식을 사용했는데...

```javascript
const weekDay = function(){
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    name(number) { return names[number]; },
    number(name) { return names.indexOf(name); }
  }
}();
```

즉시 실행으로 자체적으로 local scope를 가지면서(names가 여기 속함) 인터페이스를 제공한다: weekDay.name, weekDay.number





## evaluating data as code

문자열을 받아 프로그램의 일부로 실행시키는 eval함수. eval함수는 문자열을 **현재** 스코프에서 실행시킨다. 현재 스코프의 변수에 영향을 끼칠 수 있기 때문에 좋지 않다.



좀 더 안전한 방법으로는 Function생성자가 있다.

`Function("n", "return n + 1")`

Function 생성자를 통해 실행되는 문자열은 자체 스코프를 가지기 때문에 현재 스코프가 오염될 걱정은 안해도 된다. 

이것이 바로 우리가 모듈 시스템에서 원했던 것이다. 모듈은 자체적인 스코프를 가져야 한다고 했다. 모듈 코드를 함수안에 감싸면 함수의 스코프를 모듈의 스코프처럼 쓸 수 있겠다



## commonJS

자바스크립트 모듈에 가장 폭넓게 사용되는 접근법은 commonJS modules이다. nodejs도 이 방법을 사용하며, npm에서 대부분의 패키지들이 사용하는 방법이기도 하다.

commonJS module의 중심 개념은 `require`라고 하는 함수. `require`함수를 의존하는 모듈 이름으로 호출하면, 모듈이 로드되고 모듈의 인터페이스를 반환한다.

모듈을 `require`함수 안에 감싸기 때문에 앞서 봤던 Funtion생성자 처럼 모듈은 자체적인 스코프를 갖는다.

리턴된 인터페이스를 `exports`라는 객체에 바인드된 변수에 넣어주기만 하면 된다.



```javascript
// format-date.js
const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
};
```

```javascript
// main.js
const {formatDate} = require("./format-date");

console.log(formatDate(new Date(2017, 9, 13),
                       "dddd the Do"));
// → Friday the 13th
```

- ordinal은 입력받은 date를 1st, 2nd 형태로 변환해 주는 모듈
- date-names는 요일과 달을 영어로 변환해 주는 모듈



다음과 같이 간단하게 require함수를 만들어 볼 수도 있다

```javascript
require.cache = Object.create(null);

function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let module = {exports: {}};
    require.cache[name] = module;
    let wrapper = Function("require, exports, module", code);
    wrapper(require, module.exports, module);
  }
  return require.cache[name].exports;
}
```

* nodejs나 브라우저마다 파일을 로드해주는 고유한 함수가 존재한다. 지금은 임시로 `readFile`함수를 사용했다
* 놀라운 점은 Function생성자로 생성한 wrapper 함수(객체)를 실행하는 부분
  * `wrapper(require, module.exports, module)`
  * 만들어진 `require`와 `exports`, `module`을 파라미터로 넘겨 `code`에서 해당 변수들을 사용할 수 있게끔 만들어줌: 만약 code에서 require를 사용하고 있다면 넘겨받은 require를 사용하게 된다.
  * 또한, `wrapper`가 실행되면서 `code`가 실행되고 code에서 exports를 사용하고 있다면 그건 객체 참조에 의해 처음 정의된 module의 프로퍼티를 의미하므로, 자연스럽게 exports의 값이 가장 상단에 위치한 모듈의 module에 들어가게 된다.





## ECMAScript modules

commonjs modules는 npm과 함께 js에서 코드를 공유할 수 있게 해줬다. 하지만 표기법이 이상하다는 문제가 여전히 남아있었다.

* `exports`에 추가한 것을 로컬 스코프에서 이용할 수 없다.
* `require`는 문자열 뿐만아니라 어떤 종류의 인자도 받을 수 있는 일반 함수이기 때문에 종속성(dependency)를 알아내기가 힘들다(?)



그래서 JS는 2015년에 ES modules라 불리는 자체 모듈 시스템을 공개했다

```javascript
import ordinal from "ordinal"; // default를 불러옴
import {days, months} from "date-names";

export function formatDate(date,format){};
```

* commom js 모듈에서는 변수에 모듈을 값으로 할당하는 개념이기 때문에 변수에 바인딩 된 값이 바뀔 우려를 해야된다. 하지만 ES module에서는 이미 이름 지어진 **바인딩**을 임포트 한다. **임포트 된 바인딩은 동일한 이름으로 재정의될 수 없다**
* ES module의 import는 모듈이 실행되기 전에 일어난다. 이건 import 선언이 함수나 블록에 나타날 수 없음을 의미한다.(?)
* 또한 require와는 다르게 종속성의 이름이 무조건 문자열이어야 된다.



ES module을 자바스크립트 커뮤니티에서 받아들이고 있지만 과정이 천천히 이뤄지고 있다. ES 모듈이 만들어 지고나서 브라우저나 nodejs에서 지원하기 까지 몇 년이 걸렸다. 또한 아직 이슈들이 존재한다.

그래도 현재 많은 프로젝트들이 ES 모듈로 작성되고 있다. 물론 ES 모듈로 작성된 코드는 상황에 따라서 commonJS로 변환되기도 한다. 따라서 두 모듈 문법을 읽거나 작성하는 방법을 아는것이 중요하다.



### default

```javascript
// test.js
export default [12,3];
// main.js
import a from "test.js";
console.log(a.length);
```

import에 중괄호를 사용하지 않으면 디폴트 바인딩이 자동으로 export된다



### as

```javascript
import {days as dayNames} from "date-names";
console.log(dayNames.length);

import * as module from "test.js";
console.log(module.myFn);
```

`as` 를 사용하면 임포트 된 바인딩의 이름을 재설정할 수 있다

`*` 키워드와 `as` 를 이용해 모듈 자체를 rename된 객체로 불러올 수 있다.



## building and bundling

* buldler: 작은 파일 여러개를 하나의 큰 파일로 묶어주는 도구
* minifier: 코멘트나 whitespace를 제거하고 변수 이름을 바꿔, 기능은 같지만 적은 용량을 차지하는 코드를 만들어 주는 도구

우리가 작성한 코드들이 속도와 같은 이슈들 때문에 bundler나 minifier와 같은 툴을 거쳐 많은 단계를 거쳐 변환된다. 앞서 설명했던 ESM의 commonJS 변환, modern JS의 historic JS변환 등이 이러한 이유 때문이다. 우리가 만든 프로그램이 우리가 작성한 코드를 그대로 가지고 실행되지 않는다는 점을 알아두자.



## module designing

좋은 프로그램 디자인 방법은 주관적이지만, 우리 코드가 많은 사람에기 읽히고 사용되고 싶다면 컨벤션을 따르는게 좋다. 좋은 예로 ini 패키지가 있다. ini 패키지는 parse와 stringify함수를 제공하는데, 표준 json 객체를 모방했기 때문이다.

범용성 있는 함수, 프로그램을 만들고 싶다면 사람들이 많이 사용하는 컨벤션을 최대한 많이 따르도록 하자

* 다익스트라 알고리즘: graph, 도시 사이의 최단거리를 구하는 알고리즘