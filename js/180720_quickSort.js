function quickSort(arr){
  if(arr.length === 0) return arr;

  let pivot = arr.pop();
  let i = -1;
  for(j = 0; j < arr.length; j++){
    if(arr[j] <= pivot){
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  return [...quickSort(arr.slice(0, i+1)), pivot, ...quickSort(arr.slice(i+1))];
}

console.log(quickSort([10,80,30,90,40,50,70]));