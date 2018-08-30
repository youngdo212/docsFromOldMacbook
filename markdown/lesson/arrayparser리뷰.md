# ArrayParser 리뷰

* JSON 파서: 문자열 <-> 객체
* 우리가 만든건 분석기
* 해석기에선 수학적 연산 등을 함



* 전문



* 오토마타



문제를 잘게 나누자



객체간(함수간) 의존관계를 파악하기 위해 드러낼 수도 있다(생성자에 나타낸다던지 보기 쉽도록).



의존 관계의 깊이를 줄이기 위해 객체를 들어내 가장 상위의 함수(객체)에 나타낸 후 인자로 넘겨주는 방법도 있다

```javascript
function lexer(nodes){
    const ast = [];
    const typeChecker = new TypeCheck(); // 들어냄
    
    nodes.forEach(node=>{
        ast.push(node, typeChecker); // 들어낸 값을 입력
    });
    
    return ast;
}
```



* 객체 주입
* 의존성 주입(dependency injection)





