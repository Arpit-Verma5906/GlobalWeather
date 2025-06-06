
const baseUrl = "https://globalweather-backend.onrender.com"

const searchInp = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-button");
const weatherIcon = document.querySelector("#WeatherImg");
const nextDayWetherIcon = document.querySelector("#NextDayForecastImg");

async function fetchForecast(city) {
    const url = `${baseUrl}/forecast?q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function checkWeather(city) {
    const forecast = await fetchForecast(city);
    const apiUrl = `${baseUrl}/weather?q=${city}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.status != 200) {
        alert("City not found or error in fetching weather.");
        return;
    }

    // Helper to format local time using UTC base
    const getLocalTimeString = (unixUTC, offsetInSeconds) => {
        const localTime = new Date((unixUTC + offsetInSeconds) * 1000);
        const hours = localTime.getUTCHours().toString().padStart(2, '0');
        const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // UNIX timestamps (in seconds)
    const sunriseUTC = data.sys.sunrise;
    const sunsetUTC = data.sys.sunset;
    const timezoneOffset = data.timezone;

    // Format temperature and weather info
    document.querySelector("#City").innerHTML = data.name;
    document.querySelector("#Temp").innerHTML = (data.main.temp) + "°C";
    document.querySelector("#WindSpeed").innerHTML = "Wind Speed: " + (data.wind.speed * 3.6).toFixed(1) + " Km/h";
    document.querySelector("#Sunrise").innerHTML = "Sunrise: " + getLocalTimeString(sunriseUTC, timezoneOffset);
    document.querySelector("#Sunset").innerHTML = "Sunset: " + getLocalTimeString(sunsetUTC, timezoneOffset);
    document.querySelector("#Humidity").innerHTML = "Humidity: " + data.main.humidity + " %";
    document.querySelector("#Visibility").innerHTML = "Visibility: " + (data.visibility / 1000).toFixed(1) + " km";
    document.querySelector("#Pressure").innerHTML = "Pressure: " + data.main.pressure + " hPa";
    document.querySelector("#WeatherConditionTitle").innerHTML = data.weather[0].description;

    if (data.weather[0].main == "Clear") {
        weatherIcon.src = "assets/images/clear-sky.png";
        document.body.style.backgroundImage = "url('assets/bg/sunny-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.backgroundImage = "url('assets/bg/sunny-bg.jpg')";
        document.querySelector("#locationMark").src = "assets/images/location-sunny.png";
        document.querySelector("#WeatherDashboard").style.color = "rgb(59, 64, 67)";
    } else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/images/cloudy.png";
        document.body.style.backgroundImage = "url('assets/bg/cloudy-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.backgroundImage = "url('assets/bg/cloudy-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.color = "rgb(252, 233, 211)";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "assets/images/rain.png";
        document.body.style.backgroundImage = "url('assets/bg/rain-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.backgroundImage = "url('assets/bg/rain-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.color = "rgb(164, 232, 232)";
        document.querySelector("#locationMark").src = "assets/images/location-rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/images/drizzle.png";
        document.body.style.backgroundImage = "url('assets/bg/rain-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.backgroundImage = "url('assets/bg/rain-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.color = "rgb(164, 232, 232)";
        document.querySelector("#locationMark").src = "assets/images/location-rain.png";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "assets/images/snow.png";
        document.body.style.backgroundImage = "url('assets/bg/hail-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.backgroundImage = "url('assets/bg/hail-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.color = "rgb(252, 233, 211)";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "assets/images/mist.png";
        document.body.style.backgroundImage = "url('assets/bg/hail-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.backgroundImage = "url('assets/bg/hail-bg.jpg')";
        document.querySelector("#WeatherDashboard").style.color = "rgb(252, 233, 211)";
    }

    document.querySelector("#NextDayTemp").innerHTML = "Temperature: " + (forecast.list[7].main.temp) + " °C";
    document.querySelector("#NextDayHumidity").innerHTML = "Humidity: " + (forecast.list[7].main.humidity) + " %";
    document.querySelector("#NextDayWindSpeed").innerHTML = "Wind Speed: " + (forecast.list[7].wind.speed * 3.6).toFixed(1) + " Km/h";
    document.querySelector("#NextDayVisibilty").innerHTML = "Visibility: " + Math.round((forecast.list[0].visibility / 1000).toFixed(1)) + " km";

    if (forecast.list[7].weather[0].main == "Clear") {
        nextDayWetherIcon.src = "assets/images/clear-sky.png";
    } else if (forecast.list[7].weather[0].main == "Clouds") {
        nextDayWetherIcon.src = "assets/images/cloudy.png";
    } else if (forecast.list[7].weather[0].main == "Rain") {
        nextDayWetherIcon.src = "assets/images/rain.png";
    } else if (forecast.list[7].weather[0].main == "Drizzle") {
        nextDayWetherIcon.src = "assets/images/drizzle.png";
    } else if (forecast.list[7].weather[0].main == "Snow") {
        nextDayWetherIcon.src = "assets/images/snow.png";
    } else if (forecast.list[7].weather[0].main == "Mist") {
        nextDayWetherIcon.src = "assets/images/mist.png";
    }

    document.querySelector("#Time1").innerHTML = (forecast.list[0].dt_txt).split(" ")[1].slice(0, 5);
    document.querySelector("#Time2").innerHTML = (forecast.list[1].dt_txt).split(" ")[1].slice(0, 5);
    document.querySelector("#Time3").innerHTML = (forecast.list[2].dt_txt).split(" ")[1].slice(0, 5);
    document.querySelector("#Time4").innerHTML = (forecast.list[3].dt_txt).split(" ")[1].slice(0, 5);
    document.querySelector("#Time5").innerHTML = (forecast.list[4].dt_txt).split(" ")[1].slice(0, 5);
    document.querySelector("#Time6").innerHTML = (forecast.list[5].dt_txt).split(" ")[1].slice(0, 5);

    document.querySelector("#Temp1").innerHTML = Math.round(forecast.list[0].main.temp) + " °C";
    document.querySelector("#Temp2").innerHTML = Math.round(forecast.list[1].main.temp) + " °C";
    document.querySelector("#Temp3").innerHTML = Math.round(forecast.list[2].main.temp) + " °C";
    document.querySelector("#Temp4").innerHTML = Math.round(forecast.list[3].main.temp) + " °C";
    document.querySelector("#Temp5").innerHTML = Math.round(forecast.list[4].main.temp) + " °C";
    document.querySelector("#Temp6").innerHTML = Math.round(forecast.list[5].main.temp) + " °C";

    if (forecast.list[0].weather[0].main == "Clear") {
        document.querySelector("#img1").src = "assets/images/clear-sky.png";
    } else if (forecast.list[0].weather[0].main == "Clouds") {
        document.querySelector("#img1").src = "assets/images/cloudy.png";
    } else if (forecast.list[0].weather[0].main == "Rain") {
        document.querySelector("#img1").src = "assets/images/rain.png";
    } else if (forecast.list[0].weather[0].main == "Drizzle") {
        document.querySelector("#img1").src = "assets/images/drizzle.png";
    } else if (forecast.list[0].weather[0].main == "Snow") {
        document.querySelector("#img1").src = "assets/images/snow.png";
    } else if (forecast.list[0].weather[0].main == "Mist") {
        document.querySelector("#img1").src = "assets/images/mist.png";
    }

    if (forecast.list[1].weather[0].main == "Clear") {
        document.querySelector("#img2").src = "assets/images/clear-sky.png";
    } else if (forecast.list[1].weather[0].main == "Clouds") {
        document.querySelector("#img2").src = "assets/images/cloudy.png";
    } else if (forecast.list[1].weather[0].main == "Rain") {
        document.querySelector("#img2").src = "assets/images/rain.png";
    } else if (forecast.list[1].weather[0].main == "Drizzle") {
        document.querySelector("#img2").src = "assets/images/drizzle.png";
    } else if (forecast.list[1].weather[0].main == "Snow") {
        document.querySelector("#img2").src = "assets/images/snow.png";
    } else if (forecast.list[1].weather[0].main == "Mist") {
        document.querySelector("#img2").src = "assets/images/mist.png";
    }

    if (forecast.list[2].weather[0].main == "Clear") {
        document.querySelector("#img3").src = "assets/images/clear-sky.png";
    } else if (forecast.list[2].weather[0].main == "Clouds") {
        document.querySelector("#img3").src = "assets/images/cloudy.png";
    } else if (forecast.list[2].weather[0].main == "Rain") {
        document.querySelector("#img3").src = "assets/images/rain.png";
    } else if (forecast.list[2].weather[0].main == "Drizzle") {
        document.querySelector("#img3").src = "assets/images/drizzle.png";
    } else if (forecast.list[2].weather[0].main == "Snow") {
        document.querySelector("#img3").src = "assets/images/snow.png";
    } else if (forecast.list[2].weather[0].main == "Mist") {
        document.querySelector("#img3").src = "assets/images/mist.png";
    }

    if (forecast.list[3].weather[0].main == "Clear") {
        document.querySelector("#img4").src = "assets/images/clear-sky.png";
    } else if (forecast.list[3].weather[0].main == "Clouds") {
        document.querySelector("#img4").src = "assets/images/cloudy.png";
    } else if (forecast.list[3].weather[0].main == "Rain") {
        document.querySelector("#img4").src = "assets/images/rain.png";
    } else if (forecast.list[3].weather[0].main == "Drizzle") {
        document.querySelector("#img4").src = "assets/images/drizzle.png";
    } else if (forecast.list[3].weather[0].main == "Snow") {
        document.querySelector("#img4").src = "assets/images/snow.png";
    } else if (forecast.list[3].weather[0].main == "Mist") {
        document.querySelector("#img4").src = "assets/images/mist.png";
    }

    if (forecast.list[4].weather[0].main == "Clear") {
        document.querySelector("#img5").src = "assets/images/clear-sky.png";
    } else if (forecast.list[4].weather[0].main == "Clouds") {
        document.querySelector("#img5").src = "assets/images/cloudy.png";
    } else if (forecast.list[4].weather[0].main == "Rain") {
        document.querySelector("#img5").src = "assets/images/rain.png";
    } else if (forecast.list[4].weather[0].main == "Drizzle") {
        document.querySelector("#img5").src = "assets/images/drizzle.png";
    } else if (forecast.list[4].weather[0].main == "Snow") {
        document.querySelector("#img5").src = "assets/images/snow.png";
    } else if (forecast.list[4].weather[0].main == "Mist") {
        document.querySelector("#img5").src = "assets/images/mist.png";
    }

    if (forecast.list[5].weather[0].main == "Clear") {
        document.querySelector("#img6").src = "assets/images/clear-sky.png";
    } else if (forecast.list[5].weather[0].main == "Clouds") {
        document.querySelector("#img6").src = "assets/images/cloudy.png";
    } else if (forecast.list[5].weather[0].main == "Rain") {
        document.querySelector("#img6").src = "assets/images/rain.png";
    } else if (forecast.list[5].weather[0].main == "Drizzle") {
        document.querySelector("#img6").src = "assets/images/drizzle.png";
    } else if (forecast.list[5].weather[0].main == "Snow") {
        document.querySelector("#img6").src = "assets/images/snow.png";
    } else if (forecast.list[5].weather[0].main == "Mist") {
        document.querySelector("#img6").src = "assets/images/mist.png";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInp.value);
    document.getElementById('city-input').value = "";
    document.getElementById('city-input').focus();
});

searchInp.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchInp.value);
        document.getElementById('city-input').value = "";
        document.getElementById('city-input').focus();
    }
});