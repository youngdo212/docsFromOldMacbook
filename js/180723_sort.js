let numberSort = (arr) => arr.sort((a,b) => (a-b));

let wordSort = (arr) => arr.sort();

let peopleSort = (arr) => {
  let nameSortedArr = arr.sort((person1, person2) => person1.name - person2.name)
  return nameSortedArr.sort((person1, person2) => person1.money - person2.money)
}


let suffle = (arr) => {
  let resultArr = [...Array(arr.length)];
}

let knuthShuffle = (arr) => {
  for(i = arr.length-1; i >= 0; i--){
    let randomIdx = Math.floor(Math.random() * i);
    let temp = arr[randomIdx];
    arr[randomIdx] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

console.log(knuthShuffle([0,1,2,3,4,5,6,7]));

let merge = (arr1, arr2) => {
  let result = [];
  let i = 0;
  let j = 0;

  while(i !== arr1.length-1 && j !== arr2.length-1){

    if(arr1[i] <= arr2[j]) {
      result.push(arr1[i])
      i++;
    }

    else {
      result.push(arr2[j]);
      j++;
    }
  }

  for(k = i; k < arr1.length-1; k++){
    result.push(arr1[k])
  }
  for(k = j; k < arr2.length-1; k++){
    result.push(arr2[k])
  }
  
  return result;
}

let p1 = {name: 'kim', money: 100};
let p2 = {name: 'cheon', money: 500};
let p3 = {name: 'lee', money: 1000};
let p4 = {name: 'kim', money: 123};
let p5 = {name: 'choi', money: 71};
let people = [p1, p2, p3, p4, p5];

// console.log(numberSort([6,2,3,1,11]));

// console.log(wordSort(['banana', 'apple', 'cry']))

// console.log(peopleSort(people));

console.log(merge([1,2,5,10], [2,10,15,100]))