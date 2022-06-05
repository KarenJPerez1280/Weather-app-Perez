let realTime = document.querySelector("#current-time");
let date = new Date();

let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let day = date.getDay();

let days = [
    "Sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

realTime.innerHTML = `${days[day]}, ${hours}:${minutes}`;

function showTemperature(response) {
    let h1 = document.querySelector(".cityName");
    h1.innerHTML = `${response.data.name}`;
    console.log(response.data);
    let temp = Math.round(response.data.main.temp);
    let tempFarenheit = document.querySelector(".farenheit");
    tempFarenheit.innerHTML = `${temp}°`;
    farenheitLink.classList.add("active");
    let description = document.querySelector(".mostly");
    description.innerHTML = response.data.weather[0].description;
    let windspeed = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind Speed: ${windspeed} mph`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    farenheitValue = response.data.main.temp;
    let max = Math.round(response.data.main.temp_max);
    let maxtemp = document.querySelector(".highOne");
    maxtemp.innerHTML = `${max}°F`;
    let min = Math.round(response.data.main.temp_min);
    let mintemp = document.querySelector(".lowOne");
    mintemp.innerHTML = `${min}°F`;
    let showIcone = document.querySelector("#sun");
    showIcone.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}


function searchCity(city) {
    let apiKey = "08638797b25b0ee2dd5b1bbc8fde3b75";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showTemperature);
}

function inputCity(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input-city").value;
    searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", inputCity);

function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "imperial";
    let apiKey = "08638797b25b0ee2dd5b1bbc8fde3b75";
    let url = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${url}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(getPosition);

function currentCity(event) {
    event.preventDefault();
    let city = document.querySelector("#current-location-button").value;
    getPosition(position);
}

function showCelciusTemperature(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    farenheitLink.classList.remove("active");

    let celciusTemperature = ((farenheitValue - 32) * 5) / 9;
    let tempValue = document.querySelector("#farenheit");
    tempValue.innerHTML = `${Math.round(celciusTemperature)}° `;
}
function showFarenheitTemperature(event) {
    event.preventDefault();
    farenheitLink.classList.add("active");
    celciusLink.classList.remove("active");
    let tempValue = document.querySelector("#farenheit");
    tempValue.innerHTML = `${Math.round(farenheitValue)}°`;
}




let farenheitValue = null;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("submit", currentCity);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", showCelciusTemperature);

let farenheitLink = document.querySelector("#farenheitLink");
farenheitLink.addEventListener("click", showFarenheitTemperature);

