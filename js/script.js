// DOM search
const cityInput = document.querySelector(".cityInput");
// const searchBtn = document.querySelector(".searchBtn");

// DOM weather
const cityName = document.querySelectorAll(".cityName");
// const weatherIcon = document.querySelector("#weatherIcon");
// const description = document.querySelector(".description");
// const temp = document.querySelector(".temp");
// const tempRange = document.querySelector(".tempRange");
// const humidity = document.querySelector(".humidity");

// getCurrentTime function
function getCurrentTime() {
  const time = new Date();
  console.log(time);
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();

  // const currentDateTime = document.querySelector(".currentDateTime");
  // currentDateTime.innerHTML = `${year}/${month + 1}/${date} ${hour}:${minute}`;
  $(".currentDateTime").html(`${year}/${month + 1}/${date} ${hour}:${minute}`)
}

getCurrentTime();
setInterval(getCurrentTime, 60000);

async function getLocalInfo() {
  // get weather information
  // API key
  const apiKey = "9c28b1c1d4f3cf2f1d5dcffb4edfd955";
  // weather api
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();

  let cityNameValue = data['name'];
  let countryNameValue = data['sys']['country'];
  let icon = data['weather'][0]['icon'];
  let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`
  // let descValue = data['weather'][0]['main'];
  // let tempValue = data['main']['temp'];
  // let tempMin = data['main']['temp_min'];
  // let tempMax = data['main']['temp_max'];
  // let humidityValue = data['main']['humidity'];

  cityName[0].innerHTML = `Weather in ${cityNameValue}, ${countryNameValue}`;
  cityName[1].innerHTML = `Time in ${cityNameValue}`;
  $("#weatherIcon").attr("src", iconUrl);
  $(".dscription").html(data.weather[0].main);
  $(".temp").html(`Temperature: ${data.main.temp}°F`);
  $(".tempRange").html(`Min/Max: ${data.main.temp_min}°F / ${data.main.temp_max}°F`);
  $(".humidity").html(`Humidity: ${data.main.humidity}%`)


  // weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
  // description.innerHTML = descValue;
  // temp.innerHTML = `Temperature: ${tempValue}°F`;
  // tempRange.innerHTML = `Min/Max: ${tempMin}°F / ${tempMax}°F`
  // humidity.innerHTML = `Humidity: ${humidityValue}%`;

  // get time information

}

// city search event listener, get local information
// searchBtn.addEventListener("click", getLocalInfo);
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
// convertBtn.addEventListener("click", currencyCheck);
$(".converter").on("click", currencyCheck);

// Currency exchange rate API
async function currencyConverter(fromCurrency, toCurrency, amount) {
  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
  const response = await fetch(url);
  const data = await response.json();

  // const output = Object.values(data.rates)[0]
  // console.log(data);
  // console.log(output);
  amountOutput.value = Object.values(data.rates)[0];
}