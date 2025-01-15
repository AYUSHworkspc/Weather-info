let cityName=document.querySelector(".weather_city");

let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temp");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");


let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector("#weather_pressure")


//step-->2
 function  getcountryName(desh) {
    return new Intl.DisplayNames([desh], { type: "region" }).of(desh); // ye function country code ko country name return kar dega

}
let city="";
let citySearch=document.querySelector(".weather_search");
citySearch.addEventListener('submit',(e)=>{
    e.preventDefault();
    let cityName=document.querySelector(".city_name");
    console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});




const getWeatherData= async function getdata(){
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec19fd2487bb2ed6fafac7309090bdb7`;
    // api callingh link---->>>>       https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=addYourOwnAPIKey
    try{
        const res=await fetch (weatherUrl);
        const data= await res.json();
        console.log(data);
    

//OBJECT KA DESTRUCTURING ----------->>
    const { main, name, weather, wind, sys, dt } = data; 
  // cityName.innerHTML=`${name}, ${sys.country}`;  //--->isses country ka code aa raha hain full name nahi 
  cityName.innerHTML=`${name}, ${getcountryName(sys.country)}`;
//getting date and time
  const curDate = new Date(dt * 1000);
  dateTime.innerHTML=`${curDate}`;

// getting temp
w_temperature.innerText= main.temp;
w_minTem.innerHTML=`min:${main.temp_min}&#176`;
w_maxTem.innerHTML=`max:${main.temp_max}&#176`;


w_feelsLike.innerHTML=`${main.feels_like}&#176`;
w_humidity.innerHTML = `${main.humidity}%`;
w_wind.innerHTML = ` ${wind.speed} m/s`;
w_pressure.innerText = `  ${main.pressure} hPa`;


//icon and forcast 
w_forecast.innerHTML = weather[0].main;
w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;



    }
    catch(error){
console.log(error);
    }
};
document.body.addEventListener("load",getWeatherData());


