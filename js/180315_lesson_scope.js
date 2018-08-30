// name = 'play ground';
// function home(){
//     var homeName = 'my home';
//     function printName(){
//         var nickName = 'crong house';
//         debugger;
//         console.log(nickName);
//         console.log(homeName);
//         console.log(name);
//     }
//     printName();
// }

// home();

// function home(){
//     var homeName = 'my house';
//     function printName(){
//         return 'my name is ' + homeName;
//     }
//     return printName;
// }

// var print = home();
// console.log(print());

function circle(radius){
    return radius * radius * Math.PI;
}

function rect(bottom, height){
    return bottom * height;
}

function make(a, b) {
    function getResult(shape){
        return shape(a, b);
    }
    return getResult;
}

var value = make(10,20);
console.log(value(circle));