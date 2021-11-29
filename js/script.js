// API key
const apiKey = "9c28b1c1d4f3cf2f1d5dcffb4edfd955";

// DOM search
const cityInput = document.querySelector(".cityInput");
const searchBtn = document.querySelector(".searchBtn");

// DOM weather
const cityName = document.querySelector("#cityName");
const weatherIcon = document.querySelector("#weatherIcon");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const tempRange = document.querySelector(".tempRange");
const humidity = document.querySelector(".humidity");

// event listener
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

        cityName.innerHTML = `Weather in ${cityNameValue}, ${countryNameValue}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
        description.innerHTML = descValue;
        temp.innerHTML = `Temperature: ${tempValue}°F`;
        tempRange.innerHTML = `Min/Max: ${tempMin}°F / ${tempMax}°F`
        humidity.innerHTML = `Humidity: ${humidityValue}%`;
    })
}