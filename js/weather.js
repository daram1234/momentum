const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");

const API_KEY = "a5a4bc43206ad6abff2f4a84f1707dfd";



function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            weather.innerText = `${data.weather[0].main}, `
            city.innerText = data.name
        });
}
function onGeoError() {
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)