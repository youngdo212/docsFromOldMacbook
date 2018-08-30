function speak(name){
  console.log(`hello!, ${name}`);
}
function square(n){
  return n * n;
}
const a = 1;
module.exports = {
  speak: speak,
  square: square,
  a: a
}