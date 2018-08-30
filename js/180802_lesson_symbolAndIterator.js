// let obj = {
//   a: 1,
//   b: 2,
//   c: 3
// }

// obj[Symbol.iterator] = function() {
//   let keys = Object.keys(obj);
//   let idx = 0;
//   return {
//     next() {
//       let value = obj[keys[idx++]];
//       let done = value ? false : true;
//       return {value: value, done: done}
//     }
//   }
// };

// for(i of obj){
//   console.log(i);
// }

function* g() {
  yield 1;
  yield 3;
}

let test = g();

console.log(test.next());
console.log(test.next());
console.log(Math.pow(undefined,2))