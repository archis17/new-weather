import React, { useState } from 'react'
import './Weather.css'
const api = {
    key: "f9f5ec10729fec4a29f0fe4c4b78b664",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {

    const [query,setQuery] = useState('')
    const [weather,setWeather] = useState({})

    const search = evt => {
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result)
            })
        }
    }
    const dateBuilder = (d) => {
             let months = ["January","February","March","April","May","June","July","August","Septempber","October","November","December"]
             let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    
             let day = days[d.getDay()]
             let date = d.getDate()
             let month = months[d.getMonth()]
             let year = d.getFullYear()
    
            return `${day} ${date} ${month} ${year}`
    }

    return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 
    'app warm' : (weather.main.temp < 26 && weather.main.temp > 19) ? 'app normal' : (weather.main.temp > 10 && weather.main.temp <20) ? 
    'app cool' : (weather.main.temp < 11) ? 'app' : '') : 'app'}>
        <main>
            <div className='search-box'>
                <input type='text'
                className='search-bar'
                placeholder='Enter a city..'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={search}/>
            </div>

            {(typeof weather.main != "undefined")?(
                <div>
                <div className='location-box'>
                    <div className='location'>
                        {weather.name},{weather.sys.country}
                        
                    </div>
                    <div className='date'>
                            {dateBuilder(new Date())}
                        </div>
                </div>
                <div className='weather-box'>
                    <div className='temp'>
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className='weather'>
                        {weather.weather[0].main}
                    </div>
                </div>
            </div>
            ) : ('')}
            
            
        </main>
    </div>
  )
}

export default Weather