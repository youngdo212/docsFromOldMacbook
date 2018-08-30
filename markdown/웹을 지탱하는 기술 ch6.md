## ch6. HTTP의 기본

> HTTP는 TCP/IP를 기반으로 한 프로토콜이다



### TCP/IP

> TCP: tansmission control protocol

> IP: internet protocol

tcp와 ip는 인터넷을 구성하는 네트워크 프로토콜이다. 인터넷의 네트워크 프로토콜은 계층구조를 가진다



**네트워크 인터페이스 계층**

가장 아래 계층. 케이블 등 물리적인 계층



**인터넷 계층**

그 위의 계층. 네트워크에서 실제로 데이터가 주고받는 계층이다. IP가 여기에 해당. IP에서 데이터의 기본적인 통신단위를 *패킷*이라고 한다. IP주소를 통해 패킷단위로 데이터를 주고받는다



**트랜스포트(전송) 계층**

그 위의 계층. IP가 하지않는 데이터의 무결성을 보증하는 역할을 함. TCP가 여기에 해당.

TCP는 목적지의 상대에 대해서 커넥션을 연결하고, 이 커넥션을 사용해 데이터 누락, 데이터의 도달을 체크하고 보증한다.

TCP로 만들어진 커넥션을 통해 어느 어플리케이션으로 도달할지 정하는 것이 *포트번호* 이다. (HTTP의 디폴트 포트번호80)



**애플리케이션 계층**

DNS, HTTP를 실현하는 가장 상위 계층.

TCP로 프로그램을 만들 때 *소켓(socket)*이라는 라이브러리를 사용한다. 소켓이란 데이터 교환을 추상화한 API로 접속, 송신, 수신, 절단 등의 기본 기능을 갖춤. HTTP서버와 브라우저는 소켓을 이용하여 구현됐다.



### HTTP의 버전

HTTP 0.9: http의 탄생

HTTP 1.0: 최초의 표준화된 http

HTTP 1.1: http의 완성, 이 책에서 다룰 내용, RFC2616



### HTTP메시지

**요청 메시지**

```
GET /test HTTP/1.1
Host: example.com:8080
```

* 요청 라인
  * `GET` : 메소드
  * `/test` : 요청. 경로 이후의 문자열 혹은 절대 URI. 절대 URI가 들어가는 경우 Host헤더 생략. 포트번호 들어가지 않음
  * `HTTP/1.1` : 프로토콜 버전
* 헤더(메타 데이터)
  * `host: …` : host헤더에 호스트가 들어감
* 바디
  * 리소스를 새로 작성하거나 갱신할 경우에는 바디에도 메시지가 들어간다



**응답 메시지**

```
HTTP/1.1 200 OK
Content-Type: application/xhtml+xml; charset=utf-8

<html xmlns="http://www.w3.org/1999/xhtml">
...
</html>
```

* 스테이터스 라인
  * `HTTP/1.1` : 프로토콜 버전
  * `200` : 스테이터스 코드
  * `OK` : 텍스트 구문
* 헤더
  * Content-type헤더에 MIME 미디어 타입(application/xhtml+xml)과 문자 인코딩 방식(utf-8)을 지정하고 있음
* 바디
  * 이 예제에서는 바디에 html문서가 포함되어 있다



**HTTP 메시지의 구성요소**

1. 스타트라인(요청 라인, 스테이터스 라인)
2. 헤더
3. 빈 줄
4. 바디



### HTTP의 스테이트리스

HTTP는 스테이스리스한 프로토콜로 설계되어 있다. 즉 클라이언트의 상태를 서버가 보관하지 않는다는 뜻이다.

어플리케이션 상태를 세션 상태라고도 한다. 세션이란 시스템에 로그인하고 로그아웃 할 때 까지의 조작을 모은 것을 말한다.

대표적인 스테이트풀한 프로토콜은 FTP(file transfer protocol). 클라이언트가 서버에 접속해서 로그아웃할 때 까지 클라이언트가 어느 디렉토리에 있는지 등을 다 기록하고 있다.



