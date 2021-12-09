# JS의 문법에 대해서 정리해보는 DIR 입니다

## 1. 식별자

---

식별자는 함수,변수,속성과 같은 값을 나타내는 이름이다.

식별자는 공백을 포함할 수 없고 숫자로 시작할 수 없다.

식별자를 문자열로 변환할 수는 없지만 문자열을 이용해 식별자로 사용할 수는 있다.

객체에서 computed property 형식을 이용하면 문자열을 속성으로 사용할 수 있게 된다.

```js
let age = 10;
const AGE = 10;

function setAge(){
}

const o = {
  age : 10,
  ['my Name']:"김"
}
o.age // 10
o.['my Name'] // 김
```

### 식별자 작성의 관례

1. Camel Case : 첫 단어는 소문자로 시작하고 두번째 단어 부터는 대문자로 시작하는 케이스
2. Snake Case : 단어와 단어 사이를 언더바로 구분하는 케이스

> Camel Case를 더 선호하는 편이라고 함

<br>

## 2. 값(Value)

---

### 자바스크립트의 자료형

1. Boolean
2. Null
3. Undefined
4. Number
5. String
6. Symbol
7. Object

### 타입스크립트의 자료형

1. Boolean
2. Number
3. String
4. Array
5. Tuple
6. Enum
7. Any
8. Void
9. Null and Undefined
10. Never
11. Object
12. Type assertions

> 자바스크립트와 타입스크립트에서 반드시 알아야 할 원칙
>
> - 값으로 취급할 수 있는 모든 것은 변수에 담을 수 있다.
> - 이를 이용한 수 많은 테크닉이 있기 때문에 이 원칙을 잘 기억해두자.

<br>

## 3. 타입

---

### JS로 작성한 코드와 TS로 작성한 코드

```js
// JS
function addAge(age) {
  return age + 1;
}

let age = addAge('30');

console.log(age);
```

```ts
//TS
function addAge(age: number): number {
  return age + 1;
}

let age: number = addAge(30);

console.log(age);
```

JS는 데이터를 변수에 넣을 때 그 변수의 타입을 매번 데이터가 들어가는 시점에 자유롭게 바꾼다는 메커니즘을 가진 언어이다.

따라서 타입이 없지는 않지만 매우 느슨하게 제약이 걸려있고 JS는 매우 불안정한 코드가 될 수 밖에 없다.

예로써 위의 JS코드를 보자 addAge에 "30"이라는 문자열이 들어가게 되면 예상했던 31이 출력되는 것이 아니라 301이 출력된다.

### TS를 사용하는 궁극적인 이유

어떤 변수가 어떤 유형의 데이터 타입만을 담을 수 있다라는 것이 타입스크립트의 본질적인 가치다.

자바스크립트는 오류를 런타임 환경에서 즉 사용자가 사용하는 순간에 오류를 잡아내지만

타입스크립트는 개발자가 개발하는 순간 즉 컴파일 타임에 오류를 잡아내 준다는 것이 가장 중요한 POINT

<br>

## 4. 변수 & 상수

---

초기의 JS에는 상수를 표현할 수 있는 방법이 없었고 오로지 var을 이용해서 변수를 처리했다.

그러나 var에는 많은 문제점이 있었고 따라서 var을 대체할 let과 상수를 표현하는 const를 만들었다.

### var의 문제점에 대해서 알아보자

<br>

### 1. 같은 이름의 변수를 여러번 생성가능하다

<br>
let,const와는 다르게 var은 같은 이름의 변수를 여러번 생성할 수 있다.

이로 인해서 예상치 못한 오류가 발생할 가능성이 크기 때문에 let과 const를 이용해 안정성을 높여준다.

### 2. Hoisting으로 인한 가독성 저하

<br>

Hoisting이란 어디에서 변수를 선언했는지 상관없이 항상 제일 위로 선언을 올려주는 것과 같이 동작하는 것을 의미한다.

```js
console.log(age);
var age = 4;
```

위 코드와 같이 말도 안되는 코드가 에러 없이 작동하며 값으로 undefined를 호출하는 이유가 바로 Hoisting 현상 때문이다.

위 코드는 다음과 같이 해석된다.

```js
var age; //Hoisting
console.log(age);
age = 4;
```

var은 Hoisting으로 인해서 아무리 아래에 선언해도 제일 위로 올라가 버린다.

### 3. block scope를 철저히 무시한다

<br>

var는 함수 레벨 스코프 이므로 함수 외에 있는 모든 것은 전역변수로 인식한다. 따라서 block 안에서 선언했음에도 block 밖에서 접근이 가능하다.

```js
{
  var age = 8;
}
console.log(age); // 8 출력
```

이렇게 var을 남발하게 된다면 나중에 선언하지 않은 값이 멋대로 출력된다던지 여러가지 문제점이 발생할 수 있다.

### let과 const의 차이점

1. 공통점

- 중복 선언할 수 없다.
- 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

2. 차이점

- const는 선언과 동시에 초기화와 할당이 이루어 져야 하며 let은 선언 단계와 초기화 단계가 분리되어 진행될 수 있다.
- const는 재할당이 불가능 하며, let은 재할당이 가능하다. (변수와 상수의 차이)
- const에서 객체를 할당하게 되었을 때는 객체 자체를 변경할 수는 없지만 속성값을 변경하는 것은 가능하다.

### Hoisting과 변수생성 과정

JS에서는 모든 선언을 해당 스코프의 선두로 옮긴 것 처럼 동작한다.
예로 var,let,const,function,class를 Hoisting한다.

여기서 var을 사용하지 않는 이유를 이해하기 위해서는 변수생성 단계와 TDZ를 알아야 한다.

> 변수 생성 단계
>
> 1. 선언 단계 : Scope의 변수들을 등록하는 단계
> 2. 초기화 단계 : 변수를 위한 공간을 메모리에 확보하고 undefined로 초기화 한다.
> 3. 할당 단계 : undefined로 초기화 된 변수에 실제 값을 할당한다.

var는 선언과 동시에 초기화가 되고 let은 선언과 초기화가 분리되어 진행된다.

아래 코드를 보며 이해해 보자

```js
{
  console.log(v); // 정상적으로 실행 -> undefined 출력
  console.log(l); // Reference Error 발생

  var v = 10;
  let l = 20;

  // 실제 실행 순서
  var v; // 선언과 동시에 초기화 되어 undefined 값이 들어있음
  let l; // 선언만 이루어짐

  console.log(v); // undefined
  console.log(l); // 초기화 전에 Access 할 수 없다는 레퍼런스 에러 발생

  var v = 10; // 할당 단계
  let l = 20; // 초기화가 이루어지고 다음 할당이 이루어짐
}
```

> TDZ(Temporal Dead Zone:TDZ) : 일시적 사각지대
>
> - 위 코드에서 볼 수 있듯이 선언은 되어 있지만, 초기화가 되지 않아 이를 위한 자리가 메모리에 준비되어 있지 않은 상태를 의미한다.
> - 따라서 let,const는 선언 전에 사용하게 되면 에러가 발생한다.

<br>

## 5. 식(연산 또는 계산)

---

<br>

### 식의 원칙

1. 식은 반드시 하나의 값을 반환한다.
2. 식은 반드시 세미클론으로 끝난다.
3. 따라서 식과 값은 동일하다.

### 분해 구조 할당

배열이나 객체에서 값을 변수에 할당 할 때 더 간단하게 할당하기 위한 방법이다.

```js
// 분해 구조 할당 사용 전
const colors = ['red', 'green', 'blue'];
const red = colors[0];
const green = colors[1];
const blue = colors[2];

const Colors = {
  black: 'black',
  yellow: 'yellow',
};
const black = Colors.black;
const yellow = Colors.yellow;

// 분해 구조 할당 사용 후

const [red, green, blue] = colors;

// 특정 위치에 있는 값만 할당하고 싶을 때
const [, , blue] = colors;

const { black, yellow } = Colors;
```

### 삼항 조건 연산자

```js
let a = 1;
let b = 2;
if (a === b) {
  a = 3;
} else {
  a = 4;
}

// 삼항 조건 연산자 사용
a = a === b ? 3 : 4;
```

<br>

## 6. 참조와 복사

---

<br>

기본형 타입은 복사 메커니즘, 기본형 타입이 아닌 객체는 참조 메커니즘이 적용된다.

```js
// 복사 메커니즘

let a = 1;
let b = a;

b = 2;

console.log(a); // 1
console.log(b); // 2

// 참조 메커니즘

let o = {
  isLoading: false,
};

let o2 = o;

o2.isLoading = true;

console.log(o.isLoading); // true
console.log(o2.isLoading); // true
```

객체에서는 참조 메커니즘이 적용된다.

o 객체를 생성하면 o라는 변수와 객체는 독립적이다.

즉 o에는 생성된 객체의 주소값이 들어 있고 o를 이용해 해당 객체에 접근 할 수 있는 것이다.

o2 = o 라는 식은 o2에 o의 값 즉 객체의 주소값이 복사되기 때문에 o2와 o는 같은 주소값을 가지게 된다.

따라서 o2와 o는 같은 객체를 가리키고 있기 때문에 위와 같은 참조 메커니즘이 적용된다.

<br>

## 7. 조건문

---

<br>

거짓 : null,undefined,0,''

참 : 모든 객체(안이 비어있어도 상관없음), 0이 아닌 모든 숫자, 문자열(공백 문자열 제외)

### switch문

```js
let age = 40;

switch (age) {
  case 1:
    console.log(1);
    break;
  case 2:
    console.log(2);
    break;
  case 3:
    console.log(3);
    break;
  default:
    console.log('??');
    break;
}
```

<br>

## 8. 반복문

---

<br>

반복문은 여러가지 방법으로 나타낼 수 있다.

### for

가장 기본적인 반복문 표현 방법이다.

```js
const arr = ['a', 'b', 'c', 'd'];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // a,b,c,d
}
```

### while

while문은 조건문이 참인 경우에만 반복한다.

```js
let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
```

### do - while

do - while문은 while문과 동일하지만 조건문이 실행되는 시점이 다르다.

따라서 while문에서는 경우에 따라 반복문이 한번도 실행 안될 수 있지만

do - while문에서는 반드시 한번 실행되야 한다.

```js
do {
  console.log(arr[i]);
  i++;
} while (i < arr.length);
```

### for of

배열을 처음부터 끝까지 한번 읽으면서 도는 것을 순회한다 라고 한다.

배열을 그냥 순회하기만 하는 경우는 for of를 사용하는 것이 가장 간편하다.

```js
for (const item of arr) {
  console.log(item); // a,b,c,d
}
```

### for in

for in은 배열에서는 위치값 즉 index를 넘겨준다.

```js
for (index in arr) {
  console.log(arr[index]); // a,b,c,d
}
```

그러나 이와 같은 순회하는 경우에는 for in을 사용하지 않는 편이다.

for in은 객체의 key값에만 접근하고 싶을 때 자주 사용된다.

```js
const obj = {
  colors: 'red',
  width: 200,
  height: 200,
};

for (key in obj) {
  console.log(key); // colors,width,height
  console.log(obj[key]); // red,200,200
}
```

<br>

## 9. 예외

---

<br>

예외 처리는 try catch문을 이용해서 처리해준다.

Error가 일어나야 하는 상황에는 throw를 이용해 에러를 던져주면

throw로 던져진 에러는 catch문을 찾아서 가게 된다.

```js
function doException() {
  throw new Error('Error');
}

function noException() {
  return true;
}

function callException(type) {
  if (type === 'do') {
    doException();
  } else {
    noException();
  }
}

function main() {
  try {
    callException('do');
  } catch (e) {
    console.log(e); // Error 출력
  } finally {
    // 예외가 일어나든 안일어나든 반드시 실행되어야 할 코드를 작성해주면 된다.
    console.log('done');
  }
}
```

try문에서 callException 함수를 통해서 doException 함수가 실행이 되기 때문에 에러가 throw 된다.

에러가 throw 되면 가까이에 있는 catch를 찾아서 인자로 Error 내용이 전달되는 것을 볼 수 있다.

