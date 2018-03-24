$(document).ready(function() {
  var submitButton = $("#weatherSubmit");
  console.log(submitButton);
  $("#weatherSubmit").click(function(e) {
    e.preventDefault();
    var value = $("#weatherInput").val();
    console.log(value);
    var myurl = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=d01495e2288a3671d99f96f831b66748";
    $.ajax({
      url : myurl,
      dataType : "json",
      success : function(json) {
        console.log(json);
        var results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        for (var i=0; i<json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &degF</h2>";
        results += "<p>";
        for (var i=0; i<json.weather.length; i++) {
            results += json.weather[i].description;
            if (i !== json.weather.length - 1)
                results += ", ";
        }
        results += ", wind speed " + json.wind.speed + "mph, humidity " + json.main.humidity + " percent";
        results += "</p>";
        $("#weatherResults").html(results);
      }
    });
  });

  var submitButton2 = $("#stackSubmit");
  console.log(submitButton2);
  $("#stackSubmit").click(function(e) {
    e.preventDefault();
    var value = $("#stackInput").val();
    console.log(value);
    var myurl = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + value;
    $.ajax({
      url : myurl,
      dataType : "json",
      success : function(json) {
        console.log(json);
        var results = "";
        results += 'Top Results of \"' + value + '\" from Stackoverflow';
        results += '<ul>';
        for (var i=0; i< 3; i++) {
          results += '<li>' + '<a href="'+ json.items[i].link +'">' + json.items[i].title + '</a>';
        }
        results += '</ul>';
        $("#stackResults").html(results);
      }
    });
  });
});

function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}
