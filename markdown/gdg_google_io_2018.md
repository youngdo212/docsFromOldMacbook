# GDG google io 2018

## 1 - native app & web

네트워크가 정상작동하지 않거나 훨씬 빠르게 이용

* offline cache
* remote push notification
* background sync

#### 2016

mobile web

progressive web app

* reliable신뢰성 - https
* fast
* engaging: 사용자에게 필요한 정보를 재 때 제공

offline web app

* 설치될 때 데이터 전부 저장
* 네트워크 없이 캐시 데이터를 이용

app shell architecture

* 변하지 않는 레이아웃

user engagement

웹 매니패스트



#### 2017

web assembly: 웹 브라우저에서 동작할 수 있는 최소 수준의 표준 규격

* 네이티브 앱의 웹앱화에 사용, 니즈가 생길 것(autodesk(cad))
* c++(네이트브 앱) > web assembly > react(웹)

realworld example



#### 2018

web media(음악 스트리밍 등)

* media session api
* PIcture in picture: 유튜브 작게보기
* presentation api: 각기 다른 디스플레이, 다른 화면

media capability

* 새로운 코덱 av1

Trusted web activity

* web view, custom tab



#### pwa tips

workbox를 써라

서비스 워커 써라

native app install banner



#### summary

네이티브/웹의 상호작용에 대해 고민해야 할 때



## 2 - webVR & webXR

#### immersive web 몰입형 웹

> immersive web: VR + AR + web 웹을 통한 가상,증강현실

mozila vr

amazon 유료 Vr 브라우저 세팅

모든 HMD에는 브라우저가 탑재되어 있다 = 웹 vr이 쉽게 접근성을 가질 수 있다



#### webXR

Vr과 ar을 동시 지원

멀티 디바이스 지원

최적화가 중요 문제

90fms을 지원

dithering



#### webXR chrome support

origin trial 단계: 플래그만 활성화 시키면 사용 가능



#### 만들기

* detecting: promise사용
* XRSession
  * session은 webgl을 통해서만 사용
* XRview&input
* MagicWindow
* polyfill



## 3 - Flutter

>  dart

material components widgets 제공

cupertino (ios-style) widgets

widget & widget tree

* widget

fast deveplopment

ide friendly

widget inspector

native performance

* dart > native 컴파일





## 4 - deploying serverless nodejs microservices 

> msa: microservice architecture

> 모노리틱 아키텍쳐

monolith란?

* 통서버
* 하나의 시스템
* 일반적으로 소규모 프로젝트에서 사용

microservice란?

* 작은 단위 기능으로 서비스 분리
* 서비스가 독립적으로 동작
* 각 서버별 다른 언어로 개발 가능(monolith는 불가)
* 대규모 서비스에 적합

nodejs란?

* js runtime
* event driven: 이벤트와 별개로 cpu 동작
* async non-blocking i/o

Serverless

* no use no pay: 사용한 양에 비례하는 요금제(ms단위)
* automatic scale: 사용량에 비례하는 autoscale(급격히 증가하는 트래픽을 처리)
* focus on code: 서버 관리는 신경쓰지 않는다. 코드만 신경쓴다

deploying



## 5 - google news & matriel design

#### google news

ai first

고급인력을 서포트하는데 사용되는 ai



#### 관심있는 뉴스 신속 제공

top5 briefing

local news

for you(개인화된 뉴스)/headline(전통 뉴스)

newscast

ai를 통해 중요 문단 추출/노출



#### understand full story

full coverage: 해당 뉴스와 관련된 전체 내용 제공

구글 서치의 핫한 검색어와 연동되어 제공

fact check

video



#### support news source you love

subscribe with google



#### material design with google news

[링크](material.io)

디자인과 소프트웨어의 결합

매터리얼 디자인의 확장 > google material theme

google sans

taewan.an@gmail.com

