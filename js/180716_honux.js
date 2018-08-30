function count(n) {
  if (n === 0) return console.log('DDang!');
  console.log(n);
  count(n - 1);
}

function add(a, b) {
  if (a === b) return a;

  let c = add(a + 1, b);
  return a + c;
}

function arrAdd(arr) {
  if (arr.length === 1) return arr[0];
  return arr[0] + arrAdd(arr.slice(1));
}

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2);
}

let ans = [0,1];

function fibonacci2(n) {
  if(ans[n] !== undefined) return ans[n];

  ans[n] = fibonacci2(n - 1) + fibonacci2(n - 2);
  return ans[n];
}

console.log(fibonacci2(50));

/*
f(0) = 0
f(1) = 1
f(2) = 1
f(3) = 2
f(4) = 3
f(5) = 5
f(6) = 8
*/

function gcd(a,b){
  if (a % b === 0) return b;
  return gcd(b, a % b);
}

function solution(src, tar, n) {
  let result = [];
  if(n === 1) result.push([src,tar]);
  
  else {
    let other = 6 - src - tar;
    result = result.concat(solution(src, other, n-1));
    result = result.concat([[src,tar]]);
    result = result.concat(solution(other, tar, n-1));
  }
  
  return result
}

console.log(solution(1,3,3))