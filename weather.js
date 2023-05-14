const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current_weather_items');
const timezone = document.getElementById('time_zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather_forecast');
const currentTempEl = document.getElementById('current_temp');

const API_KEY = '46e07816c9a0e7a512696d691b89fa05';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
setInterval(() => {
  const time = new Date();
  const month  = time.getMonth();
  const date = time.getDate();
  const day  = time.getDay();
  const hour = time.getHours();
  const hoursIn24hrFormat = hour>=13 ? hour%12 : hour
  const minute = time.getMinutes();
  const sec = time.getSeconds();
  const ampm = hour>=12 ? 'PM' : 'AM'
  timeEl.innerHTML = (hoursIn24hrFormat<10 ? '0'+hoursIn24hrFormat : hoursIn24hrFormat) + ':' + (minute<10? '0'+minute:minute) + ' ' + `<span id = "am_pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
},1000);
getWeatherData()
function getWeatherData (){
   navigator.geolocation.getCurrentPosition((success) =>{
     console.log(success);
     let{latitude,longitude} = success.coords;
     fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then(res=>res.json()).then(data=>{
       console.log(data)
       showWeatherData(data);
     })
   })
}

function showWeatherData(data){
  let{humidity,pressure,feels_like} = data.list[0].main;
  let{speed} = data.list[0].wind;
  timezone.innerHTML = data.city.name;
  countryEl.innerHTML = data.city.country;
  currentWeatherItemEl.innerHTML = `<div class="weather_item">
    <div class="">
       humidity
    </div>
    <div class="">
      ${humidity}%
    </div>
    </div>
    <div class="weather_item">
    <div class="">
       pressure
    </div>
    <div class="">
      ${pressure}
    </div>
    </div>
    <div class="weather_item">
    <div class="">
       windspeed
    </div>
    <div class="">
      ${speed}
    </div>
    </div>
    <div class="weather_item">
    <div class="">
      feels like
    </div>
    <div class="">
      ${feels_like}&#176; C
    </div>
    </div>
    `;
   let otherDayForecast = ' '
    data.list.forEach((day,idx) =>{
         if(idx==0){
           currentTempEl.innerHTML = `
           <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class = "w_icon">
           <div class="other">
             <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
             <div class="temp">
               temp-${day.main.temp}&#176; C
             </div>
             <div class="temp">
               Feel like-${day.main.feels_like}&#176; C
             </div>
           </div>
           `
         }else if(idx==9){
           otherDayForecast += `
            <div class="weather_forecast_item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class = "w_icon">
              <div class="temp">
                temp-${day.main.temp}&#176; C
              </div>
              <div class="temp">
                Feel like-${day.main.feels_like}&#176; C
              </div>
            </div> `
         }else if(idx==17){
           otherDayForecast += `
            <div class="weather_forecast_item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class = "w_icon">

              <div class="temp">
                temp-${day.main.temp}&#176; C
              </div>
              <div class="temp">
                Feel like-${day.main.feels_like}&#176; C
              </div>
            </div> `
         }else if(idx==25){
           otherDayForecast += `
            <div class="weather_forecast_item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class = "w_icon">

              <div class="temp">
                temp-${day.main.temp}&#176; C
              </div>
              <div class="temp">
                Feel like-${day.main.feels_like}&#176; C
              </div>
            </div> `
         }else if(idx==33){
           otherDayForecast += `
            <div class="weather_forecast_item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class = "w_icon">

              <div class="temp">
                Temp-${day.main.temp}&#176; C
              </div>
              <div class="temp">
                Feel like-${day.main.feels_like}&#176; C
              </div>
            </div> `
         }
    })
    weatherForecastEl.innerHTML = otherDayForecast;
}
