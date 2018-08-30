function solution(A) {
  let frontSum = A[0];
  let endSum = A.slice(1).reduce((prev, curr) => prev + curr);
  let result = Math.abs(frontSum - endSum);
  let temp;
  for(let i = 1, len = A.length; i < len-1; i ++){
    frontSum = frontSum + A[i];
    endSum = endSum - A[i];
    temp = Math.abs(frontSum - endSum);
    result = Math.min(result, temp);
  }
  return result;
}