**스테이트풀의 결점**

클라이언트 수가 증가했을 때 규모를 확장하기 어렵다



**스테이트리스의 이점**

클라이언트가 자신에게 필요한 모든 상태를 메시지에 포함시켜 요청한다(자기 기술적 메시지). 따라서 서버 시스템이 단순해 진다. 확장하기도 쉬워진다



**스테이트리스의 결점**

클라이언트가 송신할 데이터가 많아진다.

인증 등 서버에 부하가 걸리는 처리를 반복한다.

통신 에러가 발생할 시 같은 요청을 두 번이상 반복해도 받아들인다.





## ch7. HTTP 메소드

HTTP의 8개 메소드

* **GET**: 리소스 취득
* **POST**: 서브 리소스 작성, 리소스 데이터의 추가, 등
* **PUT**: 리소스 갱신, 리소스 작성
* **DELETE**: 리소스 삭제
* **HEAD**: 리소스의 헤더 취득
* **OPTIONS**: 리소스가 서포트하는 메소드 취득
* TRACE: 자기 앞으로 요청 메시지를 반환(루프 백) 시험
* CONNECT: 프록시 동작의 터널 접속으로 변경

데이터 조작의 기본이 되는 성질 CRUD

* Create: 데이터 작성 > POST/PUT
* Read: 데이터 읽기 > GET
* Update: 데이터 갱신 > PUT
* Delete: 데이터 삭제 > DELETE



### GET - 리소스 취득

URI가 가리키는 리소스를 취득한다.

```
GET /list HTTP/1.1
Host: example.com
```



### POST - 리소스의 작성, 추가

**POST의 세 가지 역할**

1. 서브 리소스의 작성

```
POST /list HTTP/1.1
Host: example.com
Content-Type: text/plain; charset=utf-8

안녕하세요!
```

```
HTTP/1.1 201 Created
Content-Type: text/plain; charset=utf-8
Location: http://example.com/list/item5

안녕하세요!
```

/list 하위에 item5라는 서브 리소스 작성

Location: 새롭게 생성한 리소스의 URI

201 Created: 스테이터스 코드



2. 리소스에 데이터 추가

```
GET /log HTTP/1.1
Host: example.com
```

```
HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8

2010-10-10T10:10:00Z, GET /list, 200
2010-10-10T10:11:00Z, POST /list, 201
2010-10-10T10:20:00Z, GET /list, 200
```

* csv(comma separated values): 콤마 구분 형식

```
POST /log HTTP/1.1
Host: example.com

2010-10-10T10:13:00Z, GET /list, 200
```

```
HTTP/1.1 200 OK
```

아까와는 다르게 200 OK가 반환됐다: 신규 리소스작성은 201 리소스의 데이터 추가는 200을 반환

아까와 요청 메시지가 같지만 이번에는 데이터 추가 작업을 시행했다: POST메소드의 작동방식은 서버의 구현이 결정한다.



3. 다른 메소드로는 대응할 수 없는 처리

검색을 위한 다음의 URI가 있다

```
http://example.com/search?q={키워드}
```

URI에는 길이제한이 없지만 보통 2,000자에 맞춘다. 만약 키워드의 길이가 매우 길어진다면?

POST를 이용할 수 있다

```
POST /search HTTP/1.1
Content-Type: application/x-www-form-urlencoded

q=very+long+keword...
```



### PUT - 리소스의 갱신, 작성

1. 리소스의 갱신

아까 post메소드를 통해 list/item5에 새로운 서브 리소스(안녕하세요!)가 등록됐다고 가정하면

```
PUT /list/item5 HTTP/1.1
Host: example.com
Content-Type: text/plain; charset=utf-8

좋은 밤이네요!
```

```
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

좋은 밤이네요!
```

이미 작성된 리소스를 수정할 때 사용한다.



2. 리소스의 작성

/newitem이 아직 존재하지 않는다고 가정하자

```
PUT /newitem HTTP/1.1
Host: example.com
Content-Type: text/plain; charset=utf-8

새로운 내용
```

```
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

새로운 내용
```

