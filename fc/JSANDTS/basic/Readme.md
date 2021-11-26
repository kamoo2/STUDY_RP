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
