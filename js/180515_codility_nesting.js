function solution(S) {
  const stack = [];
  
  for(let i = 0, {length} = S; i < length; i++){
    if(S[i] === '(') stack.push(S[i]);
    else{
      const lastElement = stack.pop();
      if(!lastElement) return 0;
    }
  }
  
  return stack.length ? 0 : 1;
}