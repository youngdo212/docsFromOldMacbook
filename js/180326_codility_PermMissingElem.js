function solution(A){
  return A.reduce((prev, curr, i) => prev + i+1 - curr, A.length + 1)
}

// function solution2(A) {
//   let sum = 0;
//   const len = A.length;
//   for(let i = 1; i <= len + 1; i++){
//     sum += i;
//   }
//   for(let i = 0; i < len; i++){
//     sum -= A[i];
//   }
//   return sum;
// }

let arr = [];

console.log(solution(arr));