import { accessKey1 } from "./new.js";

let valueRadio;
let signature;
let city;
let weatherIcon;

const checkWeather = async () => {
  city = document.querySelector(".search-input").value;
  let radio = document.querySelectorAll(".radio-btn");
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      valueRadio = radio[i].value;
      break;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${accessKey1}&units=${valueRadio}`;

  const response = await fetch(url);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").textContent = `${data.name}`;

    valueRadio === "metric" ? (signature = "°C") : (signature = "°F");

    document.querySelector(".temp").textContent = `${Math.round(
      data.main.temp
    )}${signature}`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    weatherIcon = document.querySelector(".weather-icon");
    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "../images/clouds.png";
        weatherIcon.alt = "clouds";
        break;
      case "Clear":
        weatherIcon.src = "../images/clear.png";
        weatherIcon.alt = "clear";
        break;
      case "Drizzle":
        weatherIcon.src = "../images/drizzle.png";
        weatherIcon.alt = "drizzle";
        break;
      case "Mist":
        weatherIcon.src = "../images/mist.png";
        weatherIcon.alt = "mist";
        break;
      case "Rain":
        weatherIcon.src = "../images/rain.png";
        weatherIcon.alt = "rain";
        break;
      case "Snow":
        weatherIcon.src = "../images/snow.png";
        weatherIcon.alt = "snow";
        break;
      default:
        weatherIcon.innerHTML = "Image doesnt displayed, some error happend";
        break;
    }
    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

document.querySelector(".search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  checkWeather();
});
document.querySelector(".search-btn").addEventListener("click", checkWeather);
