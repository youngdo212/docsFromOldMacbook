function fibonacci(n, memo = {0: 0, 1: 1}){
  if(memo[n] !== undefined)  return memo[n];

  memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);

  return memo[n];
}