function calculate(arr, k){
    let result = [];
    let end = arr.length-(k-1);
    for(let i = 0; i < end; i++){
        let value = 0;
        for(let j = 0; j < k; j++){
            value += arr[i + j];
        }
        result.push(value);
    }
    return result;
}

//리팩토링
function calculate2(arr, k){
    let result = [];
    let value = 0;    
    for(let i = 0; i < k; i ++){
        value = value + arr[i];
    }
    for(let i = 0; i < arr.length-(k-1); i++){
        result.push(value);
        value = value + arr[i+k] -arr[i];
    }
    return result;
}

var data = [...Array(10)].map((v,i) => ++i);

console.time("start")
console.log(calculate(data, 3));
console.timeEnd("start");

console.time("start")
console.log(calculate2(data, 3));
console.timeEnd("start");