만약 에러를 던졌는데 catch문이 없다면 에러가 발생해서 프로그램 자체가 종료된다.

<br>

## 10. 인터페이스와 타입 별칭

---

<br>

### Type Alias

타입에 별칭을 붙여서 의미를 부여 할 수 있다.

이 방법을 Type Alias라고 한다.

```ts
// name의 type은 string이지만 이 타입에 의미를 부여해 가독성을 높이고 싶다면
export interface IUser {
  readonly name: string;
}

// Type Alias를 통해서 Type을 정의해준다.
export type Name = string;

export interface IUser {
  readonly name: Name;
}
```

또 하나의 예시를 보자

Type Alias를 사용하면 해당 타입을 가진 변수에 들어올 수 있는 값을 제한 할 수 있다.

```ts
// 일주일의 요일을 담는 변수가 있다고 가정하자
const monday: string = '월';
// friday에 안녕이라는 문자열이 들어오는 것은 실수이고 이를 제한해 안정성을 높여주자
const friday: string = '안녕';

// Type Alias로 DayOfWeek라는 타입을 만들어 준다.

type DayOfWeek = '월' | '화' | '수' | '목' | '금' | '토' | '일';

// DayOfWeek 타입에는 "안녕" 이라는 문자열이 들어올 수 없다고 에러 표시가 뜬다.
const friday: DayOfWeek = '안녕';
```

### interface

인터페이스는 Type Alias와 동일한 기능을 가지고 있다.

자신만의 원칙을 세워서 Interface와 Type Alias 방법을 골라 사용하면 된다.

interface와 type alias는 궁극적인 목적은 동일하다.

Object에 대한 설계도가 interface와 type alias이고 설계한 대로 Object의 속성과 타입을 설정해야 한다.

```ts
// interface
interface IUser {
  readonly id: number;
  readonly name: Name;
  email: string;
  active: YesOrNo;
}

// type alias
type TUser = {
  readonly id: number;
  readonly name: Name;
  email: string;
  active: YesOrNo;
};

// type을 가져올 때 많은 타입들을 가져와야 한다면 아래와 같이 모든 타입을 가져오고 as를 이용한 별칭을 지어주는 방법이 효율적일 수 있다.
import * as allTypes from './types';
const iUser: allTypes.IUser = {
  id: 1,
  name: 'Moon',
  email: 'tjr@naver.com',
  active: 'Y',
};

const tUser: allTypes.TUser = {
  id: 2,
  name: 'Kim',
  email: 'kim@naver.com',
  active: 'N',
};
```

위 코드에서 볼 수 있듯이 interface와 type alias의 방식은 equals의 유무만 다르고 사용 코드 부분에서도 동일한 것을 볼 수 있다.

### merge의 차이

여러가지 interface나 type alias를 합치고 싶을 때 두 방식은 약간의 차이를 보인다.

interface는 **extends** 라는 키워드를 사용하고 type alias는 **intersection**을 사용한다.

```ts
// User 타입을 상속 받는 UserProfile을 만들어 보자

// interface 방식
interface IUserProfile extends IUser {
  profileImage: string;
  github?: string;
  // ?은 optional mark라고 생각하면 된다.
  // IUserProfile을 타입으로 가지는 Object를 생성할 때 속성값으로 github는 있어도 되고 없어도 되는 속성이다.
}

// type alias 방식
type TUserProfile = TUser & {
  profileImage: string;
  github?: string;
};
```

여기서 합쳐지는 부모는 interface든 type alias든 상관없다.

```ts
interface ~ extends TUser{} // 가능
interface ~ extends IUser{} // 가능

type ~ = TUser & {} //가능
type ~ = IUser & {} //가능
```

### 툭이한 객체 타입

Object를 생성할 때 각각의 type을 지정해 주는 것이 아니라 모든 속성에서 key의 타입과 value의 타입만을 설정해주고 싶다면 ??

```ts
// interface로 설계한 key는 string , value는 number인 설계도
interface IOnlyNumberValueObject {
  [key: string]: number;
}

// 사용코드
const iStyle: allTypes.IOnlyNumberValueObject = {
  borderWidth: 5,
  width: 300,
  height: 100,
};

// type alias로 설계한 key는 string , value는 boolean인 설계도
type TOnlyBooleanValueObject = {
  [prop: string]: boolean;
};

// 사용코드

const tStyle: allTypes.TOnlyBooleanValueObject = {
  border: true,
  visible: false,
  display: true,
};
```

### 함수의 규격 만들기

인자로 string 타입의 url과 optional string 타입의 search를 전달 받고 Promise를 리턴하는 함수 규격

```ts
interface IGetApi {
  (url: string, search?: string): Promise<string>;
}

// {}을 이용한 방법
type TGetApi = {
  (url: string, search?: string): Promise<string>;
};

// Arrow를 이용한 방법
type ArrowTGetApi = (url: string, search?: string) => Promise<string>;

// 사용코드
// 해당 함수 규격을 사용하기 위해서는 함수 정의문이 아니라 함수 정의 표현식을 사용해야한다.
// 즉 = 을 사용해야 한다.

const getApi: ArrowTGetApi = (url, search = '') => {
  return new Promise(resolve => resolve('OK'));
};

const getApi: TGetApi = function (url, search = '') {
  return new Promise(resolve => resolve('OK'));
};
```

### Class를 구현하기 위한 규격

```ts
interface IRect {
  id: number;
  x: number;
  y: number;
}

// 사용코드
class Rect implements IRect {
  id: number;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.id = Math.random() * 100000;
    this.x = x;
    this.y = y;
  }
}
```

class에 대한 규격을 interface를 이용해서 구현해주고 이를 사용할 때는 implements 키워드를 사용해 연결해준다.

이때 interface의 default는 public이기 때문에 class에서 private이나 protected로 구현하고 싶다면

interface에서 해당 속성을 지워줘야 에러 표시가 사라진다.

class에서 public인 값만 interface로 규격을 설정해준다.

번외로 type alias로도 class 규격을 설정할 수 있었다.

### 생성자 인터페이스

```ts
interface IRectConstructor {
  new (x: number, y: number): IRect;
}
```

### 일관된 원칙을 세워보자

Type Alias를 사용하는 경우 : 데이터만을 묘사하는 경우

Interface를 사용하는 경우 : 메서드를 포함한 데이터를 포괄하는 객체를 묘사하는 경우와 클래스

<br>

## 11. 함수

---

<br>

JS 함수 만의 특징 : 언어 레벨에서 함수를 값으로 취급한다.

이것의 의미는 함수를 변수에 넣을 수 잇다는 것을 뜻하고, 따라서 익명함수를 변수에 넣어 줘 사용이 가능하다.

이때 변수에 함수를 넣어주게 되면 이는 식이 된다. -> 함수 표현식

### 📣 함수정의문 VS 함수표현식

<br>

#### 함수 정의문 : 일반적인 프로그래밍 언어에서의 함수 선언과 비슷한 형식

```js
function 함수명() {
  // 로직
}
```

#### 함수 표현식 : JS 언어 만의 특징을 활용한 방식

```js
const 함수명 = function () {
  // 로직
};
```

#### 함수 표현식과 정의문의 차이점

1. 세미콜론의 유무

- 식은 항상 세미콜론으로 끝나고 문은 끝나지 않는다.
- 함수 표현식도 일종의 변수에 값을 넣은 형태이기 때문에 식이 되고 세미콜론으로 끝난다.

2. Hoisting

- 함수 선언식은 코드를 구현한 위치에 관계없이 JS의 특징인 호이스팅에 따라 브라우저가 자바스크립트를 해석할 때 맨위로 끌어 올린다.
- 함수 표현식은 const로 생성한 변수의 선언만 위로 끌어 올리고 값의 초기화와 할당은 해당 코드에 도착했을 때 진행 되므로 ReferenceError가 발생한다.

```js
// 실행전

test(); // Hoisting으로 인해 정상적으로 실행
test2(); // ReferenceError: 초기화 하기 전에 액세스 할 수 없다.

// 함수 정의문
function test() {
  console.log('정의문');
}

// 함수 표현식
const test2 = () => {
  console.log('표현식');
};

// 실행후
function test() {
  console.log('정의문');
}
```

### 📣 즉시실행 함수

즉시실행 함수란 함수가 만들어 지는 동시에 즉시 한번 실행하는 함수를 뜻한다.

이것은 어플리케이션에서 단 한번만 실행해야 하는 함수를 만들어야 할 때 익명함수를 활용해 즉시실행 함수로 구현해준다.

```js
(function () {
  // 로직
})();
```

### 📣 JS 함수 호출시 문제점

JS에서는 매개변수(parameter)의 개수에 상관 없이 인자(argument)를 받아 호출이 자체는 문제없이 가능하다.

예를 들어, 아래의 코드를 보자

```js
function sum(a, b, c) {
  return a + b + c;
}

// 6 리턴
const result = sum(1, 2, 3);

// 에러가 떠야 한다고 생각하지만 호출 자체는 성공하고 NaN값을 리턴한다.
const result2 = sum(1);

// 호출도 성공하고 4개의 인자부터는 무시하고 6이 출력된다.
const result3 = sum(1, 2, 3, 4, 5, 6);
```

그렇다면 sum이라는 함수가 인자로 전달되는 개수에 상관없이 계산할 수 있는 유연한 함수가 되기 위해서는 어떻게 해야할까 ?

이렇게 인자가 가변적일 때도 처리를 할 수 있는 자바스크립트가 제공을 해준다.

1. 유사배열 arguments

```js
// arguments에는 인자로 전달 된 모든 값들이 유사배열로 저장되어져 있다.
function sum() {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

const addSum = sum(10, 20, 30); // 60
const addSum2 = sum(10, 20, 30, 40); //100
```

2. arguments의 문제를 보완하는 rest parameter

함수는 시그니처만 보고서 어떻게 작동하는지 알 수 있도록 작성해야 가독성이 좋다.

그러나 arguments를 사용하게 되면 함수 시그니처만을 보고서는 이해할 수 없고 반드시 함수 전체를 봐야 이해할 수 있다.

그래서 새로운 스펙이 등장했고 바로 **rest parameter**이다.

rest parameter는 전개 파라미터라고 하며 굉장히 표현력이 높은 문법이다.

```js
// 여기서 ...은 몇개가 들어올지 모른다를 의미한다.
function sum(...args) {
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}
```

그냥 보기만 해서는 별로 변한게 없이 느껴지지만 함수 시그니처만 두고 보면

arguments에서는 인자를 받지 않는 함수인지 아닌지 구분 할 수 없었지만

전개 파라미터를 사용한 코드를 보면 바로 이 함수는 가변인자를 다루는 함수라는 것을 알수있다.

### 📣 함수 호출의 방법 3가지

```js
// 1. 기본
sum(10, 20, 30);
// 2. call을 사용한 호출
sum.call(null, 10, 20, 30);
// 3. apply를 사용한 호출
sum.apply(null, [10, 20, 30]);
```

> call과 apply의 차이
>
> - 기본적으로 같은 결과 값을 리턴하지만 사용 방법에서의 사소한 차이를 가지고 있다.
> - 그러나 코드의 유연성에서 차이가 드러난다.

```js
// apply는 []로 인자를 받는다.
// 따라서 함수 호출의 인자 값을 외부로 부터 전달 받아 무언가를 할 때 유연하게 처리 가능하다.

const arr = [10, 20, 30];

console.log(sum.apply(null, arr)); // 60
```

### 📣 Arrow Function

Arrow Function을 사용하면 코드를 줄일 수 있고 가독성이 좋다고 생각한다.

다음과 같이 사용한다.

```js
const arrowFunc = a => return a;
```

이와 같이 파라미터가 한개이면 ()를 생략할 수 있고 코드가 한 줄이고 바로 리턴하는 코드라면 {}를 생략 할 수 있다.

### 📣 Generator Function

이 함수는 function에 \*을 붙여 사용하는 함수이다.

일반적으로 함수는 호출되면 실행되지만 생성기 함수는 최초에 호출되면 실행되지 않고 실행 준비 상태로 대기한다.

