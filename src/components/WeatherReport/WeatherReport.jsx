import React from 'react'
import './WeatherReport.css'
import hum from '../../images/hum.svg'
import wind from '../../images/windy.svg'
import { useSelector } from 'react-redux'
import { getCurrentDate } from '../../utils/utils'

export default function WeatherReport() {
    const weather = useSelector((state) => state.weather.weather)

    return (
        <div className='weather-report'>
            <div className='weather-report__main-info'>
                <h2 className='weather-report__today'>{getCurrentDate()}</h2>
                <h3 className='weather-report__degree'>{Math.round(weather?.main?.temp)}&#176;</h3>
                <p className='weather-report__feeling'>{weather?.weather?.map((elem) => elem.description[0].toUpperCase() + elem.description.slice(1))}</p>
            </div>

            <div className='indicators'>

                <div className='indicators__chapter'>
                    <img className='indicators__img' src={wind} />
                    <p className='indicators__subtitle'>Wind</p>
                    <span className='indicators__span'>|</span>
                    <p className='indicators__subtitle'>{Math.round(weather?.wind?.speed)} км/ч</p>
                </div>

                <div className='indicators__chapter'>
                    <img className='indicators__img' src={hum} />
                    <p className='indicators__subtitle'>Hum</p>
                    <span className='indicators__span'>|</span>
                    <p className='indicators__subtitle'>{weather?.main?.humidity} %</p>
                </div>
            </div>
        </div>
    )
}
