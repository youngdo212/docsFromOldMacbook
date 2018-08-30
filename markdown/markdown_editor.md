# use case

### 클라이언트

좌측: markdown, 우측: markup

버튼을 누르면 markdown이 markup으로 변환된다

1. 버튼을 누른다
2. markdown의 textContent가 json 데이터로 변환된다
3. json 데이터는 해석기를 통해 마크업 문서가 된다
4. 해석된 마크업 문서는 markup의 innerHtml로 들어간다

히스토리: 되돌리기 기능(command+z, command+shift+z)을 이용해 히스토리에 접근할 수 있다

* 히스토리 단위
  * Insert
    * 입력 후 1초가 지나면 하나의 히스토리 단위가 생성
  * delete
    * 하나의 문자씩 삭제되는 경우: 마지막 Delete입력 후 1초가 지나면 히스토리 단위 생성
    * 복수의 문자가 삭제되는 경우: 복수 문자를 하나의 히스토리 단위로 생성
* 히스토리의 개수 제한
  * 개수를 초과하면 가장 오래된 히스토리부터 제거한다

1. 단축키를 통해 히스토리를 이동한다
2. 이동할 때마다 편집기가 렌더링 된다
3. 히스토리 중간에서 새로 입력할 경우 이후의 히스토리는 전부 삭제된다



### 문법

double carriage return rule

header

list(ol, ul)

table(align)

bold/italic

blockquote

code block/syntax highlighting

link

images

emoji(추후에 추가)



### 파싱

마크업 자체가 계층구조를 가지니까 ast를 만들자



### 데이터 구조

```
{
    tagName:
    attributes: [{name: href, value: "www.naver.com"}, {}, ...]
    textContent:
    child:[]
}
```



### 희망사항

크로스 브라우징

테스트 코드



### 구조

# test
hello,
world

hello, world



heood
* first

what?
* first
continue
* second
title
====
1. dkdkd
0. dkfjkdjf
*djfkjdf*
>dkjfkdjfd
```
dkfjkdjfkjdf

dkfjkdjkf
dkfjkdjf
```
dkjfijefjkd
dfkjdkjfjdf
[link](www.naver.com)
dkjfkdjf

title
= dd

* lsit
- dkfjkdjf

1. dkjfkdjf

* first
* dkfjdkf

1. ff
1. dkfjdkfj

***bold and italic***

_*_italic__*

_mysn_

>dkjfkdjfkjdf

dkjfiejf
> dkfjkdjf

*    dfdfdfkdjfkjdf

dkfjidjf```dkfjkdjf```dkfjkdjfdfkj

```
dkfjdkfjkdf
dfdsfa
```
dkfjkdjf

dkfjkdjf
dkfjdkfjd
-
```
dkfjdkjfkdjf
df
dsfa
df
d
f
```

pa
ra
graph

hello[ddd]()
* first
- secod
- third

>dkfjkdjfdkf
> dfdfdkjfkdjffdjkjf

````
dkfjkdjf
dfdaf
````
dfdf

**hellot`dkfjdkj`**

> dkfjkdjf

> dkjfkdjfk

dkfjeifj **dkjfiejfe
**
dkfdkfjdf**