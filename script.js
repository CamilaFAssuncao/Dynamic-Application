const apiKey = "4afb1285974cc14b3c84791c156150d4";


// Get the necessary DOM elements
let cityInput = document.getElementById("cityInput");
const submitButton = document.querySelector(".submit");
let output = document.getElementById("output");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector(".tempCelsius span");
const descElement = document.querySelector(".description");
const weatherIconElement = document.querySelector("#weatherIcon");
const maxTempElement = document.querySelector("#max-temp span");
const minTempElement = document.querySelector("#min-temp span");

// Event listener for the submit button
submitButton.addEventListener("click", predictTemp);

// Event listener for Enter key press
cityInput.addEventListener("keydown", pressEnter);

function pressEnter(event) {
  // Check if the Enter key was pressed
  if (event.key === "Enter") {
    let city = cityInput.value;
    predictTemp(city);
  }
}

function predictTemp(city) {
    // Retrieve the value of the city input
    let cityName = cityInput.value;
    getWeatherData(cityName)
      .then(data => {
        // Update the DOM elements with the fetched data
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        maxTempElement.innerText = parseInt(data.main.temp_max);
        minTempElement.innerText = parseInt(data.main.temp_min);
        
        // Show the weather data by removing the "hide" class from the output element
        output.classList.remove("hide");
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }
  
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};

const showWeatherData = async (city) => {
  // Call the getWeatherData function to fetch weather data
  const data = await getWeatherData(city);

  // Update the DOM elements with the fetched data
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

  // Show the weather data by removing the "hide" class from the output element
  output.classList.remove("hide");
};

// // Event listener for the submit button click
// submitButton.addEventListener("click", async (e) => {
//   e.preventDefault();

//   const city = cityInput.value;
//   showWeatherData(city);
// });

// // Event listener for Enter key press on the city input field
// cityInput.addEventListener("keyup", (e) => {
//   if (e.code === "Enter") {
//     const city = e.target.value;
//     showWeatherData(city);
//   }
// });