그리고 Iterator 객체 하나를 반환하는데 이 객체를 사용해 함수를 실행했다 멈췄다가 할 수 있다.

Iterator의 next() 메서드를 호출했을 때 Generator 함수가 실행되어, yield문을 만날 때 까지 진행하고, 해당 반환 값을 리턴한다.

이후 next() 메서드가 호출되면 진행이 멈췄던 위치에서부터 재실행 한다.

```js
function* gen() {
  yield 10;
  yield 20;
  yield 40;
}

const g = gen();

console.log(g.next().value); // 10
console.log(g.next().value); // 20
console.log(g.next().value); // 40
console.log(g.next().value); // undefined
```

<br>

## 12. 일급 함수

---

<br>

일급 함수 : 함수를 일반적인 값처럼 취급하는 것 (값처럼 변수에 넣는 것)

일급 함수를 이용한 몇가지 테크닉이 존재한다.

### 1 . 함수를 인자로 넘겨 줄 수 있기 때문에 가능한 테크닉

함수도 하나의 값으로 취급하기 때문에 당연히 인자로도 전달할 수있다.

아래의 코드를 살펴보자.

```ts
function ul(child: string): string {
  return `<ul>${child}</ul>`;
}

function ol(child: string): string {
  return `<ol>${child}</ol>`;
}

function makeLI(container: (child: string) => string, contents: string[]) {
  const liList = [];

  for (content of contents) {
    liList.push(`<li>${content}</li>`);
  }

  return container(liList.join(''));
}

const htmlUL = makeLI(ul, ['월', '화', '수', '목', '금', '토', '일']);

const htmlOL = makeLI(ol, ['봄', '여름', '가을', '겨울']);
```

makeLI의 첫번째 인자는 해당 LI태그를 감싸줄 부모 컨테이너를 만드는 함수를 전달해주고 두번째 인자는 LI로 생성할 컨텐츠를 전달해준다.

따라서 makeLI 함수는 인자로 들어오는 함수에 따라 다른 값을 리턴하는 유연한 함수가 되었다.

### 2 . 반환값으로 함수를 넘겨 줘 가독성을 높일 수 있는 테크닉

```js
// 기존의 함수
function salePrice(discountRate: number, price: number) {
  return price - price * (discountRate * 0.01);
}

console.log('여름 세일 - ' + salePrice(30, 100000));
console.log('겨을 세일 - ' + salePrice(10, 100000));

// salePrice를 쪼개 함수를 리턴해주는 함수로 변경해주면 사용시 가독성이 높아진다.

function discountPrice(discountRate: number) {
  return function (price: number) {
    return price - price * (discountRate * 0.01);
  };
}

const summerPrice = discountPrice(30); // 여름 가격을 리턴해주는 함수가 반환
const winterPrice = discountPrice(10); // 겨울 가격을 리턴해주는 함수가 반환

console.log(summerPrice(100000));
console.log(winterPrice(100000));
```

코드를 보면 salePrice 함수는 2개의 파라미터를 가지고 있고 판매가를 리턴해준다.

salePrice을 사용한 코드를 보면 이 가격이 여름 가격인지 겨울 가격인지 표현하지 못한다.

그러나 함수를 반환해주는 discountPrice 함수를 이용해 summberPrice 변수에 함수를 넣어주게 되면 코드만 보고서 여름 가격이구나 판단 할 수 있다.

<br>

## 13. 비동기 함수

---

<br>

```ts
function delay(ms: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 10) % 2 === 0) {
        resolve('success');
      } else {
        reject('failure');
      }
    }, ms);
  });
}
```

기존의 방법 (call back 함수)

```ts
delay(3000) //
  .then((result: string) => {
    console.log('done Promise' + result);
  })
  .catch((error: string) => {
    console.error('fail Promise' + error);
  });
```

async await를 사용한 방법

```ts
async function main() {
  try {
    const result = await delay(3000);
    console.log('done async' + result);
  } catch (e) {
    console.log('fail async!' + e);
  }
}
```

async await로 작성한 코드를 보면 delay라는 비동기 함수를 실행하고

3초 뒤에 일어나야 할 코드가 바로 뒤에 작성되어져 있는 것을 볼 수 있다.

비동기 함수를 순서대로 일어나는 코드 처럼 작성할 수 있다는 장점이 있다.

<br>

## 14. 객체

---

<br>

객체는 여러가지 방법으로 만들 수 있다.

### 객체 리터럴을 이용한 객체 생성

```ts
type Box = {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
};

// 직접 key와 value를 쳐서 하나의 객체를 만들었다.
let box: Box = {
  width: 200,
  height: 200,
  borderRadius: 5,
  backgroundColor: 'red',
};

// 함수를 이용해 객체의 틀과 데이터를 분리
function makeBox(
  width: number,
  height: number,
  borderRadius: number,
  backgroundColor: string
): Box {
  return {
    width,
    height,
    borderRadius,
    backgroundColor,
  };
}

let funcBox = makeBox(100, 100, 0, 'blue');
```

두 방법 모두 객체 리터럴을 이용해 객체를 만들고 있지만 두 방법은 구성에 차이를 두고 있다.

첫번째 방법은 객체의 틀과 데이터를 한번에 내부에서 처리하고,

두번째 방법은 객체의 틀과 데이터를 분리해 데이터를 외부에서 받아와 처리한다.

그냥 봤을 때는 첫번째 방법이 당연히 좋아보인다

하지만 예를들어 Box 객체를 500개 만들어야 한다고 가정해보자

그런데 객체의 속성명을 변경해야한다고 했을 때

첫번째 방법은 모든 객체의 속성명을 바꿔줘야 하므로 500번 바꿔줘야 하지만,

두번째 방법은 객체의 틀인 함수부분에 가서 속성명을 바꿔주기만 하면 되므로 1번만 바꿔주면 된다.

그러므로 함수를 이용함 객체리터럴 방식이 더 변화에 용이한 구조를 가지고 있다.

### 클래스를 이용한 객체 생성

클래스로 생성한 객체는 인스턴스 객체라고 부른다.

왜냐하면 클래스는 구성 정보를 가지고 있고 이를 실제로 현실화한 객체이기 때문이다.

```ts
class Shape implements Box {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;

  constructor(width: number, height: number, borderRadius: number, backgroundColor: string) {
    this.width = width;
    this.height = height;
    this.borderRadius = borderRadius;
    this.backgroundColor = backgroundColor;
  }
}

const boxShape = new Shape(10, 10, 0, 'blue');
```

### 객체의 복사

객체는 참조 타입이므로 상수에 객체를 전달해준다고 해서 서로 다른 객체를 바라보지 않는다.

아래 코드에서 볼 수 있듯이 box.width 값을 변경해줬지만 box1.width 값도 변경된 것을 볼 수 있다.

```ts
const box1 = box;
console.log(box.width); // 20

box.width = 50;
console.log(box.width); // 50
console.log(box1.width); // 50
```

그렇다면 해당 객체를 참조하는 것이 아닌 새로운 객체를 만들기 위해서는 어떻게 해야할까 ?

```ts
// Object.assign(target객체,source객체1,2,3,...)의 사용
// 여기서 source객체는 가변인자로 받기 때문에 개수에 상관없이 받을 수 있다.
// 1번부터 순서대로 target객체에 복사된다.
const box2 = Object.assign({}, box);

// 전개 파라미터 사용
// 이 방법을 사용하는 것이 가장 깔끔하고 복사하면서 속성까지 변경할 수 있기 때문에 많이 사용한다.
const box3 = { ...box, width: 30 };

// 가장 원시적인 방법인 객체를 문자열로 변경했다가 다시 객체로 변경하는 방법
const box4 = JSON.parse(JSON.stringify(box));
```

이 3가지 방법을 이용하면 서로 다른 주소값을 가진 객체를 만들 수 있다.

<br>

## 15. 속성과 메소드

---

<br>

객체에는 속성과 메소드가 존재한다.

쉽게 설명하자면 속성은 데이터이고 메소드는 함수이다.

여기서 객체에 메소드를 만드는 방법은 3가지가 존재한다.

아래의 코드를 보고 자기가 편한 방법으로 사용하되 첫 번째 방법보다는 두번째 세번째 방법이 좋아보인다.

```ts
interface MyObject {
  name: string;
  age: number;
  getFamilyName: () => string;
  getLastName: () => string;
  getBloodType: () => string;
}

const obj: MyObject = {
  name: 'Seok Hwan',
  age: 26,
  // 기본적인 방법
  getFamilyName: function () {
    return 'Moon';
  },
  // function 키워드를 없앤 방법
  getLastName() {
    return 'Moon';
  },
  // Arrow Function 방법
  getBloodType: () => 'A',
};

obj.age = -200;
obj.age = 200;
```

그런데 상식적으로 나이가 -200살,200살 일 수 있을까 ?

위 방법에서는 age는 속성이므로 데이터니깐 어떠한 Guard 로직을 짤 수가 없다.

이는 Class의 Getter Setter를 이용해 해결 할 수 있다.

bloodType도 C형이란 것은 존재하지 않기 때문에 이것을 해결하는 코드를 짜보자

```ts
class Person {
  _bloodType: string;

  constructor(bloodType: string) {
    this._bloodType = bloodType;
  }

  // 외부에서는 속성처럼 접근 가능
  set bloodType(btype: string) {
    if (btype === 'A' || btype === 'B' || btype === 'O' || btype === 'AB') {
      this._bloodType = btype;
    }
  }

  get bloodType() {
    return this._bloodType;
  }
}

const p1 = new Person('A');

p1.bloodType = 'C';
console.log(p1.bloodType); // A
```

여기서 bloodType은 메소드 인데 사용하는 곳에서는 마치 데이터인 속성처럼 사용하고 있다.

이것이 바로 Getter/Setter의 특징이다.

클래스 내부에서는 마치 메소드처럼 코드를 작성할 수 있지만 외부에서 사용 할때는 속성처럼 사용이 가능하다.

마지막 3번째 객체 생성 방법

Object.create에 대해 알아보자

Object.create는 자주 사용하지는 않는다. 특히 TS를 사용한다면 굳이 사용해야하나 싶기도 하다.

TS에는 readonly와 optional mark가 존재하므로 값을 변경하지 못하게 또는 값이 있어도 되고 없어도 되도록 할 수 있다.

```ts
interface MyObject {
  name?: string;
  readonly age: string;
}
```

JS에서 위와 같이 사용하기 위해서 Object.create를 사용한다.

```js
const obj = Object.create(null, {
  name: {
    value: 'Moon',
    writable: false,
    configurable: false,
  },
});

obj.name = 'Seok';
console.log(obj.name); // Moon

delete obj.name;
console.log(obj.name); // Moon
```

기본적으로 JS에서는 객체의 속성값을 변경할 수 있고 속성을 삭제하는 것도 가능하다.

그러나 Object.create로 객체를 만들게 되면 default로 위와 같은 속성이 걸려있다.

따라서 값을 변경할 수 없고 속성을 삭제 할 수도없다.

<br>

## 16. 배열

---

<br>

### 배열의 기본 메소드

#### 1 . push & pop

베열의 맨 마지막에 값을 넣거나 해당 값을 추출할 때 사용 된다.

그리고 넣거나 뺀 값을 리턴한다.

```js
const numbers = [1, 2, 3];

const a = numbers.push(4);
console.log(numbers); // [1,2,3,4]

const b = numbers.pop();
console.log(numbers); // [1,2,3]

console.log(a); // 4
console.log(b); // 4
```

#### 2 . shift & unshift

shift와 unshift는 pop&push와 같은 기능을 하지만 기준점이 맨 앞이다.

shift는 pop과 연관이 있는데 pop은 맨 뒤의 요소를 빼내지만 shift는 맨앞의 요소를 빼낸다.

unshift는 push와 연관이 있고 맨 앞에 인자로 받은 값을 추가한다.

#### 3 . slice & splice

`[].slice(strat,finish)`

slice는 시작 index와 끝 index를 인자로 받아 해당 index를 잘라낸다.

