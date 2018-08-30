let curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4));
console.log(curriedMultiply(2,3)(4));
console.log(curriedMultiply(2)(3,4));
console.log(curriedMultiply(2, 3, 4));

function multiply(a,b,c){
  return a*b*c;
}

function curry(fn){
  let acc = [];
  return function f1(...args){
    acc.push(...args);
    if(acc.length === fn.length) return fn(...acc);
    return f1;
  }
}

function curry2(fn){
  return function f(...args){
    if(args.length === fn.length) return fn(...args);
    return (...restArgs) => f(...args, ...restArgs);
  }
}
