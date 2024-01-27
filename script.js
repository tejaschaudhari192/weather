var focusBox = document.getElementById('focusBox');
focusBox.focus();

function getWeather(gav) {
    const apiKey = '8d0892ff7ff24a1390e9ee93ffd916de';
    const city = gav;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var temp = (data.main.temp - 273.15).toFixed();
            var weatherIcon = getWeatherIcon(data.weather[0].icon);
            var weatherBg = getWeatherBg(data.weather[0].icon);
            console.log(weatherBg);
            var weather = data.weather[0].main;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;
            var pressure = data.main.pressure;
            var unixdt = data.dt;

            var dt = new Date(unixdt * 1000);
            var day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dt.getDay()];
            var month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august','september', 'october','november','december'][dt.getMonth()];
            let hours = ((dt.getHours()) % 12 || 12).toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'AM' : 'PM';
            const minutes = dt.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes} ${ampm}`;


            // let par = document.querySelector('.main-block').className;
            // console.log(par);
            var card = document.getElementById('weather-main');
            card.style.backgroundImage = `url('img/${weatherBg}')`

            var bg = document.getElementById('bg');
            bg.style.backgroundImage = `url('img/${weatherBg}')`;

            
            


            document.querySelector('.dt').innerHTML = `${dt.getDate()} ${month} <br> ${timeString}`;

            var tempString = `${temp}°C`;
            document.querySelector('.temp').innerHTML = tempString;

            console.log(weatherIcon);
            document.querySelector('.icon').innerHTML = weatherIcon;

            document.querySelector('.desc').innerHTML = weather;

            var humidityString = `${humidity}%`;
            document.querySelector('.humidity').innerHTML = humidityString;

            var windString = `${wind}m/s`;
            document.querySelector('.wind').innerHTML = windString;

            var pressureString = `${pressure}hPa`
            document.querySelector('.pressure').innerHTML = pressureString;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector('.desc').innerHTML = `${error.message}`;
        });
}

function getWeatherIcon(iconCode) {

    const iconMap = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '⛅',
        '02n': '☁️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌧️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️'
    };

    return iconMap[iconCode];
}

function getWeatherBg(iconCode) {
    const bgMap = {
        '01d': 'clear sky day.webp',
        '01n': 'clear sky night.webp',
        '02d': 'few clouds day.webp',
        '02n': 'few clouds night.webp',
        '03d': 'scattered clouds day.webp',
        '03n': 'scattered clouds night.webp',
        '04d': 'broken clouds day.webp',
        '04n': 'broken clouds night.webp',
        '09d': 'rain.webp',
        '09n': 'rain.webp',
        '10d': 'rain.webp',
        '10n': 'rain.webp',
        '11d': 'thuderstroms day.webp',
        '11n': 'thuderstrom night.webp',
        '13d': 'snow day.webp',
        '13n': 'snow night.webp',
        '50d': 'mist day.webp',
        '50n': 'mist night.webp'
    }

    return bgMap[iconCode];
}

getWeather('shirpur');


var searchBox = document.querySelector('.input-box input');


// searchBox.value = 'Shirpur';

searchBox.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        getWeather(searchBox.value)
    }
})