const token = "d591077569952be4b1fda8484b6eced2";

// DOM Elements
const elForm = document.querySelector(".form");
const elFormInput = elForm.querySelector(".searchInput");
const elCurrentWeatherBox = document.querySelector(".infogram_left");
const elWeatherIcon = elCurrentWeatherBox.querySelector(".infogram_current-weather-icon");
const elSunrise = elCurrentWeatherBox.querySelector(".infogram_sunrise");
const elSunset = elCurrentWeatherBox.querySelector(".infogram_sunset");
const elDate = elCurrentWeatherBox.querySelector(".infogram_date");
const elCelcium = elCurrentWeatherBox.querySelector(".infogram_celcium");
const elInfo = elCurrentWeatherBox.querySelector(".infogram_info");
const elLocationn = elCurrentWeatherBox.querySelector(".infogram_location");
const elWind = elCurrentWeatherBox.querySelector(".infogram_wind");
const elHumidity = elCurrentWeatherBox.querySelector(".infogram_humidity");
const elPressure = elCurrentWeatherBox.querySelector(".infogram_pressure");
const elCitiesList = document.querySelector(".cities_list");
const elHourlyList = document.querySelector(".hourly_list");
const elDailyList = document.querySelector(".daily_list");
const elCitiesTemplate = document.querySelector("#cities").content;
const elCurrentWeatherTemplate = document.querySelector("#current").content;
const elDailyItemsTemplate = document.querySelector("#daily").content;
const elHouryItemsTemplate = document.querySelector("#hourly").content;

const fragment = document.createDocumentFragment();
const dailyFragment = document.createDocumentFragment();


let b = (1668737669 + 18000) * 1000

console.log(new Date(b))

// Weather icons fill mode 

let dailyWeatherIcons = {
    "Clear": "./animation-ready/clear-day.svg",
    "Clouds": "./animation-ready/cloudy.svg",
    "Rain": "./animation-ready/rain.svg",
    "Snow": "./animation-ready/snow.svg",
    "Mist": "./animation-ready/mist.svg",
}

// Weather icons line mode 


let weatherIcons = {
    "Clear": "../icons/clear-day.svg",
    "Clouds": "../icons/cloudy.svg",
    "Rain": "../icons/rain.svg",
    "Snow": "../icons/snow.svg",
    "Mist": "../icons/mist.svg",
}

let daysEng = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dayTime = ["NIGHT", "MORNING", "DAY", "EVENING"]


// Show day names in daily weather

function displayaDailyDayNames(data) {
    return `${daysEng[(new Date(data * 1000).getDay())]}`
}


// Show day dates in daily weather

function displayaDailyDays(param) {
    return `${new Date(param * 1000).getDate()} ${months[(new Date (param * 1000).getMonth())]}`
}


// Show daily weather icons for presudo-elements (::before)

function displayDailyWeatherIconShow(info, cloned, selectorClass, attr, url, els) {
    
    
    if (info == "Rain") return  cloned.querySelector(selectorClass).style.setProperty(attr, `url(${url.Rain})`); 
    
    else if (info == "Clouds") return  cloned.querySelector(selectorClass).style.setProperty(attr, `url(${url.Clouds})`); 
    
    else if (info == "Clear") return  cloned.querySelector(selectorClass).style.setProperty(attr, `url(${url.Clear})`); 
    
    else if (info == "Snow") return  cloned.querySelector(selectorClass).style.setProperty(attr, `url(${url.Snow})`); 
    
    else if (info == "Mist") return  cloned.querySelector(selectorClass).style.setProperty(attr, `url(${url.Mist})`); 
    
    else return cloned.querySelector(selectorClass).style.setProperty(attr, `url(https://openweathermap.org/img/wn/${els}.png`);
}


// Show currently weather icon

function displayCurrentWeatherIconShow(info, cloned, selectorClass, els) {
    if (info == "Clear") return cloned.querySelector(selectorClass).src = dailyWeatherIcons.Clear
    
    else if (info == "Clouds") return cloned.querySelector(selectorClass).src = dailyWeatherIcons.Clouds
    
    else if (info == "Rain") return cloned.querySelector(selectorClass).src = dailyWeatherIcons.Rain
    
    else if (info == "Mist") return cloned.querySelector(selectorClass).src = dailyWeatherIcons.Mist
    
    else if (info == "Snow") return  cloned.querySelector(selectorClass).src = dailyWeatherIcons.Snow;

     
    else return cloned.querySelector(selectorClass).src= `https://openweathermap.org/img/wn/${els}.png`;
    
}



// Show other cities weathers

