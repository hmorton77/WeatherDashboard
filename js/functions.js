//getting a the current date
function newDate() {
  var todayDate = new Date();
  todayYear = todayDate.getFullYear();
  todayMonth = parseInt(todayDate.getMonth()) + 1;
  todayDay = todayDate.getDate();
  displayDate = todayMonth + "/" + todayDay + "/" + todayYear;
}

function historyclick() {
  alert("success!");
}
var day1;
var day2;
var day3;
var day4;
var day5;
var weatherArray;

function cards5day(response5day) {
  //each weather forecast should be able to detect the time at noon of each day.
  day1 = response5day.list[2];
  day2 = response5day.list[10];
  day3 = response5day.list[18];
  day4 = response5day.list[26];
  day5 = response5day.list[34];
  //for each array, we will dynamically make a card.
  weatherArray = [day1, day2, day3, day4, day5];

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
}

var iconPic;
function cardsToday(responsetoday) {
  //adding the non UV Index values to current weather card
  $(".tempFtext").text("Temperature: " + responsetoday.main.temp + "°F");
  $(".humidityText").text("Humidity: " + responsetoday.main.humidity + "%");
  $(".windSpeedtext").text("Wind Speed: " + responsetoday.wind.speed + "mph");
  iconPic = responsetoday.weather[0].icon;
  //UV index
  latVal = responsetoday.coord.lat;
  lonVal = responsetoday.coord.lon;
  queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=" + APIkey;
  $.ajax({
    url: queryURLuv,
    method: "GET",
  }).then(function (responseUV) {
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
}

function URL5day(idNum) {
  //Dynamically generates a queryURL based off of the input
  queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?id=" + idNum + "&units=imperial&appid=6dadd3c90772780ec35050af315cf499";
}
function URLToday(idNum) {
  //same as the 5day queryURL generator, but for the current weather
  queryURLtoday = "https://api.openweathermap.org/data/2.5/weather?id=" + idNum + "&units=imperial&appid=6dadd3c90772780ec35050af315cf499";
}

function checkIDnum() {
  for (var i = 0; i < cityID.length; i++) {
    if (cityName && stateName && cityID[i].name == cityName && cityID[i].state == stateName) {
      idNum = cityID[i].id;
      break;
    } else if (cityName && nationName && cityID[i].name == cityName && cityID[i].country == nationName) {
      idNum = cityID[i].id;
      break; //(there are 2 cities named Berlin in Germany and it is a pain in the butt to try to differentiate them)
    }
  }
}
