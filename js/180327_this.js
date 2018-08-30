function unit(){
  this.getName = function(){
    return this.name;
  }
  this.setName = function(name){
    this.name = name;
  }
}

function Name(name){
  this.name = name;
}

class Car{
  constructor(name, price){
    this.name = name;
    this.price = price;
  }
  getPrice(){
    return this.price
  }
}

let car = {
  name:'audi'
}

unit.call(Name.prototype);
unit.call(car);
unit.call(Car.prototype);

let person = new Name('youngdo');
let car1 = new Car('애마', 10000);

console.log(person.getName());
console.log(car.getName());
console.log(car1.getName());
car1.setName('trash');
// car1.price = 100000;
console.log(car1.name);
console.log(car1.getPrice());