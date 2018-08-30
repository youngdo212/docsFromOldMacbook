// rest parameter
function a(...fns) {
  fns[0]();
  fns[1]();
  fns[2]();
}

a(function () {}, function () {}, function () {});

//reduce
var arr = [
  [0, 1],
  [2, 3],
  [4, 5]
];

var flattened = arr.reduce(function (accumulator, currentValue, i) {
  console.log(currentValue);
  return accumulator.concat(currentValue);
}, []);

console.log(flattened);

var s = "todo$공부하기 , todo$알고리즘공부 , doing$스터디하기";
console.log(s);
console.log(s.trim());

function split(str) {
  return str.split(',');
}

function trimmedArray(arr) {
  return arr.map(v => v.trim());
}

function maketodoObject(arr) {
  return arr.reduce((prev, curr) => {
    let a = curr.split('$');
    // (a[0] in prev) ? prev[a[0]].push(a[1]): prev[a[0]] = [a[1]];
    prev[a[0]] = prev[a[0]] || [];
    prev[a[0]].push(a[1]);
    return prev;
  }, {})
}

let pipe = (...fns) => (s) => fns.reduce((acc, fn) => fn(acc), s);

let getTodoInfo = pipe(split, trimmedArray, maketodoObject);

console.log(getTodoInfo(s));