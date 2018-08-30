function solution(X, A) {
  let answer = [...Array(5)].map(v => 0);
  for(let i = 0; i < A.length; i++){
    answer[A[i]-1] = 1;
    if(answer.reduce((prev, curr) => prev+curr) === X) return i;
  }
  return -1;
}

function solution(X, A){
  let set = new Set();
  for(let i = 0; i < A.length; i++){
    set.add(A[i]);
    if(set.size === X) return i;
  }
  return -1;
}

function solution(X, A) {
  let len = 0;
  let answer = [...Array(X)].fill(0);
  for(let i = 0; i < A.length; i++){
    if(answer[A[i]-1] === 0){
      answer[A[i] - 1] = 1;
      len += 1;
    }
    if(len === X) return i;
  }
  return -1;
}