function solution(A, K) {
  while(K > 0){
    let frontArr = A.slice(0, A.length -1);
    let endArr = A.slice(A.length -1);
    A = endArr.concat(frontArr);
    K--;
  }
  return A;
}

function solution2(A, K){
  
}

console.log(solution([1], 3));