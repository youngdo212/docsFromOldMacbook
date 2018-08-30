function solution(A) {
  let answer = [...Array(A.length)].map((v,i)=> ++i);
  answer = answer.concat(A);
  let result = answer.reduce((prev, curr) => prev ^= curr);
  if(result === 0) return 1;
  return 0;
}

function solution2(A){
  let result = A.reduce((prev, curr, i) => prev^(curr^(i+1)),0);
  if(result === 0) return 1;
  return 0;
}