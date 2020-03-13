$(document).ready(function() {
  
  //declaring variables for longitude and latitude
  var lat;
  var lon;

  //this functions uses the navigator object to get the users coordinates
  function getLocation() {
    //if statement accounts for browsers without geolocation
    //if geoloation is allowed call gettemp function
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getTemp);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  //this function takes the user's lat and long with position from navigator
  function getTemp(position) {
    //setting lat and long
    lat = position.coords.latitude;  
    lon = position.coords.longitude;

    //calling openweathermap api

    //constructing api url 
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + lon + "&appid=fd2e981e85be0b6a6bbd5c82af3e6632"  
    //ajax call gets data from queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {
    
    //gets temp from openweather api and does calculation to convert from kelvin to fahrenheit 
    var temp = Math.round((parseInt(response.main.temp) - 273.15) * (9/5) + 32);
    //selecting paragraph from DOM
    var tempPara = $('.weather');
    //appending text and temp to page
    tempPara.text("Current Temperature : " + temp + " Degrees")
    console.log("Current Temperature : " + temp + " Degrees");
    
  })
  
    
  }
  //calls get location 
  getLocation();



  // listen for save button clicks
  $(".saveBtn").on("click", function() {

    //the sibling function with the class selector is used to select the child elements of the same parent who 
    //share the class name. 
    //the "value" variable is being assigned the value of the selected element's sibling with the description class identifier  
    var value = $(this).siblings(".description").val();

    //time is capturing the id of the selected element's parent element
    var time = $(this).parent().attr("id");

    // saving the time and value variables to local storage
    localStorage.setItem(time, value);
  });


  //this function is changing the appearance of the calendar
  function hourUpdater() {
    //moment is a js library used for making date time operations easier

    //var currentHour uses the hours method of moment to return the current hour.
    var currentHour = moment().hours();
    

    // each is a jquery method that is similar to a for each method in pure JS.
    //for each element with the time-block class the inline function is run
    $(".time-block").each(function() {

      //blockHour is taking the id (hour-8 for example) of the element with time-block class and stripping it 
      //of the "hour-" leaving just the number denoting which hour block it is.
      //parseInt is then used to convert the string numeric character into an integer. 
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // If statement is checking to see which blocks are before and after the current hour. 
      //if a block is before the current hour, the class past is added which alters the styling
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } 
      //if the blockhour equals the current hour, it is the current hour and is provided a special class.
      //the class past is removed, and present is added dynamically
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } 
      //if the block is not in the past and is not the present hour, past and present classes are removed and 
      //future class is appended. 
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  //calling hourUpdater function for page load
  hourUpdater();

  // set up interval to check if current time needs to be updated
  //hourUpdater is called every 15 seconds to stay 
  var interval = setInterval(hourUpdater, 15000);

  // This checks local storage for any saved events per hour and then updates the calendar
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  // display current day on page
  //Moment makes this simple and clean. there are several ways to display date time
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
