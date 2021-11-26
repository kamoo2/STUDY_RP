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
c1.__proto__ = c2;

console.log(c1);
console.log(c2);
console.log(c3);

function Foo(name) {
  this.name = name;
}

Foo.prototype.lastName = 'WooWa';

const f = new Foo('문석환');

console.log(f.name);
console.log(f.lastName);

function CartV1() {
  this.cart = [];
  this.currentId = 0;
}

CartV1.prototype.getNewId = function () {
  this.currentId++;
  return this.currentId;
};

const v1 = new CartV1();

console.log(v1.currentId);

console.log(v1.getNewId());
