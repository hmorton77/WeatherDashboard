var idNum;
var APIkey = "6dadd3c90772780ec35050af315cf499";
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

  for (var i = 0; i < cityID.length; i++) {
    if (cityName && stateName && cityID[i].name == cityName && cityID[i].state == stateName) {
      console.log(cityID[i].id);
    } else if (cityName && nationName && cityID[i].name == cityName && cityID[i].country == nationName) {
      console.log(cityID[i].id);
    }
  }
});
console.log(cityID[0].name);
var queryURL5day = "api.openweathermap.org/data/2.5/forecast?q=" + idNum + "&appid=" + APIkey;

// $.ajax({
//   url: queryURL5day,
//   method: "GET",
// }).then(function (response5day) {
//   console.log(response5day);
// });
