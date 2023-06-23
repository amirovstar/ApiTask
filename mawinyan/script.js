const unsplashAccessKey = 'NWLteXACs92KDRediJNNJtqdHTwLpKQQsBBe81iomw8';
const weatherAPIKey = '95fc596cc8a70714eb7185a184f87e25';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityImage = document.getElementById('city-image');
const weatherData = document.getElementById('weather-data');

searchBtn.addEventListener('click', fetchData);


document.getElementById('image-container').style.display = 'none';


async function fetchData() {
  const cityName = cityInput.value;
  const image = await fetchCityImage(cityName);
  const weather = await fetchWeatherData(cityName);

  let weatherCondition = 'default';
  if (weather.temp > 25) {
    weatherCondition = 'sunny';
  } else if (weather.temp > 15) {
    weatherCondition = 'cloudy';
  } else if (weather.temp > 5) {
    weatherCondition = 'rainy';
  } else if (weather.temp <= 5) {
    weatherCondition = 'snowy';
  }

  document.body.className = weatherCondition;

  if (image) {
    cityImage.src = image;
    
    document.getElementById('image-container').style.display = 'block';
  } else {
    cityImage.src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DljQbFosZ16M&psig=AOvVaw2meph_oZsdG4alFeb3qAKr&ust=1687551882786000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODA7OXa1_8CFQAAAAAdAAAAABAI';

    document.getElementById('image-container').style.display = 'none';
  }

  weatherData.textContent = `Current Temperature: ${weather.temp}°C`;
}


async function fetchCityImage(cityName) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashAccessKey}`);
    const data = await response.json();

    if (data.results.length > 0) {
        return data.results[0].urls.small;
    }
    return '';
}

async function fetchWeatherData(cityName) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherAPIKey}`);
    const data = await response.json();

    if (data.main) {
        return data.main;
    } else {
        console.error('Could not find weather', data);
        return { temp: 'unknown' };
    }
}
