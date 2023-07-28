const searchBox= document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");



async function fetchData(city) {

  const url = `/*Paste your url here*/city=${city}&units=metric`;
  const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '/*Write your api key here*/',
    'X-RapidAPI-Host': '/*Write the api host link here*/'
  }
};
  // try {
    const response = await fetch(url, options);
    const result = await response.json();


    const searchItem = searchBox.value;
    const searchItem2 = searchItem.charAt(0).toUpperCase() + searchItem.slice(1);


    a = false

    if (currentTimestamp >= result.sunrise && currentTimestamp <= result.sunset) {
      return a=true; // It is daytime
    }   

    if(response.status == 400 || response.status == 404){
        document.querySelector(".error").style.display = 'block';
        document.querySelector(".weather").style.display = 'none';
        document.querySelector(".errorimage").style.display = 'block';
  
    }
    else{
      document.querySelector(".temp").innerHTML= Math.round(Number(result.temp)) +"°C";
      document.querySelector(".city").innerHTML = searchItem2;
      document.querySelector(".humidity").innerHTML = Number(result.humidity) + "%";
      document.querySelector(".wind").innerHTML = Number(result.wind_speed) + "kmph";

      var currentTimestamp = Math.floor(Date.now() / 1000); 

      if(result.cloud_pct >= 0 && result.cloud_pct <= 40){
        if(a == false){
          weatherIcon.src = "./images/night.png"
        }else
        weatherIcon.src = "./images/clear.png";
      }
      if(result.cloud_pct > 40 && result.cloud_pct <=60){
        if(a == false){
          weatherIcon.src = "./images/night.png"
        }else
        weatherIcon.src = "./images/clouds.png";
      }
      if(result.cloud_pct > 60 && result.cloud_pct <=80){
        weatherIcon.src = "./images/drizzle.png";
      }
      if(result.cloud_pct > 80 && result.cloud_pct <=100){
        weatherIcon.src = "./images/rain.png";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
      document.querySelector(".errorimage").style.display = 'none';

    }
}
searchBtn.addEventListener('click', () =>{
  fetchData(searchBox.value);
})

