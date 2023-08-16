import React from 'react'
import './Weather.css'
import WeatherReport from '../WeatherReport/WeatherReport'
import ForecastReport from '../ForecastReport/ForecastReport'
import { useSelector } from 'react-redux'
import { weatherIcons } from '../../utils/utils'

export default function Weather() {
    const weather = useSelector((state) => state.weather.weather)
    return (
        <div className='weather'>
            <img className='weather__main-img' src={weatherIcons[weather?.weather?.[0]?.icon] || `https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`} />
            <WeatherReport />
            <ForecastReport />
        </div>
    )
}
