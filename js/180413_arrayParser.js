class Error{
  throwTypeError(value){
    throw `${value}는 알 수 없는 타입입니다`;
  };
  throwStringError(value){
    throw `${value}는 올바른 문자열이 아닙니다`;
  };
}

class Type{
  constructor(){
    this.error = new Error();
  }
  isBoolean(value){
    return value === 't' || value === 'f';
  };
  isNull(value){
    return value === 'n';
  };
  isString(value){
    return value === "'";
  };
  isNumber(value){
    return '0123456789'.indexOf(value) !== -1
  };
  getType(value){
    return isBoolean(value) ? 'boolean' : 
    isNull(value) ? 'null' : 
    isString(value) ? 'string' :
    isNumber(value) ? 'number' : this.error.throwTypeError(value);
  };
  getNextVal(type, value){
    if(type === 'string') return undefined;
    if(type === 'null') return 'null'['null'.indexOf(value) + value.length];
    if(type === 'number') return '0123456789';
    if(type === 'boolean') return 'true, false'['true, false'.indexOf(value) + value.length];
  };
  isDone(type, value){
    if(type === 'string') return value.match(/'/g).length === 2;
    if(type === 'null') return value === 'null';
    if(type === 'number') return true;
    if(type === 'boolean') return value === 'true' || value === 'false';
  };
}

class Data{
  constructor(){
    this.type = undefined;
    this.key = {value: undefined, done: false};
    this.value = {value: undefined, done: false};
    this.parent = undefined;
    this.child = [];
  }
  pushChild(child){
    this.child.push(...child);
  }
  isEmpty(){
    return !this.value.value && !this.key.value;
  }
  push(e){
    
  }
}

class Child{
  constructor(parent){
    this.child = [];
    this.key = 0;
    this.parent = parent;
  }
  addData(data){
    data.key = data.key || this.key;
    data.parent = this.parent;
    this.child.push(data);
    this.key++;
  }
  get lastData(){
    return this.child[this.child.length-1];
  }
}

class ChildStack{
  constructor(){
    this.stack = [];
  }
  buildStack(){
    let parent = this.lastChild ? this.lastChild.lastData.type : undefined;
    this.stack.push(new Child(parent));
  }
  get lastChild(){
    return this.stack[this.stack.length-1];
  }
  popChild(){
    return this.stack.pop();
  }
  isOpenedBy(e){
    return e === '[' || e === '{';
  }
  isClosedBy(e){
    return e === ']' || e === '}';
  }
  isPausedBy(e){
    return this.isClosedBy(e) || e === ',' || e === ':';
  }
}

function ArrayParser(str){
  const stack = new ChildStack();
  let currData = new Data();

  stack.buildStack();
  
  for(let i = 0; i < str.length; i++){
    if(stack.isOpenedBy(str[i]) && currData.isEmpty()){
      currData.initialize(str[i]);
      stack.lastChild.addData(currData);
      stack.buildStack();
      currData = new Data();
    }
    else if(stack.isPausedBy(str[i])){
      if(str[i] === ':'){
        //currData.key.value = currData.key.value.trim();
        currData.key = currData.temp.trim(); // currData.key.done = true
        currData.temp = '';
        continue;
      }
      if(!currData.isEmpty()){
        currData.initialize();
        stack.lastChild.addData(currData);
        currData = new Data();
      }
      if(stack.isClosedBy(str[i])){
        // if(currData.parent.type !== getType(str[i])) throw new Error(`열린 문자와 닫히는 문자가 일치하지 않습니다: ${str[i]}`);
        const child = stack.popChild().child;
        // stack.lastChild.lastData.done = true;
        stack.lastChild.lastData.pushChild(child);
      }
    }
    else{
      currData.push(str[i]);
    }
  }
  if(!currData.isEmpty()){
    currData.initialize();    
    stack.lastChild.addData(currData);
  }
  
  return stack.popChild().lastData;
}

let testcase1 = '[12, [14, 55], 15]';
let testcase2 = '[1, [55, 3]]'
let testcase3 = '[1, [[2]]]'
let testcase4 = '[123,[22,23,[11,[112233],112],55],33]';
let testcase5 = '12345'
let testcase6 = '[1,3,[1,2],4,[5,6]]'
let testcase7 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
let testcase8 = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

let result = ArrayParser("'[]'");
console.log(JSON.stringify(result, null, 2));

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

