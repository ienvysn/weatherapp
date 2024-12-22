const header = document.querySelector(".header");
const weatherContent = document.getElementById("weather-content");
const weatherApp = document.querySelector(".weather-app");
const humidity = document.querySelector(".humidity");
const highestTemp = document.querySelector(".highest-temp");
const lowestTemp = document.querySelector(".lowest-temp");
const temprature = document.querySelector(".temperature");
const weather = document.querySelector(".weather");
const rain = document.querySelector(".rain");
const city = document.querySelector(".city");
const searchInput = document.getElementById("search-input");

const Update = function (data) {
  if (searchInput) {
    // Show and animate the header
    header.classList.remove("hidden");
    header.classList.add("fade-in");

    // Hide the weather content first to reset the animation
    if (!weatherContent.classList.contains("hidden")) {
      weatherContent.classList.add("hidden");
    }

    // Force a reflow to restart the animation
    void weatherContent.offsetWidth;

    //  show the weather content wuth animation
    weatherContent.classList.remove("hidden");
    weatherContent.classList.add("fade-in");

    // Reset and animate the weather-app box every time
    weatherApp.classList.remove("visible");
    void weatherApp.offsetWidth; // Trigger reflow to restart animation
    weatherApp.classList.add("visible");

    // Update  the weather
    city.textContent = searchInput.value.trim();
    temprature.textContent = `${data.currentConditions.temp}°C`;
    humidity.textContent = `${data.currentConditions.humidity}%`;
    weather.textContent = `${data.days[0].conditions}`;
    highestTemp.textContent = `${data.days[0].tempmax}°C`;
    lowestTemp.textContent = `${data.days[0].tempmin}°C`;
    rain.textContent = `${data.days[0].precipprob}%`;

    // Clear the input field
    document.getElementById("search-input").value = "";
  }
};

document.getElementById("search-button").addEventListener("click", function () {
  const weather = fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchInput.value.trim()}?key=768X9YKNLNKX39EE3NMP7T2XU&unitGroup=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      Update(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching the data");
    });
});
