

// used to round the temperature down
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

// button on the document that asks for geolocation
$('#weatherBtn').click(function(){
  navigator.geolocation.getCurrentPosition(success, error);
});

// what will fire after pressing weatherBtn
// if geolocation comes back 'successful'
function success(pos) {
  var key = '839a0a3fb8a969521811c10b4b873417';
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude : ${crd.longitude}`);
  console.log(`Accuracy : ${crd.accuracy} meters.`);
// GET request using jquery at openweathermap
  $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&APPID=${key}`, function(data){
    console.log(data);
    var tempCel = precisionRound(data.main.temp - 273.15, 2);
    var tempFahr = precisionRound((data.main.temp - 273.15) * 1.8 + 32, 2);
    $('#temp').html(`Temperature in ${data.name}: ${tempCel}\xB0C`);
    $('#weatherIcon').html(`<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png' alt='${data.weather[0].description}'>`);
    $('#weatherMain').html(`${data.weather[0].main}`);
// converts displayed temperature from celsius to fahrenheit and vice versa
    $('#cnvrtBtn').html('\xB0F')
// inline style so the backgroud color won't show up until the button is pressed
    .css('background-color', 'white').css('color','black')
    .on('click', function(){
      var btn = document.querySelector('#cnvrtBtn');
      var chckAtrbt = btn.getAttribute('class');
      var temp = document.querySelector('#temp');
      if(chckAtrbt === 'cel') {
        btn.setAttribute('class', 'fahr');
        btn.textContent = '\xB0C';
        temp.textContent = `Temperature in ${data.name}: ${tempFahr}\xB0F`;
      } else {
        btn.setAttribute('class', 'cel');
        btn.textContent = '\xB0F';
        temp.textContent = `Temperature in ${data.name}: ${tempCel}\xB0C`;
      }
    });
  });
}

// if geolocation comes back 'unsuccessful'
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  $('#temp').html(`ERROR(${err.code}): ${err.message}`);
}
