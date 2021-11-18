function doException() {
  throw new Error("와! 오류야!");
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

// function main() {
//   try {
//     callException("do");
//   } catch (e) {
//     console.log(e);
//   } finally {
//     // 예외가 일어나든 안일어나든 반드시 실행되어야 할 코드가 작성되어야함
//     console.log("done");
//   }
// }

doException();