PUT을 이용해 리소스를 작성하는 경우 클라이언트가 URI를 알고있기 떄문에 POST와는 다르게 **Location헤더를 반환하지 않는다.** 만약 newitem이 이미 존재하면 갱신하는 작업을 한다.



**POST와 PUT의 사용 구분**

POST와 PUT 모두 리소스 작성 기능이 있다. 그렇다면 어떤상황에 어떤 메소드를 쓸까?

* POST: URI의 결정권은 서버측에 있다. 트위터에서 포스팅한 트윗을 사용자가 알 필요가 없으니까 POST를 쓴다.
* PUT: URI의 결정권은 클라이언트측에 있다. wiki는 사용자가 설정한 타이틀이 그대로 URI가 된다.

사용자가 서버 구현 방식을 잘 알고 있으면 PUT

나머지 대부분의 경우는 POST



### DELETE - 리소스 삭제

```
DELETE /list/item2 HTTP/1.1
Host: exmple.com
```

```
HTTP/1.1 200 OK
```

DELETE응답은 바디를 가지지 않는다. 따라서 응답 메시지에 바디가 없다는 204 No Content가 사용되기도 한다.



### HEAD - 리소스의 헤더 취득

HEAD 응답은 리소스의 헤더만을 가져오기 때문에 바디가 존재하지 않는다. 네트워크 대역을 절약하면서 리소스의 크기를 알아내거나 리소스의 갱신일자를 구할 수 있다



### OPTIONS - 리소스가 서포트하는 메서드 취득

리소스가 지원하는 메소드를 반환

```
OPTIONS /list HTTP/1.1
Host: example.com
```

```
hTTP/1.1 200 OK
Allow: GET, HEAD, POST
```



### POST를 PUT/DELETE 대신 사용하는 방법

HTML의 form에서 GET과 POST만 지정할 수 있기 때문에 GET/POST가 가장 많이 쓰인다

```html
<form action='GET' target='/list'>
    ...
</form>
```

* 최근에는 Ajax에서 XMLHttpRequest 모듈을 이용하면 임의의 메소드를 생성할 수 있기 때문에 이런 제한이 해소되는 중



**그럼 POST를 이용해서 어떻게 PUT/DELETE를 대신할 수 있을까?**

1. _method 파라미터 이용

```html
<form target='List/item1' action='POST'>
    <input type='hidden' id='_method' value='PUT'>
    <textarea id='body'> ... </textarea>
</form>
```

```
POST /list/item1 HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

_method=PUT&body=...
```

form의 숨겨진 hidden파라미터에 보내고 싶은 메소드를 보내면 된다.

이 방법으로 작성하면 바디에는 =과 &를 사용한 텍스트가 생성되는데 이 포맷을 **application/x-www-form-urlencode**라고 한다. Content-Type헤더가 이걸 나타내고 있다



2. X-HTTP-Method-Override

POST의 내용이 XML등 application/x-www-form-urlencode 이외의 포맷인 경우 이용할 수 없다. 그때 이용하는 것이 **X-HTTP-Method-Override**헤더이다.

```
POST /list/item1 HTTP/1.1
Host: example.com
Content-Type: application/xml; charset=utf-8
X-HTTP-Method-Override: PUT

<body>...<body>
```



### 조건부 요청

If-Modified-Since 헤더를 이용해 갱신일자를 나타내면 갱신된 경우에서 요청한다.

이와 같은 요청을 조건부 요청이라고 한다



### 멱등성과 안전성

> 멱등성: 어떤 조작을 몇 번 반복해도 결과가 동일함

> 안전성: 조작 대상의 리소스의 상태를 변화시키지 않음(=리소스를 조작하지 않음). side-effect가 없음

| 메서드      | 성질                       |
| :---------- | -------------------------- |
| GET, HEAD   | 멱등이고 안전하다          |
| PUT, DELETE | 멱등이지만 안전하지 않다   |
| POST        | 멱등이지도 안전하지도 않다 |



### 메서드의 오용

**GET 메소드가 안전하지 않게 되는 예**

