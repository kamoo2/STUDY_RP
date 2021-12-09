function salePrice(discountRate, price) {
  return price - price * (discountRate * 0.01);
}

console.log('여름 세일 = ' + salePrice(30, 500000));
console.log('겨울 세일 = ' + salePrice(10, 400000));

function discountPrice(discountRate) {
  return function (price) {
    return price - price * (discountRate * 0.01);
  };
}
console.log('여름 세일 = ' + discountPrice(30)(600000));
console.log('겨울 세일 = ' + discountPrice(10)(568000));

const summerPrice = discountPrice(30);
const winterPrice = discountPrice(10);

console.log('여름 세일 = ' + summerPrice(568000));
console.log('겨울 세일 = ' + winterPrice(568000));
