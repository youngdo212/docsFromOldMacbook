function subset(e, arr, result = []){
  let i = arr.indexOf(e);
  if(i === -1){
    result.push(arr);
  }else{
    let nextVal = arr[i+1];
    subset(nextVal, arr, result);
    let frontArr = arr.slice(0,i);
    let endArr = arr.slice(i+1);
    subset(nextVal, frontArr.concat(endArr), result);
  }
  return result;
}

// subset(a, [a,b,c]);
//  -> subset(b, [a,b,c], result);
//   -> subset(c, [a,b,c], result);
//    -> subset(undefined, [a,b,c], result);
    
//    -> subset(undefined, [a,b], result);
//   -> subset(c, [a,c], result);

//  -> subset(b, [b,c], result);

// let arr = ['a','b','c'];
// console.log(subset(arr[0], arr));

// function powerset(arr, e){
//   let result = [];
//   let i = arr.indexOf(e);
//   if(i === -1){
//     result.push(arr);
//   }
//   else{
//     result.concat(powerset(arr, arr[i+1]));
//     let frontArr = arr.slice(0,i);
//     let endArr = arr.slice(i+1);
//     result.concat(powerset(frontArr.concat(endArr), arr[i+1]));
//   }
//   return result;
// }
// let arr2 = ['a', 'b', 'c'];
// console.log(powerset(arr2, arr2[0]));

// function powerset2(arr){
//   let result = [];
//   if(arr.length === 0){
//     result.push([]);
//   }
//   else{
//     let lastVal = arr.slice(arr.length -1);
//     let restArr = arr.slice(0, arr.length -1);
//     result = result.concat(powerset2(restArr));
//     result = result.reduce((prev, curr) => [...prev, curr, curr.concat(lastVal)], []);
//   }
//   return result;
// }

function powerset(arr){
  let result = [];
  if(arr.length === 0){
    result.push([]);
  }
  else{
    let lastVal = arr.pop();
    result = result.concat(powerset(arr));
    result.forEach(e => {result.push(e.concat(lastVal))});
  }
  return result;
}

let arr = ['a', 'b', 'c'];
console.log(powerset(arr));