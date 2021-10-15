/* Global Variables */

// Personal API Key for OpenWeatherMap API
let baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const key = `&appid=0635a4016ccfaaa6dae88fcc3fc3ae0f&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

// GET request to the OpenWeatherMap API

const getWeatherData = async (baseUrl, zipCode, country, apikey) => {
    const res = await fetch(baseUrl + zipCode + `,${country}` + apikey);
    try {
        const weatherData = res.json();
        // if (weatherData.cod === '404') {
        //     // document.getElementById('wrong_zip').style.cssText = 'display : block;';
        //     return;
        // }
        return weatherData;

    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = res.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

// Event listener to add function to existing HTML DOM element
const generateButtom = document.getElementById('generate');
generateButtom.addEventListener('click', generate);

/* Function called by event listener */
function generate() {
    const zipCode = document.getElementById('zip').value;
    if (zipCode === "") {
        document.getElementById('no__zip').style.cssText = 'display: block;';
        return;
    }
    const country = document.getElementById('country').value;
    // console.log(zipCode);
    const feeling = document.getElementById('feelings').value;
    // console.log(feeling);
    getWeatherData(baseUrl, zipCode, country, key)
        .then(function (weatherData) {
            postData('/add', { name: weatherData.name, temp: weatherData.main.temp, date: newDate, feelings: feeling });
            updateUI();
        });
}

// update UI dynamically
const updateUI = async () => {
    document.querySelector('.entry').style.cssText = 'display: block;';
    const req = await fetch('/all');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = `<i class="fas fa-calendar-day"></i> : ${data.date}`;
        document.getElementById('city__name').innerHTML = `${data.name}`;
        document.getElementById('temp').innerHTML = `<i class="fas fa-thermometer-half"></i> ${Math.round(Number(data.temp))} &deg;C`;
        document.getElementById('content').innerHTML = `${data.feelings}`;
    } catch (error) {
        console.log('error', error);
    }
};