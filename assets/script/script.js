var cityNameEl = $("#city-name");
var apiKey = "c30976a5c3073479b6a8bf4fa197f32c";
var cityInput = $("#input-text-field");
var searchBtn = $("#search-btn");
var latVal = $("#lat-val");
var lonVal = $("#lon-val");
var currDat = $("#current-date");
var currTemp = $("#temp");
var temp2 = $("#temp-2");
var temp3 = $("#temp-3");
var temp4 = $("#temp-4");
var temp5 = $("#temp-5");
var currWea = $('#curr-wea');
var wea2 = $("#wea-2");
var wea3 = $("#wea-3");
var wea4 = $("#wea-4");
var wea5 = $("#wea-5");
var currWin = $('#curr-win');
var win2 = $("#win-2");
var win3 = $("#win-3");
var win4 = $("#win-4");
var win5 = $("#win-5");
var currHum = $('#curr-hum');
var hum2 = $("#hum-2");
var hum3 = $("#hum-3");
var hum4 = $("#hum-4");
var hum5 = $("#hum-5");
var currUV = $('#curr-uvindex');
var uv2 = $("#uv-2");
var uv3 = $("#uv-3");
var uv4 = $("#uv-4");
var uv5 = $("#uv-5");
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
            currTemp.text(data.current.temp)
            temp2.text(data.daily[0].temp.day)
            temp3.text(data.daily[1].temp.day)
            temp4.text(data.daily[2].temp.day)
            temp5.text(data.daily[3].temp.day)      
            currWea.text(data.current.weather[0].description)
            wea2.text(data.daily[0].weather[0].description)
            wea3.text(data.daily[1].weather[0].description)
            wea4.text(data.daily[2].weather[0].description)
            wea5.text(data.daily[3].weather[0].description)
            currWin.text(data.current.wind_speed + "mph")
            win2.text(data.daily[0].wind_speed + "mph")
            win3.text(data.daily[1].wind_speed + "mph")
            win4.text(data.daily[2].wind_speed + "mph")
            win5.text(data.daily[3].wind_speed + "mph")
            currHum.text(data.current.humidity + " g.m-3")
            hum2.text(data.daily[0].humidity + " g.m-3")
            hum3.text(data.daily[1].humidity + " g.m-3")
            hum4.text(data.daily[2].humidity + " g.m-3")
            hum5.text(data.daily[3].humidity + " g.m-3")
            currUV.text(data.current.uvi)
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