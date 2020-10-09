var idNum;
var APIkey = "6dadd3c90772780ec35050af315cf499";
var queryURL5day;
var queryURLtoday;
var queryURLuv;
var inputCombo;
var historRow;
var latVal;
var lonVal;
// current date:
var todayDate = new Date();
todayYear = todayDate.getFullYear();
todayMonth = parseInt(todayDate.getMonth()) + 1;
todayDay = todayDate.getDate();
displayDate = todayMonth + "/" + todayDay + "/" + todayYear;
console.log(displayDate);

// convert input to city ID
$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  //store 3 aspects of the input
  var cityName = document.getElementById("cityInput").value;
  var stateName = document.getElementById("stateInput").value;
  var nationName = document.getElementById("nationInput").value;
  if (cityName) {
    inputCombo = cityName;
  }
  if (stateName) {
    inputCombo += ", " + stateName;
  }
  if (nationName) {
    inputCombo += ", " + nationName;
  }
  localStorage.setItem("city", cityName);
  localStorage.setItem("state", stateName);
  localStorage.setItem("nation", nationName);
  localStorage.setItem("everything", inputCombo);

  console.log("items stored!");
  // Check each index in the large JSON object to see if the city/state or city/nation match
  for (var i = 0; i < cityID.length; i++) {
    if (cityName && stateName && cityID[i].name == cityName && cityID[i].state == stateName) {
      idNum = cityID[i].id;
      break;
    } else if (cityName && nationName && cityID[i].name == cityName && cityID[i].country == nationName) {
      idNum = cityID[i].id;
      break; //(there are 2 cities named Berlin in Germany and it is a pain in the butt to try to differentiate them)
    }
  }

  historyRow = $("<div>");
  historyRow.addClass("col-md-3");
  historyRow.text(inputCombo);
  $(".history").append(historyRow);

  queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?id=" + idNum + "&units=imperial&appid=" + APIkey;
  queryURLtoday = "https://api.openweathermap.org/data/2.5/weather?id=" + idNum + "&units=imperial&appid=" + APIkey;

  console.log(queryURL5day);
  // ajax call for 5 day forecast
  $.ajax({
    url: queryURL5day,
    method: "GET",
  }).then(function (response5day) {
    console.log(response5day);
  });
  // ajax call for current weather
  $.ajax({
    url: queryURLtoday,
    method: "GET",
  }).then(function (responsetoday) {
    console.log(responsetoday);
    console.log(responsetoday.main.temp);
    $(".tempFtext").append(" " + responsetoday.main.temp + "°F");
    console.log(responsetoday.main.humidity);
    $(".humidityText").append(" " + responsetoday.main.humidity + "%");
    console.log(responsetoday.wind.speed);
    $(".windSpeedtext").append(" " + responsetoday.wind.speed + "mph");
    console.log(responsetoday.weather[0].icon);
    var iconPic = responsetoday.weather[0].icon;
    //UV index
    latVal = responsetoday.coord.lat;
    lonVal = responsetoday.coord.lon;
    queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=" + APIkey;
    $.ajax({
      url: queryURLuv,
      method: "GET",
    }).then(function (responseUV) {
      console.log(responseUV);

      var uvVal = responseUV.value;
      var uvNum = $("<span>");
      uvNum.addClass("uvNum");
      uvNum.text(" " + uvVal);
      $(".uvValtext").append(uvNum);
      //determining color of UV index number
      if (uvVal < 3) {
        $(".uvNum").css("background-color", "#00ff00");
      } else if (uvVal < 6) {
        $(".uvNum").css("background-color", "#ffff00");
      } else if (uvVal < 8) {
        $(".uvNum").css("background-color", "#ffa500");
      } else if (uvVal < 11) {
        $(".uvNum").css("background-color", "#ff0000");
      } else {
        $(".uvNum").css("background-color", "#ff00ff");
      }
    });
    //getting the whole header for the current weather card
    var icon = new Image();
    icon.src = "https://openweathermap.org/img/wn/" + iconPic + "@2x.png";
    $(".card-title").text(inputCombo + " (" + displayDate + ") ");
    $(".card-title").append(icon);
  });
});
