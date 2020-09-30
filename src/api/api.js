import axios from 'axios';

// Weather API
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?';
const weatherAPI_KEY = 'd0a10211ea3d36b0a6423a104782130e';

export const getLocation = async () => {
  let coords = null;
  if (navigator.geolocation) {
    coords = await asyncGetCurrentPosition();
  } else {
    window.innerHTML = 'Geolocation is not supported by this browser.';
  }
  return coords;
};

const asyncGetCurrentPosition = () =>
  new Promise((success, error) => {
    navigator.geolocation.getCurrentPosition(success, error);
  });

export const fetchWeather = async (position) => {
  let weatherForecast = [];
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  await axios
    .get(
      `${weatherURL}lat=${lat}&lon=${lon}&appid=${weatherAPI_KEY}&units=metric`,
    )
    .then((resp) => {
      weatherForecast.push({
        thumbnail: resp.data.weather[0].main,
        temperature: resp.data.main.temp,
        location: resp.data.name,
      });
    });
  return weatherForecast;
};
