/* Javascript goes here! */
//http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
//http://api.openweathermap.org/data/2.5/weather?q=London

$(document).ready(function(){
  //we always need this information
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  //this we get from the site - always need a key
  var apiKey ='9f7fe3b0ceb0a7cf1e86812469152bc0';

  function getWeatherData(city){
    var getWeather = $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: city,
      appid: apiKey,
      units: 'imperial'

    }
  });
  getWeather.done(function(response){

    //refers to name of city we are looking for
    var city = response.name;
    //refer to Weather App Screenshot
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    var clouds = response.clouds.all;
    //weather is array
    var description = response.weather[0].description;
    var icon = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';

    console.log(city, temperature, humidity, wind, clouds, icon);

    //put API response onto the webpage
    $('.results .results-city').text(city);
    $('.temperature-container .temperature').text(temperature + 'º');
    $('.humidity-container .humidity').text(humidity + "%");
    $('.wind-container .wind').text(wind + " miles per hour");
    $('.clouds-container .clouds').text(clouds + "%");
    $('.description-container .description').text(description);
    $('.icon-container .icon').html('<img src="' + icon + '"/>');


  });
  getWeather.fail(function(error){
    alert('error!', error);
    $('.getWeatherData .city-error').attr('style', 'display: block');
  });
  //always
  getWeather.always(function(){});
  }


  //event handlers

  function setHandlers(){
    $('.getWeatherData').on('submit', function(e){
      e.preventDefault();
      var city =$(this).find('.weather-city').val();
      getWeatherData(city);

    });
  }

  //set default to Austin; flow of webapp
  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main();
});
