# testCode

테스트코드는 똑같은 구조로 만드는게 좋다(moneyButtonList를 wallet에 넣어주자)



전역공간의 변수를 이용해서 return이 없는 함수를 테스트할 수 있다

```javascript
let test = false
function callback(){
    test = true
}
```

실제 핸들러와 html을 집어넣어서 Ui를 테스트할 수 있다



방어적인 테스트는 옵션

* 예) 인풋타입이 잘 들어갔는지



inputMoney의 테스트 코드에서 조각을 나눠서 테스트하면 더 좋다

```javascript
inputMoney(moneyData){
    let price = 0;

    Object.keys(moneyData).forEach(moneyUnit => {
      const count = moneyData[moneyUnit]
      price += Number(moneyUnit) * Number(count);
    })

    clearTimeout(this.returnMoneyTimeoutID);

    this.oTotalMoney.increase(price);
    this.oLogBox.printMessage(`${price}원이 투입되었습니다!`);
    this.oItemList.highlight(this.oTotalMoney.get());
  }
```

* increase, printMessage, highlight를 각각 테스트하면 더 좋다



실제도 DOM까지 수정되는지 확인하면 좋다(큰 흐름)



더 작은단위 테스트를 해보면 좋을 듯



mockFn사용을 좀 더 자제



테스트하기 쉬운 코드

* 함수명이 실제 작동과 일치되며 명확하다.
  * selectNumber의 함수명이 실제 작동과 다르다 -> delay...로 바꾸는게 좀 더 명ㅇ확해진다
* 인자로 상태를 가능하면 많이 넘겨받으면 좋다
  * 테스트할 때 상태를 쉽게 변경할 수 있기때문



테스트코드를 습관적으로 짜자



함수형 프로그래밍이 테스트 코드와 잘 맞는 이유: 의존적이지 않기 때문에(immutable한 코드)



테스트 주도 개발 읽어보기