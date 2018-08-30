function solution(N) {
  let max = 0;
  let temp = 0;
  let foundOne = false;
  while(N !== 0){
    if(N%2 === 1){
      foundOne = true;
      if(temp > max) max = temp;
      temp = 0;      
    }
    if(N%2 === 0){
      if(foundOne) temp += 1;
    }
    N = Math.floor(N/2);
  }
  return max;
}