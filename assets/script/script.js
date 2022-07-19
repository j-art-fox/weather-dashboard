var cityNameEl = $("#city-name");
var apiKey = "c30976a5c3073479b6a8bf4fa197f32c";
var cityInput = $("#input-text-field");     
var searchBtn = $("#search-btn");



$("form").on("submit", function(event) {
    event.preventDefault();
    alert("test");
    findLatandLon ()
    updateCityName()
});

function findLatandLon() {
    var geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + $("#input-text-field").val() + '&limit=1&appid=' + apiKey;
    fetch(geoApiUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)
        var cityLat = data[0].lat
        var cityLon = data[0].lon
        console.log(cityLat + " and " + cityLon)
        
    });

}

function updateCityName(){
    $("#city-name").text($("#input-text-field").val());
}