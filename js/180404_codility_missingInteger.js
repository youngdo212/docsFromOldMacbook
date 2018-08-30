function solution(A) {
  const arr = [];
  A.forEach(e =>{
    arr[e-1] = 1;
  })
  let result = 1;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] !== 1) break;
    ++result;
  }
  return result;
}

