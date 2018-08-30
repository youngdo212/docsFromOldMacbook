function solution(A) {
  let result = 0;
  for(let i = 0; i < A.length-1; i++){
    for(let j = i+1; j < A.length; j++){
      if((j-i) <= (A[i] + A[j])) result++;
    }
  }
  return result > 10000000 ? -1 : result;
}