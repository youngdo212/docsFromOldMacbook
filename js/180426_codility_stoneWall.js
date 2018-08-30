// function solution(H) {
//   let result = [];
//   let stack = [];
  
//   H.forEach(height => {
//     for(let i = stack.length-1; i >= 0; i--){
//       if(stack[i] < height){
//         stack.push(height);
//         break;
//       }
//       if(stack[i] === height) break;
//       if(stack[i] > height){
//         result.push(stack.pop());
//       }
//     }
//     if(stack.length === 0) stack.push(height);
//   })
  
//   return result.concat(stack).length;
// }

function solution(H) {
  let stack = [];
  let result = [];
  
  for(let i = 0, {length} = H; i < length; i++){
    while(stack[stack.length-1] && H[i] < stack[stack.length-1]){
      result.push(stack.pop());
    }
    if(H[i] === stack[stack.length-1]) continue;
    stack.push(H[i]);
  }
  
  return result.concat(stack).length;
}

let arr = [8,8,5,7,9,8,7,4,8];

console.log(solution(arr));