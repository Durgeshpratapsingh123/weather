const apiKey = "70f005e3ee056d49c041342f6c041cea";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city){

    const resp = await fetch(url(city) ,{
        origin: "cros"
    });

    const respData = await resp.json();

    addWeatherToPage(respData);
}

function addWeatherToPage(data){
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div')
    weather.classList.add('weather');

    weather.innerHTML=`
    <h1 ><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style={color: red} /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h1>
    <small>${data.weather[0].main}</small>`;

    main.innerHTML = "";
    main.appendChild(weather);
};

function Ktoc(K){
    return Math.floor(K - 273.15);
}

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const city = search.value;

    if(city){
        getWeatherByLocation(city)
    }
})


/* Your existing JS code */

// Function to get the current date and time
function getCurrentDateTime() {
    const currentDate = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} - ${formattedTime}`;
}

// Update the date and time display
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    dateTimeElement.textContent = getCurrentDateTime();
}

// Call the function to update date and time initially
updateDateTime();

// Update date and time every minute
setInterval(updateDateTime, 60000); // 60000 milliseconds = 1 minute
