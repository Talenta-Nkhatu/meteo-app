function showTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `, ${response.data.condition.description}`;
  console.log(response);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%,`;

  let windspeedElement = document.querySelector("#wind-speed");
  windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);
  console.log(date);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formattedDay(date);
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
  if (hours < 10) {
    hours = `0${hours}`;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchForm);
