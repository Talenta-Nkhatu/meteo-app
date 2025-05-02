function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "8944f371f4bfa78290t3baa86a330do0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}}&unit=metrics`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchForm);

searchCity("Paris");
