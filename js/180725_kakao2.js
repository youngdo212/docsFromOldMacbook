function solution(str){
  let scores = [];

  let fakeScores = str.match(/\d{1,2}\D{1,2}/g);

  return scores.reduce((acc, cur) => acc+cur, 0);
}

function SDT(str){
  return str.replace(/[SDT]/, (char) => {
    return char === 'S'
  })
}

console.log(arr)