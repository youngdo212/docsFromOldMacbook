function solution(A) {
  let sortedA = mergesort(A);
  for(let i = 0, len = sortedA.length; i < len-2; i++){
    if(sortedA[i] < sortedA[i+1] + sortedA[i+2]) return 1;
  }
  return 0;
}

// 비오름차순 합병 정렬
function mergesort(arr){
  if(arr.length <= 1) return arr;
  
  let middle = Math.floor(arr.length/2);
  
  let left = mergesort(arr.slice(0,middle));
  let right = mergesort(arr.slice(middle));
  
  return merge(left, right);
}

function merge(left, right){
  let result = [];

  let i = j = 0;

  while(i < left.length && j < right.length){
    left[i] > right[j] ? result.push(left[i++]) : result.push(right[j++]);
  }

  return result.concat(left.slice(i), right.slice(j));
}