단, 기존의 배열은 변함이 없고 값만 잘라 배열을 만들어 리턴한다.

```js
const numbers = [1, 2, 3, 4];

// numbers 배열에서 slice를 이용해 [2,3]인 배열을 만들고 싶다면
const a = numbers.slice(1, 3);

console.log(a); // [2,3]
console.log(numbers); // [1,2,3,4]
```

`[].splice(start,deleteCount,추가할 값1,추가할 값2,...)`

splice는 기존 배열 요소를 삭제 또는 교체하거나 새 요소를 추가해 배열의 내용을 변경한다.

즉 이 메소드는 slice와는 다르게 원본 배열 자체를 수정한다.

```js
const numbers = [1, 2, 3, 4];

const a = numbers.splice(1, 2, 5, 6); // 1번째 요소부터 2개 삭제하고 그자리에 5,6을 추가한다.

console.log(a); // [2,3]
console.log(numbers); // [1,5,6,4]
```

slice와splice의 차이점 정리

1. slice는 기존 배열의 변화가 없고 splice는 기존 배열을 변화시킨다.
2. 2번째 인자가 의미하는 바가 다르다. (slice는 끝 index / splice는 삭제할 개수)

#### 4 . join & split

join은 배열을 하나의 문자열로 바꿔주는 메소드 이다.

인자로 구분자를 받으며 디폴트 값은 ,이다.

```js
const arr = ['안녕', '하세요', '여러분'];

console.log(arr.join()); // '안녕,하세요,여러분'

console.log(arr.join('')); // '안녕하세요여러분'
console.log(arr.join(' ')); // '안녕 하세요 여러분'
console.log(arr.join('-')); // '안녕-하세요-여러분'
```

split은 배열의 메소드가 아니라 문자열 메소드이다.

join과는 정반대로 문자열을 배열로 바꿔준다.

마찬가지로 구분자를 인자로 받으며 해당 문자열을 기준으로 요소를 나눠 배열을 만들어준다.

```js
const str = '안녕,하세요,여러분';

console.log(str.split(',')); // ['안녕','하세요','여러분']
```

#### 5 . concat

두 배열을 merge하는데 사용되는 메소드이다.

```js
const one = [1, 2];
const two = [3, 4, 5];

console.log(one.concat(two)); // [1,2,3,4,5]
```

concat을 이용해서 두 배열을 합칠 수 있지만 다른 방법도 가능하다.

바로 전개 연산자를 이용하는 방법이다.

```js
const one = [1, 2];
const two = [3, 4, 5];

console.log([...one, ...two]);
```

### 배열 연산 메소드

#### 1 . forEach & map

배열을 순회하는데 가장 많이 사용되는 메소드는 forEach라는 메소드 이다.

forEach를 사용하게 되면 배열의 각 요소를 순회하게 된다.

첫번째 인자로는 원소의 데이터 그자체 이고 두번째 인자는 index 세번째로는 원본 배열 자체를 넘겨준다.

단 로직 내부에서 필요한 정보만 인자로 기술해주면 된다.

```ts
books.forEach((book: string, idx: number, books: string[]) => {
  console.log(book, idx);
});
```

다음은 **map** 메소드이다.

forEach와 모든 것이 동일하지만 차이점이 존재한다.

forEach는 리턴을 하지 않지만 map은 전달된 함수가 리턴한 값을 모아서 배열로 만들어 리턴해준다.

```ts
const bookObjects: Book[] = books.map((book: string) => {
  return {
    title: book,
    author: undefined,
  };
});

console.log(bookObjects); // [Object,Object,Object] map에서 리턴한 객체를 배열로 만들어 리턴한다.
```

map 또한 체이닝 해서 사용이 가능한데 다음 코드를 보자.

```ts
const books: string[] = ['가', '나', '다', '라', '마'];

const newBooks: Book[] = books
  .map((title: string) => ({ title: book }))
  .map((book: Book) => ({ ...book, author: '문석환' }));
```

string배열인 books를 순회하며 title을 가진 객체 배열로 만들어 줬고 객체 배열을 map으로 순회하며 작가를 추가해준 코드이다.

위 코드도 좋은 코드이지만 더 가독성이 좋게 만들 수 있다.

이는 일급 함수의 특징을 가지기 때문에 가능한 테크닉이다.

```ts
const intoTitle = (title: string) => ({ title: book });
const makeAuthor = (name: string) => (book: Book) => ({ ...book, author: name });

const newBooks = books.map(intoTitle).map(makeAuthor('문석환'));
```

map에서 사용되는 각각의 함수를 별칭을 붙여 만들어주고 makeAuthor에서는 name이라는 인자를 받고 함수를 리턴하는 구조를 가지고 있다.

이렇게 사용했을때의 장점은 map에 전달되는 함수가 정확히 하는 행동에 대해서 별칭으로 유추 할 수 있고 작가의 이름을 변경하고자 할 때도

훨씬 가독성이 뛰어나다.

#### 2 . filter

filter 메소드도 순회를 한다는 것은 동일하다.

순회 하면서 함수가 true를 리턴하는 요소만 뽑은 새로운 배열을 반환해준다. (기존 배열에 영향X)

```ts
const gaArray: Book[] = newBooks.filter((book: Book) => book.title.includes('가'));

console.log(gaArray); // (1) [Object] -> {title:'가',author:'문석환'}
```

#### 3. reduce

reduce는 1개의 callback함수와 initialValue를 가지며 이 callback함수는 배열의 각 요소에 대해 실행한다.

이 함수는 총 4개의 인자를 전달 받는다.

1. accumulator(누산기)
2. currentValue(처리할 현재 요소)
3. currentIndex(처리할 현재 요소의 인덱스)
4. array(reduce()를 호출한 배열)

그리고 전달 받은 initialValue를 처음에 accumulator로 가진다.

이렇게 보면 이해가 안되니 코드를 보며 이해해보자.

```ts
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = numbers.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(sum); // 55
```

위 코드는 reduce를 이용해 배열의 총합을 구하는 코드이다.

첫번째로 acc에는 초기값인 0이 들어있고 cur에는 현재 요소인 첫 인덱스값 1이 들어간다.

그리고 여기서 반환되는 0+1 -> 1이 acc의 값으로 들어가게 된다.

따라서 acc는 1->3->6->10->...->55 로 마지막 리턴값인 55가 sum에 들어가게 된다.

이 reduce는 위와 같이 숫자를 더하는데도 사용되지만 다양한 곳에서 사용될 수 있다.

배열의 요소에 객체들이 들어가게 되고 이 객체들을 하나의 객체로 만들고 싶을 때도 사용할 수 있다.

```ts
type SomeObject = {
  [key: number]: string | number;
};

const someObjects: SomeObject[] = [
  { border: 'none' },
  { fontSize: 14 },
  { className: 'box sm-box' },
];

// 위 배열의 요소들을 순회하며 하나의 객체로 만들어 주자

const someObject: SomeObject = someObjects.reduce(
  (acc: SomeObject, cur: SomeObject) => ({ ...acc, ...cur }),
  {}
);

console.log(someObject); // {border:'none',fontSize:14,className:'box sm-box}
```

<br>

## 17. 튜플

---

<br>

튜플은 타입스크립트에서만 제공하는 유형이다.

튜플은 기본적으로 JS에서 제공하는 배열을 확장한 기능이라고 생각하면 된다.

어떠한 배열을 만들고 싶은데 이 배열의 길이를 고정하고 싶다면 튜플을 사용한다.

배열을 만들 때 길이를 고정하기 때문에 각 요소의 type을 개별적으로 설정해줄 수 있다는 장점이 있다.

```ts
const address: [number, string, string] = [123, '동구', '망양로'];

// BookInfo 타입은 [string,string,number] 구조를 가진 튜플의 타입을 명시한다.
type BookInfo = [string, string, number];

const BookData: BookInfo[] = [
  ['트렌드 코리아2022', '김난도', 2022],
  ['헨리 8세', '세익스피어', 1884],
];
```

여기서 BookData는 배열 안에 튜플을 가지고 있는 구조를 가지며 이런 복잡한 구조도 TS가 다 검사를 해준다.

<br>

## 18. 클래스

---

클래스는 동일한 종류의 객체를 여러개 생성해야 하는 경우에 사용 할 수 있다.

여기서 class의 규격을 정의하고 싶다면 interface를 이용해 설계도를 정의해주고 implements 키워드를 이용해

해당 규격을 가진 class라고 명시해주게 된다.

따라서 해당 클래스는 interface에서 명시한 규격대로 만들어줘야 한다.

```ts
interface Container {
  tagName: string;
  className: string;
  getTagName: () => string;
}

class MyContainer implements Container {
  tagName: string;
  className: string;

  constructor(tagName: string, className: string) {
    this.tagName = tagName;
    this.className = className;
  }

  getTagName = () => this.tagName;
}
```

그리고 하위 클래스에서 공통된 부분이 있다면 부모 클래스로 만들어줘 상속을 이용해준다.

이때 하위 클래스에서 생성자에 super()를 해줘서 상위 클래스의 생성자도 실행될 수 있도록 해야한다.

이는 사용 시 하위 클래스를 이용해 인스턴스 객체를 만들어 주기 때문이다.

### 추상클래스

클래스에는 추상 클래스와 추상 메소드라는 개념이 존재한다.

추상 메소드를 사용하기 위해서는 해당 클래스가 반드시 추상 클래스이어야 하며 키워드는 **abstract** 라는 키워드를 사용한다.

부모 클래스에서 추상 메소드를 선언 하고 자식 클래스에서 반드시 추상 메소드를 구현을 해줘야 한다.

```ts
abstract class Shape {
  ...
  abstract area: ()=> number;
}

class Circle extends Shape {
  constructor(){
    super();
  }
  ...

  // area 메소드를 구현해 주지 않으면 에러 표시가 뜬다.
  // 추상 메소드 이기 때문에 반드시 자식 클래스에서 구현을 해줘야 한다.
  area = () => this._radius * this._radius * Math.PI;
}
```

### 접근 제한자

1. public
2. protected
3. private

이 3개의 접근 제한자에 대해서 알아보자.

public은 디폴트 접근 제한자로써 어디에서든 접근이 가능한 접근 제한자이다.

protected는 내부와 자식 클래스에서 접근이 가능하지만 외부에서는 접근이 불가능한 접근 제한자이다.

private는 내부에서만 사용 가능하며 자식 클래스와 외부에서는 접근 할 수 없는 접근 제한자이다.

<br>

## 19. 프로토타입

---

### 객체의 프로토타입 메커니즘

프로토타입 체이닝 메커니즘을 이해하기 위해서 아래 코드를 살펴보자

```js
const c1 = {
  name: 'C1',
  color: 'red',
};

console.log(c1.toString()); // [object Object]
```

여기서 c1에는 toString이라는 메소드가 존재하지 않는데 어떻게 동작하고 [object Object]라는 값을 출력할 수 있을까 ?

객체는 프로토타입 체이닝 메커니즘을 통해 메소드에 접근이 가능하다.

c1.toString() 코드는 먼저 c1 객체에서 toString 메소드를 찾아보고 없으면 상위 객체(proto가 가르키는 객체)에 접근하여 해당 메소드를 찾을 수 있다. 있다면 동작 시키고 없다면 undefined가 된다.

다음 코드도 한번 살펴보자

```js
const c1 = {
  name: 'C1',
  color: 'red',
};

const c2 = {
  name: 'C2',
  width: 300,
};

const c3 = {
  name: 'C3',
  height: 100,
};

//모든 객체는 __proto__를 가지고 있고 이를 이용해 상위 객체에 접근할 수 있다.

// c1의 상위 객체에 c3를 넣고 c3의 상위 객체에 c2를 넣으면 c2 > c3 > c1 의 포함 관계를 가진다.
// 따라서 c1.속성 했을 때 먼저 c1에 속성이 있는지 찾아보고 없다면 c3, c3에도 없다면 c2로 가서 찾고 c2에도 없다면 최상위 객체인 Object에 접근해서 찾아보게 된다. 여기 까지 찾아보고도 없다면 undefined가 된다.

c1.__proto__ = c3;
c3.__proto__ = c2;

console.log(c1.height); // 100
console.log(c1.width); // 300
```

