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
  //Clear the previous 5 day forecast
  $(".5dayforecast").innerHTML = "";
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
  // localStorage.setItem("city", cityName);
  // localStorage.setItem("state", stateName);
  // localStorage.setItem("nation", nationName);
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
  historyRow.addClass("col card historycard");
  historyRow.text(inputCombo);
  $(".history").append(historyRow);

  queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?id=" + idNum + "&units=imperial&appid=" + APIkey;
  queryURLtoday = "https://api.openweathermap.org/data/2.5/weather?id=" + idNum + "&units=imperial&appid=" + APIkey;

  console.log(queryURL5day);
  // ajax call for 5 day forecast
  var day1;
  var day2;
  var day3;
  var day4;
  var day5;
  var weatherArray;
  $.ajax({
    url: queryURL5day,
    method: "GET",
  }).then(function (response5day) {
    console.log(response5day);
    //each weather forecast should be able to detect the time at noon of each day.
    day1 = response5day.list[2];
    day2 = response5day.list[10];
    day3 = response5day.list[18];
    day4 = response5day.list[26];
    day5 = response5day.list[34];
    //for each array, we will dynamically make a card.
    weatherArray = [day1, day2, day3, day4, day5];
    console.log(weatherArray);
    for (var i = 0; i < weatherArray.length; i++) {
      var cardEl = $("<div>");
      cardEl.addClass("card minicard col");

      var bodyEl = $("<div>");
      bodyEl.addClass("card-body");

      var titleEl = $("<h2>");
      titleEl.addClass("card-title");
      titleEl.text(todayMonth + "/" + (parseInt(todayDay) + 1 + parseInt(i)) + "/" + todayYear);

      imgEl5day = new Image();
      icon5day = weatherArray[i].weather[0].icon;
      imgEl5day.src = "https://openweathermap.org/img/wn/" + icon5day + "@2x.png";
      console.log(icon5day);
      console.log(imgEl5day.src);

      var textEltemp = $("<p>");
      textEltemp.addClass("card-text");
      textEltemp.text("Temperature: " + weatherArray[i].main.temp + "°F");

      var textElhum = $("<p>");
      textElhum.addClass("card-text");
      textElhum.text("Humidity: " + weatherArray[i].main.humidity + "%");

      cardEl.append(bodyEl);
      bodyEl.append(titleEl);
      bodyEl.append(imgEl5day);
      bodyEl.append(textEltemp);
      bodyEl.append(textElhum);
      $(".5dayforecast").append(cardEl);
    }

    console.log(day1);
  });

  // ajax call for current weather
  $.ajax({
    url: queryURLtoday,
    method: "GET",
  }).then(function (responsetoday) {
    //adding the non UV Index values to current weather card
    $(".tempFtext").text("Temperature: " + responsetoday.main.temp + "°F");
    $(".humidityText").text("Humidity: " + responsetoday.main.humidity + "%");
    $(".windSpeedtext").text("Wind Speed: " + responsetoday.wind.speed + "mph");
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
