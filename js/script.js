var idNum;
var APIkey = "6dadd3c90772780ec35050af315cf499";
var queryURL5day;
var queryURLtoday;
var inputCombo;
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
  });
});
