# git

1,2,3,5,6장

#### 깃이란?

linus torvals

버전 관리 시스템

#### 깃 장점?

오프라인

svn보다 빠름

브랜치 관리가 잘 됨

워크플로우 관리 쉬움

#### 기능

위킹트리(워킹 디렉토리) -> 스테이지(index) -> 로컬 저장소

clone

init: 로컬 저장소 생성

add: 워킹 트리에 있는 파일을 스테이지에 올림

* 워킹 트리: (.git의 하위의) 내가 작업하는 디렉토리
* .git : 로컬 저장소

commit(=snapshot): 스테이지 **파일들을 묶어서** .git의 로컬 레포에 **저장**한다

* 워킹 디렉토리의 특정 시점의 스냅샷
* checksum: 데이터를 가지고 체크섬을 만들어낸다

커밋은 자식이 부모를 가리킴

HEAD에서 커밋이 탄생

revert: 이전 위치에 새로운 커밋을 생성하고 되돌아감

브랜치 = 커밋(정확히는 브랜치는 커밋의 참조)

detached head

rebase: 

merge: 두 커밋을 합침(meta commit의 탄생)

* meta commit: 스냅샷이 아닌 커밋

push: 저장소에 **한 브랜치**의 **변경사항만**을 올림

fetch: 모든 커밋을 다가져오거나, 특정 브랜치를 지정해서 가져올 수 있음

```
git fetch origin
get fetch origin mando
```

git cat-file -t () : ()의 타입을 알려줌

glog —all

`* master`: 별표는 head가 가리키고 있다는 뜻

head가 가리키는 브랜치를 현재 브랜치

git reflog

pastforward: 한 줄기에서 merge를 했을 경우(참조만 갱신됨)

Git checkout: 로컬저장소에서 커밋을 꺼내 워킹트리에 반영

* 커밋과 워킹트리와 **스테이지(인덱스)**까지 반영한다. 즉, 스테이지도 바뀐다: 클린해야 되므로(클린 = 워킹디렉토리와 스테이지의 상태가 같다)

#### tag

태그도 참조의 일종

태그는 절대로 갱신되지 않는다

태그에는 추가적인 정보(annotation)을 달 수 있다

싸인을 남길 수 있다

배포를 위해 주로 사용

#### 기능

`git log master..` : `git log master..HEAD` 마스터와 헤드의 차이

^n : n번째 부모

~n : n번쨰 조상

rebase 브랜치: 나를 브랜치에 얹어 줘

`git rebase -i` : 임의대로 조작

cherry-pick: 커밋 하나만 떼오고 싶을 때

#### 원리

commit은 blob의 집합체

* blob: binary large object
* blob은 Tree로 관리됨
* 커밋은 파일을 묶어서 트리로 관리

`git ls-file --stage`

커밋은 스테이지를 가지고 트리를 만드는 과저

#### commit 만들기

write-tree로 현재 스테이지의 blob들을 트리로 만들고

`echo "Init" | git commit-tree TREEID`

하면 커밋 생성됨

그 다음에 헤드로 parent 지정하고 헤드 바꾸면 됨



#### f

`cat`

`git hash-object b.txt`

`tree .git`

`echo "hello" > c.txt`

`cat-file commit a723812338`

`git ls-files --stage`

`cat-file commit HEAD`

.git/objects

