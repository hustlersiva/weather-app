console.log("hello world");
const api = "https://api.openweathermap.org/data/2.5/weather?appid=3b73b13e2174587deae8abe154529179&units=metric&q=";
const wi = document.querySelector(".weathericon");
const errorMessage = document.querySelector(".error-message");
const feat=document.querySelector('.weathericon')

async function checkweather(city) {
    try {
        const response = await fetch(api + city);
        if (!response.ok) {
            throw new Error(`City is not valid`);
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".celcius").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".cityname").innerHTML = data.name;
        document.querySelector(".hvalue").innerHTML = data.main.humidity + "%";
        document.querySelector(".svalue").innerHTML = data.wind.speed + " km/h";
        errorMessage.style.display = "none";
        // feat.style.border = "4px solid rgba(1, 50, 5, 0.849) ";
        // feat.style.borderRadius = "2px";
        

        switch(data.weather[0].main) {
            case "Clouds":
                wi.src = "./images/cloudy-day.png";
                break;
            case "Clear":
                wi.src = './images/clear-sky.png';
                break;
            case "Rain":
                wi.src = './images/rain.png';
                break;
            case "Drizzle":
                wi.src = './images/drizzle.png';
                break;
            case "Snow":
                wi.src = './images/snow.png';
                break;
            default:
                wi.src = './images/weather-change (1).png';
        }
        console.log(data.weather[0].main)
    } catch (error) {
        console.error("Error fetching weather data:", error);
        
        errorMessage.style.display = "block";
        document.querySelector(".celcius").innerHTML = "--°C";
        document.querySelector(".cityname").innerHTML = "";
        document.querySelector(".hvalue").innerHTML = "--%";
        document.querySelector(".svalue").innerHTML = "-- km/h";
        wi.src = './images/weather-change (1).png';
    }
}

document.querySelector('.searchimg').addEventListener('click', () => {
    let cityname = document.querySelector('.searchbar').value.trim();
    if (cityname) {
        checkweather(cityname);
    } else {
        alert("Please enter a valid city name.");
    }
});
