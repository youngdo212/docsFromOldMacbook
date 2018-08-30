# html templating

서버 사이드 렌더링 = templating

* jsp



기존에는 서버에서 템플릿을 전부 가지고 있었고 직접 서버에서 렌더링을 했다. 사용자의 컴퓨터 사양이 높아지면서 클라이언트에서 렌더링 과정을 나눠가기 시작함



template+JSON data => handlebar라는 라이브러에서 간소화

-> ES6 template literal로 변해가고 있음



index.html을 요청한다

* 서버에서 첫 화면을 렌더링 해서 응답

나머지 필요한 부분을 ajax통해서 데이터를 가져옴(json, xml)

* 클라이언트에서 템플릿을 통해 렌더링
* ajax를 통해 완성된 html을 보내줄 수 도 있다(네이버, 구글) - 빠름
  - 서버에서 파싱한 데이터기 때문에 빠르다

템플릿 또한 서버에서 가져온다



요청방식 표준

* restful API
* graphQL

응답

* Json

클라이언트에서 렌더링을 편하게 하기 위해 라이브러리 탄생

* ember, react, vue, angular



conponent 개발방식(재사용에 목표)

* 컴포넌트(푸터, 탭 , 리스트 뷰 등)별로 구분함: html, js, css 전부 합쳐저 있음(기존과는 다른 방식)
* 라이브러리가 컴포넌트를 연결해주는 역할을 함

