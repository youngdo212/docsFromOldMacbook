function solution(A) {
  let min = Infinity;
  let result;
  for(let i = 0; i < A.length-1; i++){
    let sum = A[i];
    for(let j = i+1; j < A.length; j++){
      sum += A[j];
      let avg = sum/(j-i+1);
      if(avg < min){
        min = avg;
        result = i;
      }
    }
  }
  return result;
}