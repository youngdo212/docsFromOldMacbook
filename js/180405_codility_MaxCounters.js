function solution(N, A) {
  let result = Array(N).fill(0);
  let max = 0;
  for(let i = 0; i < A.length; i++){
    if(A[i] > N) result = Array(N).fill(max);
    else{
      result[A[i]-1]++;
      if(result[A[i]-1] > max) max = result[A[i]-1];
    }
  }
  return result;
}

function solution(N, A) {
  let max = 0;
  let reset = 0;
  const result = Array(N).fill(0);
  A.forEach(e =>{
    e === N+1 ? reset = max :
    result[e-1] < reset ? result[e-1] = reset + 1 : result[e-1]++;
    if(result[e-1] > max) max = result[e-1];
  });
  return result.map(e => e < reset ? reset : e);
}