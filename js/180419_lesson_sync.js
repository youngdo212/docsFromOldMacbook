// // const baseData = [1,2,3,4,5,6,100];

// // const asyncRun = (arr, fn) =>{
// //   arr.forEach((v,i)=>{
// //     setTimeout(()=>fn(i), 1000);
// //   }); // 새로운 스코프가 생성된다
// // }

// // asyncRun(baseData, idx => console.log(idx));

// const baseData = [1,2,3,4,5,6,100];

// const asyncRun = (arr, fn) =>{
//   for(let i = 0; i < arr.length; i++){
//     setTimeout(()=> fn(i), 1000);
//   }
// }

// asyncRun(baseData, idx => console.log(idx));

// function animate(){
//   setTimeout(animate, 500);
//   console.log('loading...');
// }

// animate();

function fibonacci(n, pprev = 1, prev = 0){
  if(n < 0) return ;
  const curr = pprev + prev;
  console.log(curr);
  setTimeout(() => fibonacci(n-1, prev, curr), 1000);
}

fibonacci(6);