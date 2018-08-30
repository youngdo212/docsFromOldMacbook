function getDate(str){
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nem', 'Dec'];

  let [,year, month, date] = str.match(/^(\d{4})-([12][0-2]|[0]?[1-9])-([12][0-9]|[3][01]|[0]?[1-9])$/);
  
  console.log("year :", year, ", month :", months[month-1], ", date :", date);
}

getDate("2017-2-1");
getDate("2014-3-12");
// getDate("2014-3-");
// getDate("2014-3-32");
