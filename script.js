const apiKey = "4afb1285974cc14b3c84791c156150d4";
const unsplashAccessKey = "yYJ-Aansybh0t5LsTQ1HMP3XYy7FeeWycr36CeKohys";

const cityInput = document.getElementById("cityInput");
const submitButton = document.querySelector(".submit");
const output = document.getElementById("output");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector(".tempCelsius span");
const descElement = document.querySelector(".description");
const weatherIconElement = document.querySelector("#weatherIcon");
const maxTempElement = document.querySelector("#max-temp span");
const minTempElement = document.querySelector("#min-temp span");
const followingDays = document.getElementById("followingDays");
const notFound = document.getElementById("not-found");
const searchBar = document.querySelector(".searchBar");
const apiUnsplash = "https://api.unsplash.com/photos/random?query=";


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
      fetchBackgroundImage(city)
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

  
        // Display forecast for the next 5 days
        const forecastDays = forecastData.list;
        const currentDate = new Date();
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        let forecastIndex = 0;
    
        for (let i = 0; i < 5; i++) {
          let dayData = null;
    
          // Find the forecast data that corresponds to the current day
          while (forecastIndex < forecastDays.length) {
            const forecastDate = new Date(forecastDays[forecastIndex].dt_txt);
    
            if (forecastDate.getDate() === tomorrow.getDate()) {
              dayData = forecastDays[forecastIndex];
              break;
            }
    
            forecastIndex++;
          }
    
          if (dayData && dayData.weather && dayData.weather[0] && dayData.weather[0].icon) {
            const dayName = getDayName(dayData.dt);
            const icon = dayData.weather[0].icon;
    
            // Initialize the min and max temperatures for each day
            let minTemp = Infinity;
            let maxTemp = -Infinity;
    
            // Find the min and max temperatures within the day
            while (forecastIndex < forecastDays.length) {
              const hourData = forecastDays[forecastIndex];
    
              if (new Date(hourData.dt_txt).getDate() !== tomorrow.getDate()) {
                break;
              }
    
              if (hourData && hourData.main && hourData.main.temp_max && hourData.main.temp_min) {
                // Update the min and max temperatures if necessary
                if (hourData.main.temp_max > maxTemp) {
                  maxTemp = hourData.main.temp_max;
                }
                if (hourData.main.temp_min < minTemp) {
                  minTemp = hourData.main.temp_min;
                }
              }
    
              forecastIndex++;
            }
    
            const iconElement = document.getElementById("img" + (i + 1));
            const dayNameElement = document.getElementById("day" + (i + 1) + "Name");
            const maxTempElement = document.getElementById("day" + (i + 1) + "Max");
            const minTempElement = document.getElementById("day" + (i + 1) + "Min");
    
            iconElement.src = "http://openweathermap.org/img/wn/" + icon + ".png";
            dayNameElement.innerHTML = dayName;
            maxTempElement.innerHTML = Math.round(maxTemp) + "°C";
            minTempElement.innerHTML = Math.round(minTemp) + "°C";
          }
    
          tomorrow.setDate(tomorrow.getDate() + 1);
        }

    // Show the output and hide the "not-found" div
    output.classList.remove("hide");
    notFound.classList.add("hide");
    followingDays.classList.remove("hide");
  } catch (error) {
    // Show the "not-found" div and hide the output and followingDays div
    notFound.classList.remove("hide");
    output.classList.add("hide");
    followingDays.classList.add("hide");
    console.log("Error: ", error);
  }
}

async function fetchBackgroundImage(city) {
    try {
      const unsplashEndpoint = `${apiUnsplash}${city}&client_id=${unsplashAccessKey}`;
      const response = await fetch(unsplashEndpoint);
      const data = await response.json();
      const imageUrl = data.urls.regular; // Extract the URL of the image
      // Set the background image of your page using the retrieved URL
      document.body.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
      console.log("Error fetching background image:", error);
    }
  }

async function getCurrentWeatherData(city) {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
}

async function getForecastData(city) {
  const apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  const res = await fetch(apiForecastURL);
  const data = await res.json();
  console.log(data)
  return data;
}

function isForecastDay(index) {
  // Check if the index corresponds to 12:00 PM (noon)
  return index % 8 === 4;
}

function getDayName(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getDay();
  return days[dayIndex];
}


