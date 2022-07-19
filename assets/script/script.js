var cityNameEl = $("#city-name");
var apiKey = "c30976a5c3073479b6a8bf4fa197f32c";
var cityInput = $("#input-text-field");
var searchBtn = $("#search-btn");
var latVal = $("#lat-val");
var lonVal = $("#lon-val");
var part = "";


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
            console.log("saved latval : " + latVal.val())
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