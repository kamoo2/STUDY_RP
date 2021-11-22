type Box = {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
  borderWidth?: number;
  ['className']?: string;
};

// 객체 리터럴 (객체 생성 표기법)
let box: Box = {
  width: 200,
  height: 200,
  borderRadius: 5,
  backgroundColor: 'red',
};

// 함수를 이용한 방법 (객체 리터럴)
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

// 이 둘은 구조의 차이를 가진다.
// 함수를 이용한 방법은 객체의 틀(규격)과 데이터를 분리한다.

// 그렇다면 왜 객체의 규격과 사용하는 데이터를 분리하는게 중요할까 ?
// 만약 500개의 Box를 만들어야 한다고 가정하자
// 당연히 모든 박스의 속성값은 다양할 것이다.
// 직접 모든것을 치는 방법으로 500개를 만들고, 함수를 이용해서 500개를 만들었다.
// 여기서 만약에 객체의 borderRadius속성을 radius로 변경해야 한다고 하면 어떻게 될까 ?
// 첫번째 방법으로 했을 때는 500개의 모든 borderRadius 속성을 다 변경해줘야 할것이고
// 함수를 이용한 방법은 객체의 규격인 함수에 접근해 속성명을 변경해주기만 하면 될 것이다.

makeBox(100, 100, 0, 'blue');

// 클래스를 이용한 객체 생성

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

// 클래스가 생성한 인스턴스 객체
// 여기서 인스턴스 객체라고 하는 이유는 클래스는 구성 정보를 가지고 있고
// 이를 실제로 현실화한 객체라는 의미로 인스턴스 객체라고 부른다.
const boxShape = new Shape(10, 10, 0, 'blue');

if (boxShape instanceof Shape) {
}
box.borderWidth = 10;
box['className'] = 'box rounded';

// 객체는 참조 타입이기 때문에 상수에 객체를 전달해준다고 해서 서로 다른 객체를 바라보지 않는다.

// 이렇게 해준다고 해서 서로 다른 객체 2개가 되지 않는다.
// 그냥 box1,box 모두 하나의 객체를 참조하고 있을 뿐이다.
const box1 = box;

// 그러면 해당 객체를 참조하는 것이 아닌 새로운 객체를 만들기 위해서는 어떻게 해야할까 ?
// 총 3가지 방법이 있다.

const box2 = Object.assign({}, box);
// Object.assign은 첫번째 인자로 변경될 객체를 전달 받고 그 뒤로는 가변인자로 여러개의 객체를 받을 수 있다.
// 그러면 순서대로 2번째 인자부터 첫번째 인자에 덮어씌워 진다.
// 현재는 {} 빈 객체에 box라는 객체를 덮어 씌우는 방식이다.

// 이 방법을 가장 많이 사용한다.
const box3 = { ...box, width: 400 };

// 가장 원시적인 방법이지만 확실한 방법
// 객체를 문자열로 변경해줬다가 다시 객체로 변경하는 방법
const box4 = JSON.parse(JSON.stringify(box));

box.width = 300;
console.log(box1.width); // 300
console.log(box2.width); // 200
console.log(box3.width); // 400
