const api = {
  key: "5df95ba7242a67c891035412b7eb2aca",
  base: "https://api.openweathermap.org/data/2.5/",
};
const search = document.querySelector(".search");
search.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(search.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch((error) => alert("Not A Valid City"));
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");

  date.innerText = dateBuilder(now);
  let temp = document.querySelector(".forecast .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F </span>`;
  let weather_fore = document.querySelector(".forecast .fore");
  weather_fore.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_max)}°F / ${Math.round(
    weather.main.temp_min
  )} °F`;
}
function dateBuilder(d) {
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return ` ${month} ${date}th ${year}`;
}
