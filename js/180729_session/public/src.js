let box = document.querySelector('.box');

box.addEventListener('click', () => {
  ajax();
})

function ajax(){
  let x = new XMLHttpRequest();
  x.addEventListener('load', () => {
    // let data = JSON.parse(x.response);
    // box.textContent = data.name;
    box.textContent = x.response
  })
  x.open('GET', "http://localhost:3000/data");
  x.send();
}