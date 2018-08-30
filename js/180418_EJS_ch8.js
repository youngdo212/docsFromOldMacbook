function foo(n){
  if(typeof n !== 'number') throw new Error('Invalid input: ' + n);
  return n;
}

try{
  console.log(foo(123));
}catch(error){
  console.log('Error Message: ' + error);
}finally{
  console.log('must be executed');
}
console.log('123111');