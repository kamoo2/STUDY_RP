# JS의 문법에 대해서 정리해보는 DIR 입니다.

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

let age = addAge("30");

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

### 1. 같은 이름의 변수를 여러번 생성가능하다.

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

### 3. block scope를 철저히 무시한다.

<br>

var을 block 안에서 선언했음에도 block 밖에서 출력이 가능하다.

```js
{
  var age = 8;
}
console.log(age); // 8 출력
```

이렇게 var을 남발하게 된다면 나중에 선언하지 않은 값이 멋대로 출력된다던지 여러가지 문제점이 발생할 수 있다.

### let과 const의 공통점과 차이점

1. 공통점

- 중복 선언할 수 없다.
- 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

2. 차이점

- const는 선언과 동시에 초기화가 이루어 져야 하며 let은 선언 단계와 초기화 단계가 분리되어 진행될 수 있다.
- const는 재할당이 불가능 하며, let은 재할당이 가능하다. (변수와 상수의 차이)
- const에서 객체를 할당하게 되었을 때는 객체 자체를 변경할 수는 없지만 속성값을 변경하는 것은 가능하다.

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
const colors = ["red", "green", "blue"];
const red = colors[0];
const green = colors[1];
const blue = colors[2];

const Colors = {
  black: "black",
  yellow: "yellow",
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
    console.log("??");
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
const arr = ["a", "b", "c", "d"];
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
  colors: "red",
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
  throw new Error("Error");
}

function noException() {
  return true;
}

function callException(type) {
  if (type === "do") {
    doException();
  } else {
    noException();
  }
}

function main() {
  try {
    callException("do");
  } catch (e) {
    console.log(e); // Error 출력
  } finally {
    // 예외가 일어나든 안일어나든 반드시 실행되어야 할 코드를 작성해주면 된다.
    console.log("done");
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
const monday: string = "월";
// friday에 안녕이라는 문자열이 들어오는 것은 실수이고 이를 제한해 안정성을 높여주자
const friday: string = "안녕";

// Type Alias로 DayOfWeek라는 타입을 만들어 준다.

type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

// DayOfWeek 타입에는 "안녕" 이라는 문자열이 들어올 수 없다고 에러 표시가 뜬다.
const friday: DayOfWeek = "안녕";
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
import * as allTypes from "./types";
const iUser: allTypes.IUser = {
  id: 1,
  name: "Moon",
  email: "tjr@naver.com",
  active: "Y",
};

const tUser: allTypes.TUser = {
  id: 2,
  name: "Kim",
  email: "kim@naver.com",
  active: "N",
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

const getApi: ArrowTGetApi = (url, search = "") => {
  return new Promise((resolve) => resolve("OK"));
};

const getApi: TGetApi = function (url, search = "") {
  return new Promise((resolve) => resolve("OK"));
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
