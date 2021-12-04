// DOM 
const cityInput = document.querySelector(".cityInput");
const cityName = document.querySelectorAll(".cityName");

// Display time before submit city
const time = new Date();
// console.log(time);
const year = time.getFullYear();
const month = time.getMonth();
const date = time.getDate();
const hour = time.getHours();
const minute = time.getMinutes();

$(".localDate").html(`${year} / ${month + 1} / ${String(date).padStart(2, "0")}`);
$(".localTime").html(`${String(hour).padStart(2, "0")} : ${String(minute).padStart(2, "0")}`);

// Display current location time 
// getCurrentTime function
function getCurrentTime() {
  $(".currentDateTime").html(`${year} / ${month + 1} / ${String(date).padStart(2, "0")}  ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
}

getCurrentTime();
setInterval(getCurrentTime, 60000);

// Display current weather function

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live ", lat, lon);
  const apiKey = "9c28b1c1d4f3cf2f1d5dcffb4edfd955";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    let icon = data['weather'][0]['icon'];
    let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`

    $("#weatherIcon").attr("src", iconUrl);
    $(".dscription").html(data.weather[0].main);
    $(".temp").html(`Temperature: ${data.main.temp}°F`);
    $(".tempRange").html(`Min/Max: ${data.main.temp_min}°F / ${data.main.temp_max}°F`);
    $(".humidity").html(`Humidity: ${data.main.humidity}%`);
  });
}

function onGeoError(){
  alert("Can't find your location. No weather for you.");
}

// Display current location weather
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

async function getLocalInfo() {
  // get weather information
  const apiKey = "9c28b1c1d4f3cf2f1d5dcffb4edfd955";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();

  let cityNameValue = data['name'];
  let countryNameValue = data['sys']['country'];
  let icon = data['weather'][0]['icon'];
  let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`

  cityName[0].innerHTML = `Weather in ${cityNameValue}, ${countryNameValue}`;
  cityName[1].innerHTML = `Time in ${cityNameValue}`;
  $("#weatherIcon").attr("src", iconUrl);
  $(".dscription").html(data.weather[0].main);
  $(".temp").html(`Temperature: ${data.main.temp}°F`);
  $(".tempRange").html(`Min/Max: ${data.main.temp_min}°F / ${data.main.temp_max}°F`);
  $(".humidity").html(`Humidity: ${data.main.humidity}%`)

  // get time information
  const now = new Date();
  let utcYear = now.getUTCFullYear();
  let utcMonth = now.getUTCMonth() + 1;
  let utcDate = now.getUTCDate();
  let utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();
  
  console.log( "UTC time : ", utcYear, utcMonth+1, utcDate, utcHour, utcMinute);
  // console.log(data.timezone);
  const gmtDiff = data.timezone/3600;
  console.log("GMT : " , gmtDiff);

  let cityYear = utcYear;
  let cityMonth = utcMonth;
  let cityDate = utcDate;
  let cityHour = utcHour + gmtDiff;
  const cityMinute = utcMinute;

  if (cityHour < 0) {
    cityHour = cityHour + 24;
    cityDate = utcDate - 1;
  } else if (cityHour >= 24) {
    cityDate = utcDate + 1;
    cityHour = cityHour -24;
  } 

  if (utcMonth == 0 || utcMonth == 2 || utcMonth == 4 || utcMonth == 6 || utcMonth == 7 || utcMonth == 9 || utcMonth == 11) {
    if (cityDate == 0) {
      cityMonth = utcMonth - 1;
      cityDate = 30;
    } else if (cityDate == 31) {
      cityMonth = utcMonth;
      cityDate = 1;
    } 
  } else {
    if (cityDate == 0) {
      cityMonth = utcMonth - 1;
      cityDate = 31;
    } else if (cityDate == 32) {
      cityMonth = utcMonth - 1;
      cityDate = 1;
    } 
  }
  // console.log("now city time", cityYear, cityMonth+1, cityDate, cityHour, cityMinute)
  $(".localDate").html(`${cityYear}/ ${cityMonth}/ ${String(cityDate).padStart(2, "0")}`);
  $(".localTime").html(`${String(cityHour).padStart(2, "0")} : ${String(cityMinute).padStart(2, "0")}`);
}


// city search event listener, get local information
$(".searchBtn").on("click", getLocalInfo);

// Currency APIs
// create options in select element from Currency API
const select = document.querySelectorAll(".select");
async function currency() {
  // e.preventDefault();
  const url = `https://api.frankfurter.app/currencies`;
  const response = await fetch(url)
  const data = await response.json();
  const entries = Object.entries(data);

  let i = 0;
  for (i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value=${entries[i][0]}>${entries[i][0]} : ${entries[i][1]}</option>`;
    select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;
  }
}

currency();

// Currency converter
const amountInput = document.querySelector("#amountInput");
const amountOutput = document.querySelector("#amountOutput");
const convertBtn = document.querySelector(".converter");

function currencyCheck() {
  const fromCurrency = select[0].value;
  const toCurrency = select[1].value;
  const amount = amountInput.value;
  if (fromCurrency !== toCurrency) {
    currencyConverter(fromCurrency, toCurrency, amount);
  } else {
    alert("Choose another currency");
  }
}

// Currency conver button add event listener

$(".converter").on("click", currencyCheck);

// Currency exchange rate API
async function currencyConverter(fromCurrency, toCurrency, amount) {
  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
  const response = await fetch(url);
  const data = await response.json();

  amountOutput.value = Object.values(data.rates)[0];
}