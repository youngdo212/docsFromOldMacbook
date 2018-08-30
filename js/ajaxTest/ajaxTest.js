let button = document.querySelector('div');
let p = document.querySelector('p');

button.addEventListener('click', () => {
  foo();
})

function foo(){
  let x = new XMLHttpRequest();
  x.addEventListener('load', () => {
    let data = JSON.parse(x.response);
    p.textContent = data.name;
  })
  x.open('GET', "./data.json");
  x.send();
}