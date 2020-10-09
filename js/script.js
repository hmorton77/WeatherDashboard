var idNum;
var APIkey = "6dadd3c90772780ec35050af315cf499";
var queryURL5day;
var queryURLtoday;
var queryURLuv;
var inputCombo;
var historRow;
var latVal;
var lonVal;
var imgEl5day;
var icon5day;
var cityName;
var stateName;
var NationName;
// current date:
newDate();
// convert input to city ID
$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  //Clear the previous 5 day forecast
  $(".5dayforecast").empty();
  $(".uvNum").empty();
  //store 3 aspects of the input
  cityName = document.getElementById("cityInput").value;
  stateName = document.getElementById("stateInput").value;
  nationName = document.getElementById("nationInput").value;
  if (cityName) {
    inputCombo = cityName;
  }
  if (stateName) {
    inputCombo += ", " + stateName;
  }
  if (nationName) {
    inputCombo += ", " + nationName;
  }

  checkIDnum();

  historyRow = $("<div>");
  historyRow.addClass("col card historycard");
  let str = inputCombo;
  let substrings = str.split(", ");
  historyRow.text(substrings);

  $(".history").append(historyRow);
  //on click function for whenever a history card is clicked:
  historyRow.on("click", function () {
    $(".5dayforecast").empty();
    $(".uvNum").empty();
    cityName = substrings[0];
    stateName = substrings[1];
    nationName = substrings[1];
    inputCombo = substrings;
    checkIDnum();
    historyclick();
    URL5day(idNum);
    URLToday(idNum);
    $.ajax({
      url: queryURLtoday,
      method: "GET",
    }).then(function (responsetoday) {
      cardsToday(responsetoday);
    });
    $.ajax({
      url: queryURL5day,
      method: "GET",
    }).then(function (response5day) {
      cards5day(response5day);
    });
  });
  URL5day(idNum);
  URLToday(idNum);

  // ajax call for 5 day forecast
  $.ajax({
    url: queryURL5day,
    method: "GET",
  }).then(function (response5day) {
    cards5day(response5day);
  });

  // ajax call for current weather
  $.ajax({
    url: queryURLtoday,
    method: "GET",
  }).then(function (responsetoday) {
    cardsToday(responsetoday);
  });
});
