function addAsync(a, b){
  return new Promise((resolve, reject)=>{
    console.log('its done');

    let result = a + b;
    let bool = true;
    const reason = 'hehe';

    if(bool){
      resolve(result);
    }
    else{
      reject(error);
    }
  })
}

const p = addAsync(10,20);

p.then(function(result){
  result *=10;
  return result;
})
.then(function(result){
  result-=1
  throw new Error('im error');        
  console.log(result);
})
.catch(function(error){
  console.log('bug!: ' + error.message);
})

// console.log(p);
console.log('the end');
