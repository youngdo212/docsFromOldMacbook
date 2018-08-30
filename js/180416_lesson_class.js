// class Rectrangle{
//   constructor(width, height){
//     this.width = width;
//     this.height = height;
//   }
//   get area(){
//     return this.calcArea();
//   }
//   calcArea(){
//     return this.width * this.height;
//   }
//   setWidth(width){
//     this.width = width;
//   }
// }

// let square = new Rectrangle(10, 10);
// console.log(square.area);

// console.log(Rectrangle.prototype);
// console.log(square.__proto__);

// console.log(square);

// square.setWidth(1000);
// console.log(square.area);

let myobj = {
  1: 'a',
  2: 'b'
}

class Sample{
  constructor(){
    this.obj = {1: 'a', 2: 'b'};
  }
  loop(){
    for(let key in this.obj){
      console.log(key);
    }
  }
}

let s1 = new Sample();
s1.loop();