function changeCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let currentCity = inputElement.value;
  cityElement.innerHTML = currentCity;
  fetchCity(currentCity);
}

function getTemperature(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = currentTemperature;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = `${response.data.condition.description} |`;
  humidityElement.innerHTML = `Humidity:<strong>${response.data.temperature.humidity}%</strong>`;
  windElement.innerHTML = `Wind:<strong>${response.data.wind.speed} km/h</strong>`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

  fetchForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function fetchCity(city) {
  let apiKey = "a745311c9tebfbc21o9ebe360e7a0417";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}
function formatForecastTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class=forecast-container>
         <div class="weather-forecast">
    
        <div class="temperature-day" id="forecast-day">${formatForecastTime(
          day.time
        )}</div>
        <div class="forecast-icon" id="forecast-icon">
            <img src="${day.condition.icon_url}" />
        </div>

        <div class="temperature-degrees">
            <div class="max-degree" id="max-temp">${Math.round(
              day.temperature.maximum
            )}°</div>
            <div class="min-degree" id="min-temp">${Math.round(
              day.temperature.minimum
            )}°</div>
        </div>
    </div>
    
    </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
function fetchForecast(city) {
  let forecastKey = "a745311c9tebfbc21o9ebe360e7a0417";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);