c1에는 height와 width가 존재 하지 않지만 100과 300의 값이 출력되는 것을 볼 수 있다.

### 함수의 프로토타입 메커니즘

```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.lastName = 'Wow';

const f = new Foo('문석환');
console.log(f); // Foo {name:'문석환'}
console.log(f.lastName); // 'Wow'
```

함수를 이용해서 객체를 만들어 보았고 이 함수는 name을 인자로 받아서 name속성을 가지는 객체를 만들어준다.

여기서 함수에는 prototype이라는 속성이 존재하는데 이 prototype을 이용해서 이전과 같은 기능을 해줄 수 있다.

근데 함수의 속성인 prototype에 넣어줬다고 해서 어떻게 인스턴스 객체의 속성으로 사용할 수 있는 걸까요 ?

이는 new 연산자에 의해 작동하게 된다.

인스턴스 객체도 일반 객체이기 때문에 당연히 `__proto__`라는 속성이 존재한다.

new 연산자를 이용해 인스턴스 객체를 만들어주게 되면 인스턴스 객체를 생성해주는 것 뿐만 아니라

자동으로 `this.__proto__ = Foo.prototype`을 체이닝 해줘 인스턴스 객체에서도 접근이 가능하게 되는 것이다.

이해가 안된다면 똑같이 생각 해보자

```js
// 실행 순서
function Foo(name) {
  this.name = name;
}

// 1. 객체 생성 후 해당 객체의 __proto__ 속성과 함수의 prototype 속성을 체이닝 해준다.
const f = new Foo('문석환');

function Foo(name) {
  this.name = name;
  this.__proto__ = Foo.prototype;
}

Foo.prototype.lastName = Foo.prototype;

// f 인스턴스 객체에는 lastName이라는 속성이 없지만 해당 객체의 __proto__와 함수의 prototype을 체이닝 했기 때문에
// 다음인 prototype속성에 접근해 lastName을 찾을 수 있고 존재하므로 'Wow'가 출력된다.
console.log(f.lastName); // 'Wow'
```

현재는 ES6의 Class의 등장으로 잘 사용하지 않는 메커니즘 이지만 Class 자체도 이 메커니즘과 동작하는게 동일하기 때문에

Class의 내부 메커니즘을 이해한다고 생각하고 잘 숙지해 두자

<br>

## 20. 인스턴스

---

<br>

객체 인스턴스를 생성하는 방법에는 클래스를 이용한 방법과 함수를 이용한 방법이 존재한다.

함수를 이용해서 객체 인스턴스를 만들 수 있지만 굳이 ES6에서 클래스를 만들어낸 이유에 대해서 알아보자.

기본적으로 객체 인스턴스를 만들기 위해서는 new 연산자가 필수적으로 필요하다.

### 첫 번째 이유

첫번째 이유는 함수는 new 연산자를 강제할 수 없기 때문이다.

이게 무슨 말이냐면 함수는 new를 붙인 것과 안 붙인 것 모두 동작이 가능하고 클래스는 new를 붙여야만 동작한다.

아래 코드를 살펴보자.

```js
function CartV1() {
  this.cart = [];
  this.currentId = 0;
}

const shoppingCartV1 = new CartV1();
const shoppingCartV1 = CartV1();
```

여기서 코드는 무리없이 동작하는 것을 볼 수 있다. 그러면 뭐가 다른 걸까 ?

이것을 이해하기 위해서는 new 연산자의 암묵적인 수행 메커니즘에 대해서 이해해야 한다.

1. new 연산자 실행
2. {} 빈 인스턴스 객체 생성 -> 함수에서는 this라는 키워드로 접근 가능
3. 함수에서 this를 이용해 필요한 속성을 넣어줌
4. 자동적으로 new 연산자 함수는 모든 수행을 마치고 this 객체를 반환함
5. shoppingCartV1에 this 객체가 들어오게됨

이와 같은 메커니즘으로 인스턴스 객체가 만들어진다.

그렇다면 new 연산자가 없이 실행하게 되면 어떻게 될까 ?

당연히 함수에서의 this는 빈 인스턴스 객체를 가리키는 것이 아니라 전역객체인 window를 가리켜 잘 못된 동작을 하게 될 것이다.

따라서 이것이 Class를 이용하는 첫 번째 이유이다.

### 두 번째 이유

두 번째 이유는 Class를 이용하면 하나로 관리를 할 수 있다는 점이다.

이전의 프로토타입에서 공부 했듯이 new연산자를 이용해서 객체 인스턴스를 생성하게 되면 자동적으로

`객체.__proto__ 와 함수.prototype을 체이닝 해준다.`

그렇기 때문에 객체에서 함수의 속성인 prototype에 접근이 가능하고 사용이 가능하다.

아래의 코드를 살펴보자.

```js
// 함수를 이용한 방법
function CartV1() {
  this.cart = [];
  this.currentId = 0;
}

CartV1.prototype.getNewId = function () {
  this.currentId++;
  return this.currentId;
};

CartV1.prototype.addItem = function (item) {
  this.cart.push({ ...item, id: this.getNewId() });
};

// 인스턴스 객체에서는 사용할 수 없고 함수에서만 접근 가능한 메소드
CartV1.createItem = function (name, price) {
  return {
    name,
    price,
  };
};

const cartV1 = new CartV1();

cartV1.addItem(CartV1.createItem('수박', 8000));
cartV1.addItem(CartV1.createItem('사과', 12000));
cartV1.addItem(CartV1.createItem('두부', 4000));
```

```js
// class를 이용한 방법

class CartV1 {
  static createItem = (name, price) => ({
    name,
    price,
  });
  cart;
  currentId;

  constructor() {
    this.currentId = 0;
    this.cart = [];
  }

  getNewId = () => {
    this.currentId++;
    return this.currentId;
  };

  addItem = item => {
    this.cart.push({ ...item, id: this.getNewId() });
  };
}

const cartV1 = new CartV1();

cartV1.addItem(CartV1.createItem('수박', 8000));
cartV1.addItem(CartV1.createItem('사과', 12000));
cartV1.addItem(CartV1.createItem('두부', 4000));
```

함수로 작성한 코드와 클래스로 작성한 코드 모두 사용하는 부분에서는 똑같이 사용되고 작동한다.

그러나 확실히 Class로 작성한 코드는 모든 메소드와 속성들을 한 곳에서 작성할 수 있다보니 가독성이 뛰어난 것을 볼 수 있다.
<br>

## 21. 컨텍스트

---

<br>

컨텍스트는 2가지가 존재한다.

### Excution Context (실행 컨텍스트)

함수가 호출 될 때 함수 컨텍스트가 생성 되며 호출시 메소드의 소유주에 따라 this가 결정된다.

```js
const person = {
  name:'Moon',
  age:26,
  getAge(){
    return this.age;
  }


console.log(person.getAge()); // 26

const a = person.getAge;

console.log(a()); // undefined
}
```

왜 a에서는 this.age가 존재하지 않는 걸까 ?

함수가 호출될 때 소유주에 따라 this가 결정된다고 했다.

그러니 a()는 소유주를 알 수 없기 때문에 당연히 this.age는 존재하지 않는다.

이를 해결하는 방법은 call과 apply의 사용이 있다.

모든 함수에는 call과 apply를 사용할 수 있는데 이를 이용해 소유주를 모르고도 person객체 this에 접근할 수 있도록 해보자

```js
const a = person.getAge();

a.call(person);
console.log(a()); // 26
```

그러면 클래스로 객체를 생성할 경우에는 어떻게 될까 ?

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.getAge = this.getAge.bind(this);
  }

  getAge() {
    return this.age;
  }
}

const p1 = new Person('moon', 26);

console.log(p1.getAge()); // 26

const myAge = p1.getAge;
console.log(myAge()); // undefined
```

이 경우도 당연히 call을 사용하면 해결해줄수 있다.

그러나 이 방법 말고도 class 생성 시 컨텍스트를 고정시켜주는 방법도 있다.

이것은 함수의 bind를 이용해 해결해준다.

그래서 위 코드와 같이 bind를 이용해 생성자에서 getAge 메소드는 언제 어디서든 호출되더라도

즉, 소유주가 확인이 되지 않더라도 언제나 현재 이 this로 고정시켜줬다.

### Lexical Context (어휘 컨텍스트)

위와 같은 방법으로 해결해 주는 것보다 더 편리한 Lexical Context를 이용하는 방법도 있다.

이 어휘 컨텍스트는 어휘적으로 this를 고정시켜 주는 것이기 때문에 코드상으로 특별한 문법이 필요한데 바로 Arrow Function 이다.

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.getAge = this.getAge.bind(this);
  }

  getAge() {
    return this.age;
  }

  getName = () => this.name;
}

const p1 = new Person('moon', 26);

console.log(p1.getName()); // moon

const x = p1.getName;

console.log(x()); //moon
```

<br>

## 22. 클로저

---

<br>

아래 코드를 보면 어떻게 함수가 return되어 지역변수가 사라지는데 saveNumber에 접근이 가능한 걸까 ?

```js
function increment() {
  let saveNumber = 1;
  return function () {
    return saveNumber++;
  };
}

const inc = increment();

console.log(inc()); // 1
console.log(inc()); // 2
console.log(inc()); // 3
```

일반적으로 함수에서 return이 되면 함수는 종료되며 지역변수 공간도 사라지게 된다.

그런데 inc(); 의 출력값을 보면 1,2,3 정상적으로 작동하는 것을 볼 수 있다.

이것이 가능한 이유가 바로 클로저라는 공간이 있기 때문이다.

함수A가 있고 함수A가 함수B를 리턴하는 경우, 그리고 함수B에서 함수A의 지역변수를 사용하는 경우, 그 지역변수는 클로저라는 공간에 저장되게 된다.

따라서 함수A가 종료되어 지역변수가 사라지게 되더라도 함수B에서는 saveNumber에 접근이 가능한 것이다.

클로저를 사용하게 되면 변수를 외부에서 접근할 수 없도록 보호해줌과 동시에 그 값을 계속해서 사용할 수 있다.

물론 TS에서는 클래스에서 값에 private 키워드를 적어주기만 해도 외부에서 접근 불가능하도록 구현이 가능하지만 JS에서는 이와 같은 기능이 없기 때문에 클로저가 필요하다.

<br>

## 23. 제네릭

---

<br>

타입을 호출하는 순간에 확정하기 위해서 사용되는 기법이다.

```ts
type User = {
  id: number;
  name: string;
};

type Address = {
  zipcode: number;
  address: string;
};

// Arrow Function에서의 제네릭 기법 사용 방법
const pipeObjectOne = <T>(obj: T): T => {
  return obj;
};

let po1 = pipeObjectOne<User>({ id: 1, name: '문' });
let po2 = pipeObjectOne<User>({ id: 2, name: '김', address: '부산시' }); // address부분에 에러표시
```

pipeObjectOne이라는 함수는 호출시에 User 타입을 가지도록 타이핑이 되었기 때문에 인자로 User 타입의 객체만 전달해 줄 수 있고

당연히 po1의 타입도 User 타입이 된다.

이렇게 제네릭을 이용하면 필요에 따라 하나의 함수로 여러가지 타입을 생산할 수 있다.

제네릭은 정말 어려운 기법이고 테크닉이라고 한다. 그리고 정말 테크닉의 종류가 많다고 한다.

기본 제네릭을 충분히 학습하고 난 뒤에 사용해 볼 조금 더 고급형의 제네릭 예시 코드를 보자

### Class에서의 제네릭

```ts
class State<S, Config = {}> {
  private _state: S;
  config: Config;

  constructor(state: S, config: Config) {
    this._state = state;
    this.config = config;
  }

  getState(): S {
    return this._state;
  }
}

let s1 = new State<Address, { active: boolean }>(
  {
    zipcode: 50213,
    address: '부산시',
  },
  { active: true }
);

const s1Data = s1.getState();

console.log(s1Data.zipcode, s1Data.address, s1.config.active);
```

