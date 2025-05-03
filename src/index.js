function showTemperature(response) {
  let tempElement = document.querySelector("#temp");

  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
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
