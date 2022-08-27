/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const key = `&appid=0635a4016ccfaaa6dae88fcc3fc3ae0f&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

// API call => GET request to the OpenWeatherMap API

const getWeatherData = async (baseUrl, zipCode, country, apikey) => {
  const res = await fetch(baseUrl + zipCode + `,${country}` + apikey);
  try {
    const weatherData = res.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data to our project data end point */
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Event listener to add function to existing HTML DOM element
const generateButtom = document.getElementById("generate");
generateButtom.addEventListener("click", generate);

// error elements
const wrongZip = document.getElementById("wrong__zip");
const noZip = document.getElementById("no__zip");

// entry element that hold the data and the loading animation
const entry = document.querySelector(".entry");
const loading = document.querySelector(".loading");

/* Function called by event listener */
async function generate() {
  const zipCode = document.getElementById("zip").value;
  if (zipCode === "") {
    wrongZip.style.cssText = "display : none;";
    noZip.style.cssText = "display: block;";
    return;
  }
  const country = document.getElementById("country").value;
  const feeling = document.getElementById("feelings").value;

  await getWeatherData(baseUrl, zipCode, country, key)
    .then((weatherData) => {
      postData("/add", {
        name: weatherData.name,
        temp: weatherData.main.temp,
        date: newDate,
        feelings: feeling,
      });
      updateUI();
    })
    .catch((e) => {
      console.log(e);
      noZip.style.cssText = "display: none;";
      wrongZip.style.cssText = "display : block;";
    });
}

// update UI dynamically
const updateUI = async () => {
  entry.style.cssText = "display: block;";
  loading.style.cssText = "display: flex;";
  noZip.style.cssText = "display: none;";
  wrongZip.style.cssText = "display : none;";
  const res = await fetch("/all");
  try {
    const data = await res.json();
    document.getElementById("date").innerHTML = `${data.date}`;
    document.getElementById("city__name").innerHTML = `${data.name}`;
    document.getElementById("temp").innerHTML = `${Math.round(
      Number(data.temp)
    )} &deg;C`;
    document.getElementById("content").innerHTML = `${data.feelings}`;

    loading.style.cssText = "display: none;";
    document.querySelector("#entryHolder").style.cssText = "display: block;";
  } catch (error) {
    console.log("error", error);
  }
};
