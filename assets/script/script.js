var cityNameEl = $("#city-name");
var apiKey = "c30976a5c3073479b6a8bf4fa197f32c";
var cityInput = $("#input-text-field");
var searchBtn = $("#search-btn");
var latVal = $("#lat-val");
var lonVal = $("#lon-val");
var currDat = $("#current-date");
var currTemp = $("#temp");
var currWea = $('#curr-wea');
var currWin = $('#curr-win');
var currHum = $('#curr-hum');
var currUV = $('#curr-uvindex');
var weaIcon = $('#weather-icon');
var weaIcon2 = $('#weather-icon-2');
var weaIcon3 = $('#weather-icon-3');
var weaIcon4 = $('#weather-icon-4');
var weaIcon5 = $('#weather-icon-5');
var part = "";
    // var usabledate = date()

    $("form").on("submit", function (event) {
        event.preventDefault();
        alert("test");
        updateCityName();
        fetchWeather();

    });

var cityLat = "";
var cityLon = "";

function fetchWeather() {
    var geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.val() + '&limit=1&appid=' + apiKey;
    fetch(geoApiUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)
        var cityLat = data[0].lat
        var cityLon = data[0].lon
        console.log(cityLat + " and " + cityLon)
        latVal.text(cityLat)
        lonVal.text(cityLon)
        var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&exclude=" + part + "&appid=" + apiKey;
        fetch(weatherApiUrl).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            var iconId = data.current.weather[0].icon
            var iconId2 = data.daily[0].weather[0].icon
            var iconId3 = data.daily[1].weather[0].icon
            var iconId4 = data.daily[2].weather[0].icon
            var iconId5 = data.daily[3].weather[0].icon
            currWea.text(data.current.weather[0].description)
            currWin.text(data.current.wind_speed + "mph")
            currHum.text(data.current.humidity)
            currUV.text(data.current.uvi)
            currTemp.text(data.current.temp)
            var currTimeUnix = data.current.dt
            var currDT = moment.unix(currTimeUnix).format("MMM Do, YYYY, hh:mm:ss")
            currDat.text(currDT)
            weaIcon.attr("src", "http://openweathermap.org/img/wn/" + iconId + "@2x.png")
            weaIcon2.attr("src", "http://openweathermap.org/img/wn/" + iconId2 + "@2x.png")
            weaIcon3.attr("src", "http://openweathermap.org/img/wn/" + iconId3 + "@2x.png")
            weaIcon4.attr("src", "http://openweathermap.org/img/wn/" + iconId4 + "@2x.png")
            weaIcon5.attr("src", "http://openweathermap.org/img/wn/" + iconId5 + "@2x.png")
            updateDates()

        });
    })
};

var tomorrow = moment().add(1,"days").format("MMM Do, YYYY");
var theDayAfterTomorrow = moment().add(2,"days").format("MMM Do, YYYY");
var theDayAfterTheDayAfterTomorrow = moment().add(3,"days").format("MMM Do, YYYY");
var theDayAftertheDayAfterTheDayAfterTomorrow = moment().add(4,"days").format("MMM Do, YYYY");
var day2 = $('#day-2');
var day3 = $('#day-3');
var day4 = $('#day-4');
var day5 = $('#day-5');

function updateDates(){
    day2.text(tomorrow)
    day3.text(theDayAfterTomorrow)
    day4.text(theDayAfterTheDayAfterTomorrow)
    day5.text(theDayAftertheDayAfterTheDayAfterTomorrow)
}

// function findWeatherInfo() {
//     var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=" + part + "&appid=" + apiKey;
//     fetch(weatherApiUrl).then(function (response) {
//         return response.json()
//     }).then(function (data) {
//         console.log(data)
//         console.log("saved latval : " + latVal.val())
//     });
// }

function updateCityName() {
    $("#city-name").text($("#input-text-field").val().toUpperCase());
}