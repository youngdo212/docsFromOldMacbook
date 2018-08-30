class Matrix{
  constructor(width, heigth, content = (x, y) => undefined){
    this.width = width;
    this.heigth = heigth;
    this.content = []

    for(let y = 0; y < this.heigth; y++){
      for(let x = 0; x < this.width; x++){
        this.content[x + y*width] = content(x,y);
      }
    }
  }
  get(x,y){
    return this.content[x + y*this.width];
  }
  set(x,y, value){
    this.content[x + y*this.width] = value;
  }
}

class Vec{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  plus(vec){
    return new Vec(this.x + vec.x, this.y + vec.y);
  }
  minus(vec){
    return new Vec(this.x - vec.x, this.y - vec.y);
  }
  get length(){
    return Math.sqrt(this.x**2 + this.y**2);
  }
}

class Group{
  constructor(){
    this.data = [];
  }
  add(value){
    if(this.data.indexOf(value) === -1) this.data.push(value);
  }
  delete(value){
    this.data = this.data.filter(e=> e != value);
  }
  has(value){
    return this.data.indexOf(value) !== -1;
  }
  static from(iterableObj){
    const group = new Group();
    for(let e of iterableObj){
      group.add(e);
    }
    return group
  }
  [Symbol.iterator](){
    return new GroupIterator(this);
  }
}

class GroupIterator{
  constructor(group){
    this.data = group.data;
    this.idx = 0;
  }
  next(){
    if(this.idx === this.data.length) return {done: true};
    const result = {value: this.data[this.idx], done: false};
    this.idx++;
    return result;
  }
}

console.log(Group.from([1,2,3]));

for(let val of Group.from(['a','b','c'])){
  console.log(val);
}

console.log({}.hasOwnProperty("toString"));
console.log("toString" in {});

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
// console.log(map.hasOwnProperty("one"));
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true