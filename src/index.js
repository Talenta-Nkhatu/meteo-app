function showTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  console.log(response);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windspeedElement = document.querySelector("#wind-speed");
  windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `${formattedDay(date)},`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
      class="city-icon"
      src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
  console.log(getForecast);
}

function formattedDay(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${month} ${date.getDate()} ${date.getFullYear()} ${hours}:${minutes}`;
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value;
  let apiKey = `8944f371f4bfa78290t3baa86a330do0`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "8944f371f4bfa78290t3baa86a330do0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-container"> 
      <div class="weather-forecast">
          <div class="weather-forecast-day">${formatDay(day.time)}</div>
          <div class="weather-forecast-icon"> <img src="${
            day.condition.icon_url
          }" class="weather-forecast-icon" /> </div>
          <div class="weather-forecast-temperature">
            <div class="temp-1"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></div>
            <div class="temp-1">${Math.round(day.temperature.minimum)}°</div>
          </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchForm);

displayForecast();
getForecast();
