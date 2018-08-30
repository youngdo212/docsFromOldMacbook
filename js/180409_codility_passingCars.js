function solution(A) {
  let result = 0;
  for(let i = 0; i < A.length -1; i++){
    for(let j = i+1; j < A.length; j++){
      if(A[i] === 0 && A[j]===1) result++;
    }
  }
  return result > 1000000000 ? -1 : result;
}

function solution(A) {
  let result = 0;
  let m = 0;
  A.forEach(e =>{
    if(e === 0) m++;
    else if(e === 1) result += m
  })
  return result <= 1000000000 ? result : -1;
}

