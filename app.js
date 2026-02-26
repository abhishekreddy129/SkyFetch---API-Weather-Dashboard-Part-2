const apiKey = "8e5805bef5462319012c71d0b5e0b3e2";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContainer = document.getElementById("weatherContainer");

async function getWeather(city) {
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();
  searchBtn.disabled = true;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    displayWeather(response.data);
  } catch (error) {
    showError("City not found. Please try again.");
  } finally {
    searchBtn.disabled = false;
  }
}

function displayWeather(data) {
  weatherContainer.innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    <p>🌡 ${data.main.temp} °C</p>
    <p>☁ ${data.weather[0].description}</p>
  `;
}

function showError(message) {
  weatherContainer.innerHTML = `
    <p class="error">${message}</p>
  `;
}

function showLoading() {
  weatherContainer.innerHTML = `
    <div class="spinner"></div>
  `;
}

// Button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  getWeather(city);
  cityInput.value = "";
});

// Enter key support
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    getWeather(city);
    cityInput.value = "";
  }
});

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


displayWeather({
  name: "London",
  main: { temp: 20 },
  weather: [{ description: "clear sky", icon: "01d" }]
});