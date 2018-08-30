function range(start, end, step = 1){
  let result = [];
  if(step > 0){
    for(let i = start; i <= end; i += step){
      result.push(i);
    }
  }
  if(step < 0){
    for(let i = start; i >= end; i += step){
      result.push(i);
    }
  }
  return result;
}

function sum(arr){
  let result = 0;
  for(let e of arr){
      result += e;
  }
  return result;
}

function reverseArray(arr){
  let result = [];
  for(let i = arr.length -1; i >= 0; i--){
    result.push(arr[i]);
  }
  return result;
}

function reverseArrayInPlace(arr){
  let temp;
  for(let i = 0, endIndex = arr.length -1; i < endIndex/2; i++){
    temp = arr[i];
    arr[i] = arr[endIndex - i];
    arr[endIndex - i] = temp;
  }
}

function arrayToList(arr){
//   if(arr.length === 0) return null;  
//   return {value: arr[0], rest: arrayToList(arr.slice(1))}
  let result = null;
  for(let i = arr.length - 1; i >= 0; i--){
    result = {value: arr[i], rest: result};
  }
  return result;
}

function listToArray(list){
//   if(list === null) return [];
//   let result = [];
//   result.push(list.value);
//   return result.concat(listToArray(list.rest));
  let result = [];
  for(let entity = list; entity; entity = entity.rest){
    result.push(entity.value);
  }
  return result;
}

function prepend(element, list){
  return {value: element, rest: list};
}

function nth(list, number){
//   if(list === null) return undefined;
//   if(number === 0) return list.value;
//   return nth(list.rest, number -1);
  for(let entity = list; entity; entity = entity.rest){
    if(number === 0) return entity.value;
    number -= 1;
  }
  return undefined;
}

function deepEqual(a, b){
  if(typeof a !== 'object' || a === null) return a === b;
  if(Object.keys(a).length !== Object.keys(b).length) return false;
  for(let e of Object.keys(a)){
    if(!Object.keys(b).includes(e)) return false;
  }
  for(let key in a){
    if(!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true