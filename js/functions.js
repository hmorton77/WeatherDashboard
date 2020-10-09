function newDate() {
  var todayDate = new Date();
  todayYear = todayDate.getFullYear();
  todayMonth = parseInt(todayDate.getMonth()) + 1;
  todayDay = todayDate.getDate();
  displayDate = todayMonth + "/" + todayDay + "/" + todayYear;
  console.log(displayDate);
}
