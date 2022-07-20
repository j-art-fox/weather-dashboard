var cityNameEl = $("#city-name");
var apiKey = "c30976a5c3073479b6a8bf4fa197f32c";
var cityInput = $("#input-text-field");
var searchBtn = $("#search-btn");
var latVal = $("#lat-val");
var lonVal = $("#lon-val");
var currWea = $('#curr-wea');
var currWin = $('#curr-win');
var currHum = $('#curr-hum');
var currUV = $('#curr-uvindex');
var part = "";
var unixDate: TimeInterval = 1590689991;


$("form").on("submit", function (event) {
    event.preventDefault();
    alert("test");
    updateCityName();
    findLatandLon();

});

var cityLat = "";
var cityLon = "";

function findLatandLon() {
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
        var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=" + part + "&appid=" + apiKey;
        fetch(weatherApiUrl).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            currWea.text(data.current.weather[0].description)
            currWin.text(data.current.wind_speed + "mph")
            currHum.text(data.current.humidity)
            currUV.text(data.current.uvi)
        });
    })
};


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