클래스를 사용 할때도 제네릭을 사용할 수 있으며 위 코드는 클래스를 new연산자를 통해 객체 인스턴스를 만들 때

생성자로 전달해 줄 값에 대한 타입을 생성과 동시에 지정해 줄 수 있다.

그리고 당연히 getState 함수로 리턴되는 값 또한 Address 타입이 되므로 s1Data. 에는 Address 속성이 자동적으로 mapping 된다.

이렇게 제네릭을 사용함으로써 얻을 수 있는 장점은 유연하게 타입을 변경할 수 있다는 점이다.

State라는 클래스가 존재하고 이 클래스의 getState 함수로 리턴될 수 있는 타입이 여러가지 라고 가정하면

제네릭을 사용하지 않게 되면 클래스 내부에서 하나하나 수정해줘야 하지만 제네릭을 사용하면 new연산자 코드에서만 타입을 변경해 주면 된다.

### 고급 제네릭 기법 (객체의 Key)

입력 값으로 객체를 주고 그 객체에서 그 객체가 가지고 있는 키 중에 하나를 반환하는 함수를 만든다고 가정해 보자

```ts
// keyof를 통해서 객체의 key들을 뽑아내고 이를 확장시킴
// 따라서 x라는 객체를 전달 받으면 key는 a,b,c,d만을 전달 받을 수 있다.
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

console.log(getProperty(x, 'a')); // 1 출력
console.log(getProperty(x, 'm')); // m이 x 객체에 없다고 에러
```

### 고급 제네릭 기법 (인터페이스)

```ts
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kv1: KeyPair<number, string> = { key: 1, value: 'Kim' };
let kv2: KeyPair<number, number> = { key: 1, value: 12345 };
```

<br>

## 24. @types

---

<br>

@types는 라이브러리를 설치할 때 많이 봐왔을 것이다.

예를 들어서 게시물 객체를 생성한다고 했을 때 해당 id는 Unique 해야 할 것이다.

그래서 라이브러리를 찾다가 uuid라는 라이브러리를 찾고 `npm i uuid`로 설치를 하고 `import {v4} from 'uuid'`를 하게되면

에러표시가 뜨는 것을 볼 수 있다.

이것은 해당 라이브러리가 TS를 지원하지 않기 때문이다.

따라서 이런 경우에는 npm 페이지에서 @types 키워드를 붙여 검색해보면 보통 TS용 라이브러리가 존재 할 것이다.

`npm i @types/uuid` 를 통해서 라이브러리를 설치 해주면 에러 표시가 사라진 것을 볼 수 있다.

<br>

## 24. JSON

---

<br>

JSON은 데이터를 주고 받고 하기 위한 포멧이고 JSON과 JS의 객체는 비슷한 형태를 가진다.

그러나 JSON은 JS의 객체에 비해 엄격한 규칙을 가지는데 다음과 같다.

1 . key와 문자열 value는 반드시 ""로 감싸줘야 한다.
2 . 마지막에는 ,를 지워줘야 한다.
3 . 지원하는 value 타입이 제한적이다. (string,number,array,boolean,object)

### JSON의 형태

```js
const jsonString = `
  {
    "name":"Moon Seok Hwan",
    "age":26,
    "bloodType":"A"
  }
`;
```

### JSON의 데이터를 JS 객체로 변경해주는 방법

```js
const myJson = JSON.parse(jsonString);
```

### JS 객체를 JSON 데이터로 변경해주는 방법

```js
console.log(JSON.stringfy(myJson));
```

JSON은 다음과 같이 규칙이 존재하기 때문에 오류가 발생하기 쉽다.

따라서 오류가 발생했을 때 에러 처리를 해줘야 안전한 웹/앱이 될 수 있다.

이는 예외 처리 구문 try-catch를 사용해줘 처리해주면 된다.

<br>

## 25. 라이프 사이클과 스코프

---

<br>

스코프는 전역 스코프,함수 스코프,블록 스코프가 있다.

함수 스코프는 함수가 생성되었을 때 생기며 블록 스코프는 코드를 묶는 블록 {}이 있으면 생긴다.

그러나 함수 스코프와 블록 스코프가 계속해서 존재하지는 않는다.

예를 들어 함수 스코프는 함수가 리턴이 되는 순간 스코프가 사라진다.

그리고 블록 스코프는 코드를 묶는 블록에서 벗어나면 스코프가 사라진다.

그러므로 스코프 공간에서 생성되는 함수나 변수는 스코프와 삶을 함께한다.

즉 스코프가 사라지면 해당 함수나 변수도 사라지게 된다.

JS가 이러한 메커니즘을 가진 이유는 컴퓨터의 자원이 유한한 자원이기 때문이다.

변수와 함수를 생성하고 사용된 후 더 이상 사용되지 않지만 계속해서 공간을 차지하고 있으면 효율적이지 않다.

따라서 스코프의 생성과 제거에 따라서 변수와 함수도 생성되고 제거 될 수있도록 디자인 되어져 있다.

### 스코프의 특징

스코프는 중첩이 가능하다.

전역 스코프가 존재 하고 그 안에 함수 스코프와 블록 스코프가 만들어진다.

스코프가 중첩 되어졌을 때 안쪽 스코프에서는 바깥쪽 스코프의 자원을 사용 할 수 있지만 바깥쪽에서 안쪽 스코프를 사용할 수는 없다.

```js
let x = 10;

function test() {
  let y = 20;
  console.log(y); // 20
  console.log(x); // 10
  return y;
}

console.log(y); // y is not defined

console.log(test()); // 20
```

현재 위 코드는 전역 스코프 안에 test 함수 스코프가 있는 구조 이다.

따라서 test 함수 스코프 내에서는 전역 스코프의 x를 사용 할 수 있지만

전역 스코프에서는 함수 스코프 내의 y를 사용 할 수 없다.

### 호이스팅

스코프가 생성이되면 해당 스코프 내부에 있는 모든 자원을 미리 만들게 된다.

이것이 바로 호이스팅 이다.

```js
foo(); // 무리 없이 호출 됨 -> 호이스팅으로 미리 만들었기 때문에
zoo(); // 함수표현식에서는 사용 불가
function foo() {
  console.log('foo');
}

const zoo = function () {
  console.log('zoo');
};
```

따라서 가독성이 좋은 코드를 만들기 위해서는 호이스팅이 되더라도 반드시 후에 호출하는 습관을 들이는게 좋다.

<br>

## 26. 동기와 비동기

---

<br>

동기 코드란 우리가 계속해서 사용해 왔던 코드들이 대부분 동기 코드이다.

```js
function double(x) {
  return x * 2;
}

const x = double(2);
const y = x;
```

위 코드를 보면 x의 값이 함수를 통해 확정이 되어야 그다음 코드가 진행될 수 있는 것을 볼 수 있다.

이렇게 순서대로 코드가 진행되는 것을 동기 코드라고 한다.

그러면 비동기 코드는 무엇일까 ?

비동기 코드는 앞의 코드가 실행되든 안되든 상관하지 않고 뒤의 코드가 실행 될 수 있는 코드 이다.

비동기 코드를 이해해보기 위해 setTimeout 함수를 사용해보자

```js
function calcValue(x, y) {
  setTimeout(() => {
    return x + y;
  }, 100);
}

const x = calcValue(10, 20);
const y = x;
```

동기 코드라면 x의 값이 계산되어 30이라는 값이 들어오고 이 30을 y에 전달해 줄 것이다.

그러나 구현한 setTimeout은 0.1초 뒤에 실행되는 코드이다.

그래서 return x+y는 코드들이 순식간에 지나간 후 0.1초 뒤에 실행되기 때문에

순식간에 실행되는 x에는 undefined가 들어오게 된다.

x라는 메모리 공간을 만들었지만 calcValue()를 통해 값을 받지 못했기 때문이다.

따라서 y에는 undefined라는 값이 들어온다.

이렇게 코드의 실행흐름이 맞지 않는 이러한 코드가 바로 비동기 코드이다.

따라서 이러한 비동기 코드의 문제점을 해결하기 위해 함수에 callback 함수를 인자로 전달해줘 callback 함수에서 최초 함수의 자원을 전달 받아 사용할 수 있다.

근데 만약 이러한 비동기 코드가 여러개여서 콜백 함수를 여러번 사용한다고 가정해보자.

정말 가독성이 떨어지는 코드를 볼 수 있을 것이다.

그래서 ES6에서 콜백 지옥에서 탈출 하기 위해서 Promise라는 함수를 만들었다.

Promise는 인스턴스 객체를 만들어 내는 함수로써 인자로 resolve와 reject를 받는다.

resolve는 해당 비동기 코드가 성공적(fulfill)일 때 사용되고 실패 할 때는 reject가 사용된다.

이때 resolve와 reject의 인자로 값을 전달 해 줄수 있고 이를 다음 콜백 함수에서 전달 받을 수 있다.

그리고 인스턴스 객체는 then,catch,finally 라는 메소드를 가진다.

then은 resolve 됬을 때 실행되는 메소드이고 catch는 reject 됬을 때 실행,

마지막으로 finally는 성공,실패 관계없이 실행되는 메소드 이다.

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

p.then(ok => {
  console.log(ok); // 1초 뒤 success 출력
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('fail');
    }, 1000);
  });
})
  .then(ok => {
    console.log(ok);
  })
  .catch(error => {
    console.log(error); // 총 2초 후 fail 출력
  })
  .finally(() => {
    console.log('finish'); // 총 2초 후 finish 출력
  });
```

<br>

## 27. DOM

---

<br>

DOM은 문서 객체 모델(Document Object Model)을 뜻한다.

DOM API를 이용해서 html문서를 직접적으로 조작할 수 있다.

간단한 웹어플리케이션에서는 괜찮겠지만 조금 규모가 큰 프로젝트에서 DOM API를 사용하게 되면 가독성이 매우 떨어지게 된다.

그리고 DOM API는 너무 방대하다. 따라서 실무에서는 DOM 사용하는 것을 추천하지 않는다고 한다.

그러나 DOM의 개념과 구조에 대해서는 알고 있어야 프론트엔드 개발자로서 성장하는데 어려움이 없다고 한다.

<br>

## 28. 이벤트 시스템

---

<br>

이벤트는 중첩되었을 때 캡처링과 버블링의 방식으로 전파 될 수 있다.

코드를 보면서 알아가 보자

```js
// index.html

<div class="box1" data-name="red">
  <div class="box1" data-name="blue">
    <div class="box1" data-name="yellow"></div>
  </div>
</div>;

// js

function main() {
  const BUBBLING_PHASE = false;
  const CAPTURING_PHASE = true;
  const PHASE_NAME = ['NONE', 'CAPTURING', 'TARGET', 'BUBBLING'];

  function eventLogger({ target, currentTarget, eventPhase }) {
    console.log(eventPhase);
    console.log(`${target.dataset.name} ${currentTarget.dataset.name} ${PHASE_NAME[eventPhase]}`);
  }

  let divs = document.querySelectorAll('div');
  divs.forEach(div => div.addEventListener('click', eventLogger, BUBBLING_PHASE));
}

