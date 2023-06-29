const apiKey = "4afb1285974cc14b3c84791c156150d4";

const cityInput = document.getElementById("cityInput");
const submitButton = document.querySelector(".submit");
const output = document.getElementById("output");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector(".tempCelsius span");
const descElement = document.querySelector(".description");
const weatherIconElement = document.querySelector("#weatherIcon");
const maxTempElement = document.querySelector("#max-temp span");
const minTempElement = document.querySelector("#min-temp span");
const followingDays = document.getElementById("followingDays")
const notFound = document.getElementById("not-found")
const searchBar = document.querySelector(".searchBar")

submitButton.addEventListener("click", handleButtonClick);
cityInput.addEventListener("keyup", handleEnterKey);

function handleButtonClick(e) {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
}

function handleEnterKey(e) {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
}

async function showWeatherData(city) {
    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeatherData(city),
        getForecastData(city),
      ]);
  
      // Display current weather
      cityElement.innerText = currentData.name;
      tempElement.innerText = Math.round(currentData.main.temp);
      descElement.innerText = currentData.weather[0].description;
      weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`
      );
      maxTempElement.innerText = Math.round(currentData.main.temp_max);
      minTempElement.innerText = Math.round(currentData.main.temp_min);
      output.classList.remove("hide");
      followingDays.classList.remove("hide");
  
      // Display forecast for the next 5 days
      for (let i = 0; i < 5; i++) {
        const minTempElement = document.getElementById("day" + (i + 1) + "Min");
        const maxTempElement = document.getElementById("day" + (i + 1) + "Max");
        const iconElement = document.getElementById("img" + (i + 1));
  
        const minTemp = Math.round(forecastData.list[i].main.temp_min);
        const maxTemp = Math.round(forecastData.list[i].main.temp_max);
        const icon = forecastData.list[i].weather[0].icon;
  
        minTempElement.innerHTML = minTemp + "°C";
  maxTempElement.innerHTML = maxTemp + "°C";
        iconElement.src = "http://openweathermap.org/img/wn/" + icon + ".png";
      }
  
    } catch (error) {
      notFound.classList.remove("hide");
      console.log("Error: ", error);
    }
  }
  
  async function getCurrentWeatherData(city) {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
  }
  
  async function getForecastData(city) {
    const apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`;
    const res = await fetch(apiForecastURL);
    const data = await res.json();
    return data;
  }

  for (let i = 0; i < 5; i++) {
    const dayElement = document.getElementById("day" + (i + 1));
    const iconElement = document.getElementById("img" + (i + 1));
    const dayNameElement = document.getElementById("day" + (i + 1) + "Name");
    const tempElement = document.getElementById("day" + (i + 1) + "Temp");
  
    const dayData = forecastData.list[i];
    const dayName = getDayName(dayData.dt);
    const icon = dayData.weather[0].icon;
    const temp = Math.round(dayData.main.temp);
  
    dayElement.innerHTML = dayName;
    iconElement.src = "http://openweathermap.org/img/wn/" + icon + ".png";
    dayNameElement.innerHTML = dayName;
    tempElement.innerHTML = temp + "°C";
  }
  
  function getDayName(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return days[dayIndex];
  }
  