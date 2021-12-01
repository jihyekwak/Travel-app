// API key
const apiKey = "9c28b1c1d4f3cf2f1d5dcffb4edfd955";

// DOM search
const cityInput = document.querySelector(".cityInput");
const searchBtn = document.querySelector(".searchBtn");

// DOM weather
const cityName = document.querySelectorAll(".cityName");
const weatherIcon = document.querySelector("#weatherIcon");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const tempRange = document.querySelector(".tempRange");
const humidity = document.querySelector(".humidity");

// city search event listener
searchBtn.addEventListener("click", getWeather);

// weather
function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let cityNameValue = data['name'];
        let countryNameValue = data['sys']['country'];
        let icon = data['weather'][0]['icon'];
        let descValue = data['weather'][0]['main'];
        let tempValue = data['main']['temp'];
        let tempMin = data['main']['temp_min'];
        let tempMax = data['main']['temp_max'];
        let humidityValue = data['main']['humidity'];

        cityName[0].innerHTML = `Weather in ${cityNameValue}, ${countryNameValue}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
        description.innerHTML = descValue;
        temp.innerHTML = `Temperature: ${tempValue}°F`;
        tempRange.innerHTML = `Min/Max: ${tempMin}°F / ${tempMax}°F`
        humidity.innerHTML = `Humidity: ${humidityValue}%`;
    })
}

// create options in select element from Currency API

const select = document.querySelectorAll(".select");

fetch(`https://api.frankfurter.app/currencies`)
.then(response => response.json())
.then(data => {
  const entries = Object.entries(data);
  for (var i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value=${entries[i][0]}>${entries[i][0]} : ${entries[i][1]}</option>`;
    select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;
  }
})

// Currency converter
const amountInput = document.querySelector("#amountInput");
const amountOutput = document.querySelector("#amountOutput");
const convertBtn = document.querySelector(".converter");

convertBtn.addEventListener("click", currencyCheck);

function currencyCheck() {
  let fromCurrency = select[0].value;
  let toCurrency = select[1].value;
  let amount = amountInput.value;
  if (fromCurrency != toCurrency) {
    currencyConverter(fromCurrency, toCurrency, amount);
  } else {
    alert("Choose another currency");
  }
}

// Currency exchange rate API
function currencyConverter(fromCurrency, toCurrency, amount) {
  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then((response) => response.json())
    .then((data) => {

      const output = Object.values(data.rates)[0]
      // console.log(data);
      // console.log(output);
      amountOutput.value = Object.values(data.rates)[0];
    })
}

// getTime
function getTime() {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  
  const currentDateTime = document.querySelector(".currentDateTime");
  currentDateTime.innerHTML = `${year}/${month+1}/${date} ${hour}:${minute}`;
}
getTime();
setInterval(getTime, 60000);
