$(document).ready(function() {
  if (navigator.geolocation) {
    // If geo-location data is available
    
    // get the user's current geo-location
    navigator.geolocation.getCurrentPosition(function(position) {
      // Geo-location
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // Temperature
      var tempCel = 0; // The API returns temperature in Celsius
      var tempFah = 0;
      var isCelsius = true; // Celcius/Fahrenheit flag
      
      // get current weather data
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude, function(json) {        
        // Weather Main
        $("#weatherMain").html(json.weather[0].main);
        // Weather Description
        $("#weatherDesc").html(json.weather[0].description);
        // Weather Icon
        $("#weatherIcon").attr("src", json.weather[0].icon);
        // Temperature (display in Celsius by default)
        tempCel = Math.floor(json.main.temp);
        tempFah = Math.floor(tempCel * 9/5 + 32); // Convert temperature to Fahrenheit
        $("#temp").html(tempCel + "°C");
        // Location
        $("#loc").html(json.name + ", " + json.sys.country);
        
        // Background Image
        var weather = json.weather[0].main.toLowerCase();
        // Vary background image depending on some weather
        if (weather.includes("rain")) {
          $("body").css("background-image", "url(\"https://res.cloudinary.com/cd0hgkqgk/image/upload/v1518736018/a0960_008102_m_sf6egs.jpg\")");
        } else if (weather.includes("cloud")) {
          $("body").css("background-image", "url(\"https://res.cloudinary.com/cd0hgkqgk/image/upload/v1518736018/a1150_000734_m_wci48m.jpg\")");
        } else if (weather.includes("snow")) {
          $("body").css("background-image", "url(\"https://res.cloudinary.com/cd0hgkqgk/image/upload/v1518736017/a0790_001054_m_ux0byj.jpg\")");
        } else {
        $("body").css("background-image", "url(\"http://res.cloudinary.com/cd0hgkqgk/image/upload/v1518736017/a0960_004328_m_sx4zrt.jpg\")");
        } // End if (backbround image)
      });
      
      // Toggle between Celcius/Fahrenheit
      $(".convertTemp").on("click", function() {
        if (isCelsius) {
            $("#temp").html(tempFah + "°F");
            isCelsius = false;
            } else {
              $("#temp").html(tempCel + "°C");
              isCelsius = true;
            }
      });
      
    },
    // If geo-location data is not available
    function(error) {
      $("#weatherDesc").html("Could not access geo-location data");
      $(".hide").html("");
    });    
  } // End if
});