document.addEventListener('DOMContentLoaded', main);
```

### DOMContentLoaded

초기 html 문서를 다 로드하고 난 후에 발생하는 이벤트이다.

따라서 다 로드된 후에 main 함수를 호출한다.

### CAPTURING 과 BUBBLING

캡쳐링과 버블링은 이벤트가 발생하는 흐름을 설정하는 방법이다.

CAPTURING과 BUBBLING은 addEventListener 메소드의 3번째 인자에 전달해 줄 수 있다.

default 값은 false로 BUBBLING 흐름에 따라 이벤트가 처리된다.

BUBBLING인 경우에는 마치 탄산수의 탄산이 아래부터 위로 올라가는 것 처럼 Target 객체부터 부모,조부모... 로 올라 가면서 이벤트가 처리되는 흐름이다.

가장 안쪽 박스인 yellow 박스를 처리하면 다음과 같이 출력된다.

```js
yellow yellow TARGET
yellow blue BUBBLING
yellow red BUBBLING
```

target인 yellow부터 마지막 조상인 red까지 역순으로 이벤트가 처리되는 것을 볼 수있다.

CAPTURING은 그와 반대로 최상위 부모부터 Target으로 가는 순서로 이벤트가 처리된다.

```js
yellow red CAPTURING
yellow blue CAPTURING
yellow yellow TARGET
```

그리고 click 이벤트로 호출되는 함수는 e라는 이벤트 객체를 전달 받는다.

이벤트 객체에는 해당 이벤트에 관한 무수히 많은 정보들이 담겨 있다.

우리가 사용한 정보는 target,currentTarget,eventPhase이다.

target은 현재 내가 클릭한 객체를 뜻하고 currentTarget은 이벤트 흐름에 따라 발생하는 현재 객체를 뜻한다.

마지막으로 eventPhase는 0~3까지의 숫자를 가지며 그 중 하나의 값을 가진다.

- 0 : NONE -> 아무 발생 하지 않음
- 1 : Capturing Phase
- 2 : Target -> 이벤트가 event.target에 도착
- 3 : Bubbling Phase

### 이벤트 루프란 ?

이벤트 루프에 대해서 이해하기 위해서는 전체적인 흐름을 파악해야한다.

이벤트 루프는 딱 한가지의 일을 한다.

바로 Call Stack과 Event Queue를 주시하면서 Call Stack이 비었을 때 Event Queue에 있는 cb함수가 있다면 해당 함수를 call stack으로 전달해준다.

기본적으로 함수는 호출 시 call stack에 쌓이고 끝나면 빠져나간다.

```js
function foo() {
  console.log('foo');
}

function zoo() {
  foo();
}

zoo();
```

이렇게 코드가 구현됬다고 하면 call stack에는 zoo() > foo() > console.log('foo')순서대로 call stack에 쌓이고 console.log 부터 역순으로 빠져나간다.

이것은 stack의 LIFO(Last In First Out) 특성을 가지기 때문이다.

이런 동기적 코드들은 call stack에서만 처리가 이루어진다.

비동기적 코드가 발생했을 때 call stack에 쌓이고 비동기 함수는 web apis엔진에서 처리가 된다.

그리고 처리가 끝나면 해당 cb함수는 event queue에 들어가게 된다.

코드의 모든 비동기 코드에 대한 cb함수가 순서대로 들어가고 FIFO의 특성을 살려 먼저 들어온 순서대로 나간다.

event loop는 항상 call stack 과 event queue를 주시하고 있으며 call stack이 비워졌을 때

event queue에 cb함수가 존재한다면 순서대로 call stack으로 올려준다.

event queue에 cb함수가 여러개 들어와 있다면 맨 처음 함수를 먼저 보내고 해당 함수가 끝나서 또 call stack이 비워지면 다음 cb함수가 올라간다.

<br>

## 29. 타입스크립트의 명확한 한계

---

<br>

타입스크립트는 우리에게 컴파일 환경 즉 에디터 환경에서 모든 타입체킹을 통해서 컴파일 에러를 보여주는 역할을 한다.

그러나 결국 타입스크립트도 자바스크립트에서 파상된 언어이므로 결국에는 자바스크립트로 변환해 줘야 브라우저는 인식한다.

```ts
// ts
const objType = {
  x: number,
  y: number,
};

function add(x: number, y: number): number {
  return x + y;
}

const json = `{"x":10,"y":20}`;
const obj: objType = JSON.parse(json) as objType;

add(obj.x, obj.y);

// js로 변환된 코드

('use strict');

function add(x, y) {
  return x + y;
}
const json = `{"x":10,"y":20}`;
const obj = JSON.parse(json);
obj(obj.x, obj.y);
```

이렇게 ts로 타이핑한 부분에 대해서는 모두 사라지는 것을 볼 수 있다.

그런데 여기서 외부로 들어오는 데이터가 "x":"abc" 이렇게 들어오게 된다면 이는 런타임 환경에서 발생한 에러이기 때문에 타입스크립트가 도와줄 수 있는게 아무것도 없다.

add 함수를 통해서 30이라는 값이 나와야 하는데 abc20이라는 문자열이 생기게 되고 이를 이용하는 또 다른 함수에서도 당연히 문제가 생기게 될 것이다.

그래서 어떤 데이터를 받고 그 데이터를 함수로 넘겨줄 때 어떤 식으로 방어 코드를 쓸 수 있을까에 대해서 항상 고민하고 연구해서 경험을 쌓는 것이 중요하다.

<br>

## 30. Web API

---

<br>

많이 사용되는 API에 대해서 알아보자

### 1 . localStorage & sessionStorage

이 두 Storage가 가장 많이 사용된다.

둘다 가지고 있는 메소드가 동일하므로 사용법이 동일하다.

- localStorage.setItem()
- localStorage.getItem()
- localStorage.removeItem()
- localStorage.clear()

차이점

- localStorage는 자바스크립트 코드로 clear하거나 remove하기 전에 삭제되지 않는다.

- 그에 반면 sessionStorage는 브라우저가 종료되는 순간 모두 삭제 된다.

#### Storage를 사용할 때 주의할 점 ❗️

저장할 때 반드시 문자열로 저장을 해야한다.

즉 객체로 저장되지 않기 때문에 반드시 json 문자열로 변경해준 후에 저장을 해주고

해당 데이터를 가져와 사용 할 때는 다시 객체로 변경해준 후에 사용해야 한다.

### 2 . History API

브라우저에서 사용자가 사이트에서 이동한 정보를 담고 있는 API 이다.

### 3 . Canvas API

JS와 HTML `<canvas>` Element를 통해 그래픽을 그리기 위한 수단을 제공해준다.

굉장히 광범위한 2D 그래픽을 제공한다.

<br>

## 31. 폴리필

---

<br>

트랜스 파일링 환경에서 개발이 진행도니다.

기본적으로 브라우저에서 지원하지 않는 자바스크립트 기능을 지원할 수 있는 코드로 변환하는 일을 하는게 Babel이다.

그런데 어떻게 이것이 가능할까요 ?

바로 기존의 자바스크립트코드로 상위의 자바스크립트 코드의 기능을 대신 구현하는 것이다.

이러한 개념을 바로 폴리필이라고 한다.

예를 들어 map이라는 함수를 지원하지 않는 브라우저에서도 동작할 수 있도록 직접 map 함수를 구현해보자.

```js
Array.prototype.MyMap = function (cb) {
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    arr.push(cb(this[i]));
  }
  return arr;
};

const a = [1, 2, 3, 4].MyMap(n => n * 2);
console.log(a); // [2,4,6,8]
```

<br>

## 32. 형태의 변환 - 객체를 문자열로 변환하기

---

<br>

### 원시적인 방법

배열과 관련된 메소드들이 나오기 전에는 for문을 이용해서 처리를 해주었다.

```js
const cartItems = [
  { id: 1, item: '핸드밀', price: 40000, discount: 0 },
  { id: 2, item: 'A4용지', price: 4000, discount: 0 },
  { id: 3, item: '수영복', price: 120000, discount: 0 },
  { id: 4, item: '색연필72색', price: 140000, discount: 0 },
];

const cartItemArray = [];

for (const obj of cartItems) {
  const row = [];
  for (const [, value] of Object.entries(obj)) {
    row.push(String(value));
  }
  cartItemArray.push(row.join());
}

console.log(cartItemsArray.join('===')); // '1,핸드밀,40000,0===2,A4용지,4000,0===...'
```

이렇게 이중 for문을 사용해서 객체들을 하나의 문자열로 변환해주었다.

### Object.entries(obj)

Object의 entries 메소드는 인자로 전달받은 객체에 접근해서 각 요소를 [[key,value],...] 형태로 변경해준다.

위 코드를 예로 들자면 `[['id',1],['item','핸드밀'],['price',40000],['discound',0]]`로 변경이 된다.

### 배열 메소드를 이용한 방법

```js
const extractValueInObject = obj => Object.entries(obj).map(([, value]) => String(value));

const cartItemsString = cartItems.map(extractValueInObject).join('===');
```

이렇게 배열 메소드를 활용하면 더 직관적인 코드를 작성할 수 있다.

map을 이용해 새로운 배열을 만들어내고 join을 통해서 하나의 문자열로 만들어줬다.

<br>

## 33. 형태의 변환 - 문자열을 형태가 다른 문자열로 변환하기

---

<br>

### 배열 연산을 이용한 코드

```js
const simpleCamel = (name, splitter = ' ') =>
  name
    .split(splitter)
    .map((word, wi) =>
      word
        .split('')
        .map((char, ci) => (wi > 0 && ci === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join('')
    )
    .join('');

const camelName = simpleCamel('MOON SEOK HWAN');
console.log(camelName); // 'moonSeokHwan'
```

### 반복문을 이용한 코드

```js
const convertCamelName = name => {
  let camelName = '';

  for (let i = 0, newSpace = false; i < name.length; i++) {
    if (name[i] === ' ') {
      newSpace = true;
      continue;
    }

    if (newSpace) {
      camelName = camelName + name[i].toUpperCase();
      newSpace = false;
    } else {
      camelName = camelName + name[i].toLowerCase();
    }
  }

  return camelName;
};

const camelName = convertCamelName('moon seok hwan');
console.log(camelName); // 'moonSeokHwan'
```

> 어떤 방법이 더 좋고 나쁘다 이런 건 없고 스타일의 차이이니 둘 다 연습해두자.

<br>

## 34. 형태의 변환 - 문자열 변환 고급 기법 - 템플릿

---

<br>

### Template Literal

템플릿 리터럴은 ES6에서 도입된 문자열 표기법이다.

문자열 생성시 따옴표 대신, 백틱(`)을 사용한다.

이를 사용하게 되면 문자열에 ${}을 사용해 쉽게 데이터(값)을 추가해줄 수 있다.

${} 안에는 최종적으로 값이 될 수 있으면 되므로 변수,함수,객체,배열 등을 전달 할 수 있다.

```js
const person = {
  name: 'moon',
  age: 26,
};

console.log(`Hi, my name is ${person.name}!`);
console.log(`Hi, my age is ${person.age}!`);
```

### Tagged Template Literal

이 템플릿 리터럴을 활용한 Tagged Template Literal 문법이 있다.

이 문법은 직접 구현해서 사용하는 경우는 흔치 않지만 이미 여러 라이브러리에서 활용하고 있어 쉽게 접할 수 있다.

Tagged Template Literal은 함수 형태로 사용할 수 있다.

함수 형태로 전달 되며 2개의 파라미터를 가지는데 정적 데이터 배열과 동적 데이터 배열이다.

아래 코드를 보면서 이해해보자.

```js
const div = (strings, ...fns) => {
  const flat = s => s.split('\n').join('');
  return function (props) {
    return `<div style="${
      flat(strings[0]) +
      (fns[0] && fns[0](props)) +
      flat(strings[1]) +
      (fns[1] && fns[1](props)) +
      flat(strings[2])
    }"></div>`;
  };
};

// div라는 함수에 ()로 인자를 넣는게 아니고 ``을 이용한다.

const Div = div`
  font-size:30px;
  color:${props => (props.active ? 'white' : 'gray')}
  border:none;
  background-color:${props => (props.active ? 'red' : 'blue')}
  font-family:700;
`;

console.log(Div({ active: true }));
```

### 두개의 파라미터

두개의 파라미터가 전달 되는데 첫번째 파라미터는 ``안의 문자열을 ${}을 기준으로 자른 배열이 들어오고

두번째 파라미터는 ${}로 전달된 값이 배열로 만들어져 들어온다.

즉 위 코드에서 `console.log(strings);`을 하면 `['\n font-size:30px;\n color:', '\n border:none;\n background-color:', '\n font-family:700;\n']`가 출력되고

`console.log(fns);`을 하면 `[ [Function], [Function] ]`이 출력된다.

이렇게 전달되는 값을 활용해서 굉장히 파워풀한 동작을 하는 함수를 만들었다.

props로 전달되는 객체 active의 값에 따라 css가 변경되는 것을 볼 수 있다.

### Styled-components

우리가 Tagged Template Literal을 직접 구현해서 사용하는 경우는 거의 없을 테지만 우리는 이미 많은 라이브러리에서 이를 접할 수 있었다.

대표적으로 Styled-components에서 사용 하고 있다.

```js
const Header = styled.div`
  width: 1200px;
  height: 100px;
  ${props =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;
```

