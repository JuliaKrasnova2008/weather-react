import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentDate, weatherIcons } from '../../utils/utils';

export default function DetailForDay() {
    const weatherForDays = useSelector((state) => state.weather.weatherForDay)

    return (
        <div className='detail'>
            <Link to="/detail" className='detail__back'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M14.4374 16.0001L21.0374 22.6001L19.1521 24.4854L10.6667 16.0001L19.1521 7.51475L21.0374 9.40008L14.4374 16.0001Z" fill="white" />
                </svg>
            </Link>
            <div className='detail__day'>
                <h4 className='detail__title'>{getCurrentDate(weatherForDays[0].dt_txt)}</h4>
            </div>
            <ul className='scroll'>
                {
                    weatherForDays?.map((elem) => {
                        return <li className='scroll__day'>
                            <p className='scroll__temp'>{Math.round(elem.main.temp - 273.15)}°C</p>
                            <img className='scroll__img' src={weatherIcons[elem?.weather?.[0]?.icon] || `https://openweathermap.org/img/wn/${elem?.weather?.[0]?.icon}@2x.png`} />
                            <p className='scroll__time'>{new Date(elem.dt_txt).getHours() + ".00"}</p>

                        </li>

                    })
                }
            </ul>
        </div>
    )
}
