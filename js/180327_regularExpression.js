// let str = 'hello';
// let c = str.replace('h', 'b');

// console.log(str);
// console.log(c);

let str = 'azzz77dee';
let r = /\d\d/;
let result = str.match(r);

console.log("5522-12311".match(/\d-\d{2}/)[0]);

console.log("thisisphonenumber:010-3301-5563".match(/.*/)[0]);

let str2 = '010-4905-5563';

let str3 = str2.replace(/(\d{3}-)(\d{3,4})/, '$1242');

console.log(str3);

let str4 = "diiesj1diowoj3ksji2jdifj1difjiwwifj1difje321".match(/(\d).*?\1/)[0];
console.log(str4);