Tagged Template Literal을 알고난 후에 이 코드를 보면 어떻게 동작하는지에 대해서 예상 해볼 수 있다.

styled에 div라는 메소드가 있고 이 메소드도 파라미터로 정적 데이터 배열과 동적 데이터 배열을 가질 것이다.

정적 데이터 배열에는 `['\n width:1200px;\n height:100px;']`이 들어있고

동적 데이터 베열에는 `[ [Function] ]`이 들어 있을 것이다.

따라서 Header Component를 생성할 때 props로 어떤 테마를 전달 받느냐에 따라 다른 css를 전달해 줄 수 있다.

<br>

## 35. 형태의 변환 - 객체를 형태가 다른 객체로 변환하기

---

<br>

sourceGroup의 기존 객체를 targetGroup과 같은 구조의 객체로 변환해보자.

## 이 코드를 이해하기 위해서는 map,reduce와 같이 배열 연산자를 많이 사용해보고 익숙해져야 할 것같다

```js
const sourceGroup = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

const targetGroup = {
  aGroup: {
    a: 1,
    b: 2,
  },
  bGroup: {
    c: 3,
    d: 4,
    e: 5,
  },
};

const groupInfo = {
  aGroup: ['a', 'b'],
  bGroup: ['c', 'd', 'e'],
};

function makeGroup(source, info) {
  const merge = (a, b) => ({ ...a, ...b });
  return Object.keys(info)
    .map(group => ({
      [group]: info[group].map(k => ({ [k]: source[k] })).reduce(merge, {}),
    }))
    .reduce(merge, {});
}

console.log(makeGroup(sourceGroup, groupInfo));
```

### 위 코드에 대해 알아보자

- `Object.keys(obj)` : 전달 받은 객체의 key들을 각각 문자열로 변환해 배열에 담아주는 헬퍼 함수이다.
- computed property의 사용 : 객체를 생성할 때 속성을 문자열로 만들기 위한 방법이다.
- `{['a'] :1}` = `{a:1}`
- map과 computed property를 활용해 객체를 만들고 해당 객체를 요소로 하는 배열을 만들었다.
- reduce를 이용해 각 요소가 객체인 배열을 하나의 객체로 변환

<br>

## 36. 형태의 변환 - 문자열을 객체로 변환하기

---

<br>

Template Literal을 이용해 문자열로 DB를 만들었고 이를 객체로 바꿔보고자 한다.

```js
const movieData = `Title,Release,Ticketing Rate,Director
보헤미안 랩소디,2018.10.31,11.5%,브라이언 싱어
완벽한 타인,2018.10.31,4.6%,이재규
동네사람들,2018.11.07,0.5%,임진순`;
```

위와 같은 소스 코드를 생성자로 받는 HeaderListData 클래스와 이를 상속 받는 MakeObject 클래스를 만들 것이다.

여기서 HeaderListData는 문자열을 배열로 바꾸는 것에 중점을 뒀고 MakeObject에서 해당 배열을 객체로 바꿔준다.

```js
class HeaderListData {
  constructor(source, separator = ',') {
    const rawData = source.split('\n');
    this.headers = rawData[0].split(separator);
    this.rows = rawData.filter((row, index) => index > 0).map(row => row.split(separator));
  }
  row = index => this.rows[index].map((row, index) => [this.headers[index], row]);

  get length() {
    return this.rows.length;
  }

  get columnLength() {
    return this.headers.length;
  }
}

class MakeObject extends HeaderListData {
  toObject = index => this.row(index).reduce((a, [key, value]) => ({ ...a, [key]: value }), {});

  toAllObject = () =>
    Array(this.length)
      .fill(0)
      .map((row, index) => this.toObject(index));
}

const movieData = `Title,Release,Ticketing Rate,Director
보헤미안 랩소디,2018.10.31,11.5%,브라이언 싱어
완벽한 타인,2018.10.31,4.6%,이재규
동네사람들,2018.11.07,0.5%,임진순`;

const movieList = new MakeObject(movieData);

console.log(movieList.toAllObject());
// 0: {Title: '보헤미안 랩소디', Release: '2018.10.31', Ticketing Rate: '11.5%', Director: '브라이언 싱어'}
// 1: {Title: '완벽한 타인', Release: '2018.10.31', Ticketing Rate: '4.6%', Director: '이재규'}
// 2: {Title: '동네사람들', Release: '2018.11.07', Ticketing Rate: '0.5%', Director: '임진순'}
```

### 문자열에서 사용하는 split 메소드

split 메소드는 문자열을 분할하여 배열로 변환하는 메소드이다.

> 문법

`string.split(separator,limit)`

separator에는 구분자를 넣어주고 limit은 최대 분할 개수를 넣어준다.

단, 둘 다 필수적으로 넣어줘야하는 인자는 아니다.

limit을 넣어주지 않게 되면 모두 분할 해버리고 separator을 넘겨주지 않으면 분할하지 않는다.

```js
// 아무 인자도 전달하지 않는 경우
const name = '문 석 환';
console.log(name.split()); // ['문 석 환']

// 구분자를 전달하는 경우이며 현재 문자열이 공백으로 구분되어져 있으므로 구분자로 ' '을 넣어준다.
console.log(name.split(' ')); // ['문','석','환']

// 구분자와 limit을 넣는 경우
console.log(name.split(' ', 1)); // ['문']
```

### for문 대신 사용하는 테크닉

위 코드에서 toAllObject 메소드를 보면 궁극적인 목적은 배열의 각 요소를 순회하면서 객체로 변환해주는 것이 목적이다.

그러면 반복문이 제일 먼저 떠오르고 물론 위 코드를 for문으로 변경해주고 변경한 객체를 새로만든 배열에 push해주는 방법도 가능하다.

코드를 작성하는 것은 정답이 없고 자기의 스타일대로 더 가독성이 좋은 방법으로 코드를 진행하면 된다.

그래서 선택한 방법은 빈 배열을 만들어주고 map 메소드를 통해 순회하는 방법이다.

`Array(this.length)`를 통해 empty요소 3개를 가진 배열을 만들었다.

그러나 empty요소라 map을 사용할 수 없었고 때문에 `Array.prototype.fill()` 메소드를 사용해 각 요소에 0을 넣어줬다.

이렇게 하나의 기능을 구현하는 것도 여러가지 방법으로 구현해보는 연습을 하면 나만의 코딩 스타일을 확정하는데도 도움이 되고 실력 향상에도 도움이 될꺼 같다.

<br>

## 37. 형태의 변환 - 객체의 병합(Merge)

---

<br>

객체는 참조용이기 때문에 객체가 이동할 때 원본 데이터가 그대로 다른 데이터로 만들어지는 것이 아니고

원본 데이터의 위치 값만 이동하기 때문에 실제로 복사된 것 같지만 복사되지 않고

복사된 객체의 데이터를 변경했더니 원본 데이터까지 변경이 되는 버그를 마주할 수 있다.

따라서 이러한 메커니즘을 잘 이해하며 객체를 병합해야한다.

먼저 깊은 복사와 얕은 복사에 대해 알아보자

### 깊은 복사 & 얕은 복사

깊은 복사와 얕은 복사는 원본 객체와의 연결을 끊고 새로운 객체를 만들어 낸다는 것은 동일하지만 범위가 다르다.

깊은 복사는 원본의 depth에 상관없이 원본과의 연결을 끊고 새롭게 만들어내지만

얕은 복사는 원본의 1depth 까지만 원본과의 연결을 끊은 객체를 만들고 2depth 부터는 참조가 이루어진다.

아래의 깊은 복사 하는 테크닉과 얕은 복사 하는 테크닉을 보면서 이해해보자.

얕은 복사

- Object.assign(copyObj,targetObj)
- Spread Operator {...obj}

깊은 복사

- JSON 문자열로 변경해줬다가 다시 객체로 변환해주는 테크닉
- 깊은복사 함수를 직접 구현하는 방법

```js
function toCloneObject(obj) {
  let clone = {};

  for (let key in obj) {
    // key = a,b
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clone[key] = toCloneObject(obj[key]);
      // clone['b'] = toCloneObject({c:1}) -> clone['c'] = obj['c'] -> {c:1} -> b:{c:1}
    } else {
      clone[key] = obj[key];
      // clone['a'] = obj['a'] -> clone = {a:1}
    }
  }
  return clone; // {a:1,b:{c:1}}
}
```

### 객체의 병합

1. 기존의 객체의 속성을 그대로 가져가고 몇가지 속성만 덮어씌워 주는 패턴

```js
const person = {
  name: 'moon',
  home: {
    address: '부산시 동구',
    addNumber: 48804,
  },
};

const newObject = {
  ...toCloneObject(person),
  home: {
    addNumber: 49902,
  },
};

console.log(newObject); // {name:'moon',home:{address:'부산시 동구',addNumber:49902}}
```

2. DefaultStyle을 만들고 해당 기본스타일을 가지는 css 속성 객체를 새로 만드는 패턴

```js
const defaultStyle = {
  color: '#fff',
  fontSize: 14,
  fontWeight: 500,
};

function createParagraph(config) {
  config = { ...defaultStyle, ...config };
  return config;
}

const newObject = createParagraph({ fontSize: 16 });

console.log(newObject); // {color:'#fff',fontSize:16,fontWeight:500}
```

<br>

## 38. 도구 - Chrome Debugger

---

<br>

Chrome Debugger을 이용하는 방법에 대해서 알아보자.

Chrome Debugger 익스텐션은 미리 설치가 되어있어야 한다.

설정해줘야 하는 json파일이 2가지 존재한다.

- `.vscode/launch.json`
- `.vscode/tasks.json`

```json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Debug App",
      "preLaunchTask": "parcel webapp", // 연결할 task 이름
      "url": "http://localhost:1234", // index.html이 로드되는 url
      "webRoot": "${workspaceFolder}/dist" // parcel.js를 이용해 빌드되기 때문에 dist와 연결해준다.
    }
  ]
}
```

```json
// tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "parcel webapp", // 해당 task의 이름 (launch에서 연결해줄 이름임)
      "type": "shell", // 터미널 사용
      "command": "parcel index.html", // 이 task가 할 명령어
      "isBackground": true
    }
  ]
}
```

<br>

## 39. 도구 - RESTFUL

---

<br>

## HTTP

HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜이다.

### HTTP는 상태가 없지만, 세션은 있습니다

HTTP는 비동기 프로토콜 기반이기 때문에 상태가 없습니다.

따라서 로그인 API에 아이디,비밀번호를 전달해줬지만 특별한 처리를 해주지 않으면

다음 페이지에 갔을 때 로그인 했다는 정보를 기억하지 못한다.

요청이 오면 요청을 응답하고 연결을 바로 끊어버린다.

## REST API

4개의 HTTP 동사와 url을 가지고 어떠한 의미를 만들어내는 프로토콜이 REST API이다.

### HTTP methods

- GET
- POST
- PUT
- DELETE

## Reference

- <https://axios-http.com>
- <https://randomuser.me/api>

- <https://postcode.map.daum.net/guide>
- <https://www.slideshare.net/ibare/ss-39274621>
- <https://regexr.com>

- <https://dev.to/kaykaycodes/7-days-of-css-graphics-and-animations-15e4>
- <https://codepen.io/towc/pen/mJzOWJ>
- <https://webglsamples.org/field/field.html>
- <https://docs.npmjs.com/about-semantic-versioning>
- <https://rollupjs.org/guide/en/>
- <https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88>

- <https://www.typescriptlang.org/docs/handbook/interfaces.html>
- <https://www.typescriptlang.org/docs/handbook/2/everyday-types.html>
- <https://www.typescriptlang.org/docs/handbook/2/types-from-types.html>
