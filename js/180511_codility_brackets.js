function solution(S) {
  const stack = [];
  
  for(let i = 0, {length} = S; i < length; i++){
    if(isOpenType(S[i])) stack.push(S[i]);
    else if(!isPair(stack.pop(), S[i])) return 0;
  }
  
  return stack.length === 0 ? 1 : 0;
}

function isOpenType(value){
  return value === '(' || value === '[' || value === '{';
}

function isPair(a,b){
  if(a === '(') return b === ')';
  if(a === '[') return b === ']';
  if(a === '{') return b === '}';
}