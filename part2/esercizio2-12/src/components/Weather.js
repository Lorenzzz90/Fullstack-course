import React, {useEffect, useState} from 'react' 
import axios from 'axios'

const Weather = ({ country }) => {
    const [ weather, setWeather] = useState({current: []})


    useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital
        }
        axios
            .get("http://api.weatherstack.com/current", {params})
            .then(response => {
                 setWeather(response.data)
                 console.log(response.data)
            })
        }, [country])

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <div><b>Temperature: </b>{weather.current.temperature} celsius</div>
            <img src={weather.current.weather_icons} alt={"Weather in " + country.capital}></img>
            <div><b>Wind: </b>{weather.current.wind_speed} Km/H, <b>Direction: </b>{weather.current.wind_dir}</div>
        </div>
    )
}
export default Weather