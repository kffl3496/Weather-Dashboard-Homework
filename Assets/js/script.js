// define global variables

$(document).ready(function() {
  showWeatherCards();
});

function getWeatherForCity(cityName) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName + "&appid=e12c3cf3c0965995dd5d55a59e5e6854&units=imperial";

  $.ajax({
    url: queryURL,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      var weather = {};
      weather.city = data.name;
      weather.date = new Date();
      weather.temp = data.main.temp;
      weather.humidity = data.main.humidity;
      weather.windspeed = data.wind.speed;
      // write to localStorage
      var weathercards = JSON.parse(localStorage.getItem('weathercards'));
      if (weathercards) {
        weathercards.push(weather);
      } else {
        var weathercards = [];
        weathercards.push(weather);
      }
      localStorage.setItem('weathercards', JSON.stringify(weathercards));
      showWeatherCards();
    }
  });
}

function onSelectCity() {
  var cityName = $('#cityName').val();
  getWeatherForCity(cityName);
}

function showWeatherCards() {
  var weathercards = JSON.parse(localStorage.getItem('weathercards'));
  var cards = '';
  for(var i = 0; i < weathercards.length; i++) {
    var weather = weathercards[i];
    cards += '<div class="weather-div flex-container flex-column">';
    cards += '<strong>' + weather.city + ' (' + weather.date + ')' + '</strong>';
    cards += '<br/>';
    cards += 'Tempature: ' + weather.temp + '&#176;F';
    cards += '<br/>';
    cards += 'Humidity: ' + weather.humidity + '%';
    cards += '<br/>';
    cards += 'Windspeed: ' + weather.windspeed + ' mph';
    cards += '</div>';
  }
  $('#weather-cards').html(cards);
}

