function solution(S, P, Q) {
  let impactFactor = {
    A: 1,
    C: 2,
    G: 3,
    T: 4
  };
  let result = [];
  for(let i = 0; i < P.length; i++){
    let min = 4;
    for(let j = P[i]; j <= Q[i]; j++){
      if(impactFactor[S[j]] < min) min = impactFactor[S[j]];
    }
    result.push(min);
  }
  return result;
}