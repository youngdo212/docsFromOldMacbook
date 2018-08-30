//O(n)
function solution(A){
  let dic = {};
  for(let i = 0; i < A.length; i++){
    if(!(A[i] in dic)) dic[A[i]] = 1;
    else dic[A[i]] += 1;
  }
  for(let key in dic){
    if(dic[key]%2 === 1) return Number(key);
  }
}

//O(n) or O(nlogn)
function solution3(A){
  let dic = {};
  for(let i = 0; i < A.length; i++){
    if(!(A[i] in dic)) dic[A[i]] = 1;
    else if(dic[A[i]] !== 1) dic[A[i]] += 1;
    else delete dic[A[i]];
  }
  return Number(Object.keys(dic)[0]);
}

function solution2(A){
  let result = [];
  for(let i = 0; i < A.length; i++){
    let found = false;
    for(let j = 0; j < result.length; j++){
      if(A[i] === result[j]){
        found = true;
        let frontArr = result.slice(0, j);
        let endArr = result.slice(j+1);
        result = frontArr.concat(endArr);
        break;
      }
    }
    if(!found) result.push(A[i]);
  }
  return result[0];
}

console.log(solution3([9,3,9,3,9,7,9]));