async function citiesWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`);
        const data = await response.json();
        
        for (let i = 0; i < 1; i++) {
            
            let country = data.sys.country;   
            let countryName = data.name;
            let weatherInfo = data.weather[0].main;
            let temp = data.main.temp;
            
            const cloned = elCitiesTemplate.cloneNode(!0);
            cloned.querySelector(".citiesCountry").textContent = country;
            cloned.querySelector(".cities_city").textContent = countryName;
            cloned.querySelector(".cities_info").textContent = weatherInfo;
            cloned.querySelector(".cities_celcium").textContent = `${Math.floor(temp)} °C`;
            cloned.querySelector(".cities_more-info").dataset.name = countryName
            
            displayCurrentWeatherIconShow(weatherInfo, cloned, ".cities_info-icon", data.weather[0].icon);
            
            fragment.appendChild(cloned);
        }
        
        elCitiesList.appendChild(fragment);
    } catch (error) {
        console.log(error)
    }
}


// Current weather rendering 

async function currentWeather(defaultt = "Tashkent") {
    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defaultt}&appid=${token}&units=metric`);
        const data = await response.json();
        
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        let weather = data.weather;
        let hour = document.querySelectorAll(".hourly_time-names");
        
        for (let i = 0; i < data.weather.length; i++) {
            elCurrentWeatherBox.innerHTML = ""
            
            const cloned = elCurrentWeatherTemplate.cloneNode(!0);
            
            cloned.querySelector(".infogram_sunrise").textContent += getSuns(sunrise);
            cloned.querySelector(".infogram_sunset").textContent += getSuns(sunset);
            cloned.querySelector(".infogram_date").textContent = `${displayaDailyDayNames(data.dt)} ${displayaDailyDays(data.dt)} ${new Date().toTimeString().slice(0, 5)}`
            cloned.querySelector(".infogram_celcium").textContent += Math.floor(data.main.temp);
            
            displayCurrentWeatherIconShow(weather[i].main, cloned, ".infogram_current-weather-icon", weather[0].icon)
            cloned.querySelector(".infogram_info").textContent =  weather[i].description.replace(weather[i].description[0], weather[i].description[0].toUpperCase());
            cloned.querySelector(".infogram_location").textContent = `${data.name}, ${data.sys.country}`;
            cloned.querySelector(".infogram_wind").textContent += `${Math.floor(data.wind.speed)}m/s`;
            cloned.querySelector(".infogram_humidity").textContent += `${data.main.humidity}%`;
            cloned.querySelector(".infogram_pressure").textContent += `${data.main.pressure}mm`;
            
            fragment.appendChild(cloned);
            
        }
        
        elCurrentWeatherBox.appendChild(fragment)
        
        
    } catch (error) {
        console.log(error);
    }
    
}


// Show daily && hourly weather

async function dailyWeather(defaultt = "Tashkent") {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${defaultt}&appid=${token}&units=metric`);
        const data = await response.json();
        
        let list = data.list;
        let res = list.filter(item => {
            return item.dt_txt.endsWith("12:00:00");
        });

        // Daily weather rendering
        
        elHourlyList.innerHTML = "";
        elDailyList.innerHTML = ""
        for (let i = 0; i < 5; i++) {
            
            let weatherDesc = res[i].weather[0].main;
            
            const cloned = elDailyItemsTemplate.cloneNode(!0);
            cloned.querySelector(".daily_day").textContent = displayaDailyDayNames(res[i].dt)
            cloned.querySelector(".daily_date").textContent = displayaDailyDays(res[i].dt)
            cloned.querySelector(".daily_min").textContent = `${Math.floor(res[i].main.temp_min)}°`;
            cloned.querySelector(".daily_max").textContent = `${Math.ceil(res[i].main.temp_max)}°`;
            cloned.querySelector(".daily_info").textContent = `${weatherDesc}`;
            
            displayDailyWeatherIconShow(weatherDesc, cloned, ".daily_info", "--daily", weatherIcons, res[i].weather[0].icon)
            
            dailyFragment.appendChild(cloned)
        }
        
        // Hourly weather rendering

        for (let i = 0; i < 8; i++) {
            
            let weatherDesc = list[i].weather[0].main;
            let time = list[i].dt_txt.slice(10, 16);
            
            const cloned = elHouryItemsTemplate.cloneNode(!0);
            
            displayDailyWeatherIconShow(weatherDesc, cloned, ".hourly_value", "--im", weatherIcons, list[i].weather[0].icon)
            
            cloned.querySelector(".hourly_value").textContent = `${Math.floor(list[i].main.temp)}°`;
            cloned.querySelector(".hourly_time").textContent = time;
            
            fragment.appendChild(cloned);
        }
        
        elHourlyList.appendChild(fragment);
        
        elDailyList.appendChild(dailyFragment)
        
    } catch (error) {
        console.log(error);
    }
}


// Function for beautiful time

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


// Function converts milliseconds time to time

function getSuns(param) {
    let hours = new Date(param * 1000).getHours();
    let minutes = new Date(param * 1000).getMinutes();
    return `${formatTime(hours)}: ${formatTime(minutes)}`
}



// Form events

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let value = elFormInput.value;

    currentWeather(defaultt = value)
    dailyWeather(defaultt = value)

});


// Other cities cards event delegation

elCitiesList.addEventListener("click", (evt) => {
    evt.preventDefault();
    
    const targeted = evt.target.dataset.name;
    
    currentWeather(defaultt = targeted)
    dailyWeather(defaultt = targeted)
    
});



citiesWeather("Berlin")
citiesWeather("Dubai")
citiesWeather("Reading")
citiesWeather("Istanbul")
citiesWeather("Amsterdam")
currentWeather()
dailyWeather()