```
GET resources/1/delete HTTP/1.1
Host: example.com
```

URI에 delete가 들어있다



**다른 메서드로 할 수 있는데 POST를 오용한 예**

POST는 만능 메서드지만, 멱등성과 안전성이 보장되지 않기 때문에 필요할 때만 사용해야 된다.

예: XML-RPC와 SOAP(RPC를 구현하기 위한 프로토콜이지만 모든 함수 호출을 POST로 구현하도록 설계되어 있음)



**PUT이 멱등이 아니게 되는 예**

```
PUT /tomato HTTP/1.1
Host: example.com
Content-Type:text/plain; charset=utf-8

+50
```

상대적인 값을 전송하면 멱등성을 잃어버린다.

PUT을 이용할 때는 절대적인 값을 전송하도록 하자



**DELETE가 멱등이 아니게 되는 예**

```
DELETE /latest HTTP/1.1
Host: example.com
```

다음 요청 메시지를 반복하면 example.com의 최신 데이터값이 계속 제거된다.

시간이나 상황에 따라 변화하는 리소스는 갱신과 삭제 등의 조작을 할 수 없도록 해야한다.





## ch8. 스테이터스 코드

> 스테이터스 코드: 응답 메시지에서 그 의미를 전달하는 부분

```
HTTP/1.1 200 OK
...
```

* 200에 해당되는 것이 스테이터스 코드
* OK: 텍스트 프레이즈



### 스테이터스 코드의 분류

**1xx: 처리중**

**2xx: 성공**

**3xx: 리다이렉트**

* 응답메시지의 Location헤더를 보고 리다이렉트

**4xx: 클라이언트 에러**

* 클라이언트 요청에 문제가 있음

**5xx: 서버 에러**

> HTTP에서 Component란 서버와 클라이언트를 말한다



### 자주 사용되는 스테이터스 코드

**200 OK** - 요청 성공

* GET의 경우 바디에 리소스의 표현이 들어감
* POST, PUT의 경우 바디에 처리결과가 들어감

**201 Created** - 리소스 작성 성공

* 리소스가 새로 작성됨, PUT과 POST의 결과
* POST의 경우 Location헤더에 절대 URI가 들어감
* PUT의 경우 Location헤더 없음



**301 Moved Permanently** - 리소스의 항구적인 이동

* Location헤더에 새로운 절대 URI가 들어가있음
* 303과 같이 자동으로 클라이언트가 URI로 재접속(리다이렉트)

**303 See Other** - 다른 URI 참조

* 리다이렉트에 대한 처리결과를 다른 URI로 취득할 수 있음을 의미
* POST로 리소스를 조작한 결과를 GET으로 사용할 때 사용

```
POST /login HTTP/1.1
Host: example.com
Content-Type: applicaition/x-www-form-urlencoded

username=mando&password=foobar
```

```
HTTP/1.1 303 See Other
...

<html>
  <a href='example.com/home/mando>결과</a>를 확인하여 주십시오
</html>
```

```
GET /home/mando HTTP/1.1
Host: example.com
```



**400 Bad Request** - 요청 오류

* 요청 구문이나 파라미터가 잘못되었다는 것을 나타냄
* PUT메소드로 사용자 패스워드를 변경하고자 할 때, 패스워드가 너무 단순하면 이런식으로 응답

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "message": "패스워드가 너무 단순합니다"
}
```

* 또한, 적절한 클라리언트 에러를 나타내는 스테이터스 코드가 없을 때 쓰임
* 클라이언트가 모르는 4xx스테이터스 코드를 반환할 경우 400과 같은 처리를 함

**401 Unauthorized** - 접근 권한 없음, 인증 실패

* 적절한 인증정보를 부여하지 않은 채 리다이렉트를 수행했다는 것을 의미
* 응답의 WWW-authenticate헤더에서 클라이언트에 대해 인증방식을 전달

```
DELETE /test HTTP/1.1
Host: example.com
```

```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="example.com"
```

**404 Not Found** - 리소스 없음

* 응답 바디에는 이유가 들어감



**500 Internal Server Error** - 서버 내부 에러

* 서버측에 이상이 생겼음


* 응답 바디에는 이유가 들어감
* 적절한 서버에러를 표현할 스테이터스 코드가 없을 때도 사용됨

**503 Service Unavailable** - 서비스 정지

* 서버가 점검등으로 일시적으로 접근할 수 없을 때 사용
* 응답 바디에는 이유가 표시
* Retry-After 헤더로 재개 시기가 대략 몇 십초 후인지 알려줄 수 있음

```
HTTP/1.1 503 Services Unavailable
Retry-After: 3600

지금은 점검 중 입니다. 잠시 후 다시 접속해 주세요
```



### 스테이터스 코드와 에러처리

사람을 대상으로 하는 응답 메시지의 경우 바디를 html로 처리해도 상관없다. 하지만 웹 API의 경우 적절한 바디 형식을 선택해야 한다.

**프로토콜에 따른 포맷으로 에러를 반환한다**

AtomPub을 이용한 웹 API인 경우 에러메시지는 Atom으로 반환하는 것이 한 방법(13장에서 더 자세히 다룰 예정)

**Accept 헤더에 따른 포맷으로 에러를 반환한다**

클라이언트가 Accept헤더를 전송하고 있는 경우는 정보 표현을 동적으로 바꿔주면 된다

```
Accept: application/xhtml+xml;q=0.9, text/plain;q=0.3 // Html로 반환
Accept: application/atom+xml;q=0.9, text/plain;q=0.5 // Atom형식으로 반환
```



### 스테이터스 코드의 오용

에러를 200 OK로 반환하는 경우가 있다



### 스테이터스 코드를 의식해서 설계한다





## ch9. HTTP헤더

헤더란 바디에 대한 메타데이터를 일컫는다.

인증이나 캐시같은 HTTP기능도 헤더로 구현한다.



### 날짜와 시간

날짜와 시간을 가지는 헤더로는 대표적으로 Date와 Expires가 있다.

| 이용하는 메시지 | 헤더                | 의미                                                    |
| --------------- | ------------------- | ------------------------------------------------------- |
| 요청과 응답     | Date                | 메시지를 생성한 일시                                    |
| 요청            | If-Modified-Since   | 조건부 GET으로 리소스의 갱신일시를 지정할 때 이용       |
|                 | If-Unmodified-since | 조건부 PUT, DELETE로 리소스의 갱신일시를 지정할 때 이용 |
| 응답            | Expires             | 응답을 캐시 할 수 있는 기한                             |
|                 | Last-Modified       | 리소스를 마지막으로 갱신한 일시                         |
|                 | Retry-After         | 다시 요청을 전송할 수 있는 일시의 기준                  |

**Data헤더의 사용**

```
Date: Tue, 06 Jul 2010 03:21:05 GMT
```



### MIME 미디어 타입

> MIME(Multipurpose Internet Mail Extensions)

메시지로 주고받는 리소스 표현의 종류를 지정하는 헤더.



**Content-Type** - 미디어 타입을 지정

메시지의 바디 내용이 어떤 종류인지를 나타냄

```
// xhtml을 나타내는 미디어 타입
Content-Type: application/xhtml+xml; charset=utf-8
```

* `applicaion/xhtml+xml` : 미디어타입
  * `applcation` : 타입. 임의로 늘릴 수 없음. RFC 2045와 RFC2046에서 9가지를 정의
    * text, image, audio, video, application, multipart, message, model, example
  * `xhtml+xml` : 서브타입. 비교적 자유롭게 늘릴 수 있음; 참고로 xhtml이나 svg와 같은 xml미디어 타입은 `+xml`을 붙이도록 되어있음
  * [MIME 미디어 타입(IANA)](https://www.iana.org/assignments/media-types/media-types.xhtml)



**charset 파라미터** - 문자 인코딩을 지정

```
Content-Type: application/xhtml+xml; charset=utf-8
```

* charset 파라미터는 인코딩을 지정한다
  * `utf-8` : 