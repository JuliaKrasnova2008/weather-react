import React from 'react'
import './Modal.css'
import { useSelector } from 'react-redux'
import { getCurrentDate } from '../../utils/utils'


export default function Modal({ active, setActive }) {

    const weather = useSelector((state) => state.weather.weather)

    //на оверлей добавляем проверку, если состоянеи активное - добаыляем класс modal__overlay и active, если не активно - только modal__overlay
    //по клику на оверлей, модалка закрывается
    //чтобы оно не закрываелось на контентной части нужно сделать на контент onClick={(e) => e.stopPropagation()}
    return (
        <div className={active ? 'modal__overlay active' : "modal__overlay"}
            onClick={() => setActive(false)}
        >
            <div className='modal'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className='modal__close-button'
                    onClick={() => setActive(false)}></button>
                <h1 className='modal__title'>Уведомление о погоде</h1>
                <div className='modal__weather-block'>
                    <button className='modal__weather-city'>{weather.name}</button>
                    <p className='modal__weather-date'>{getCurrentDate()}</p>
                    <p className='modal__weather-degree'>{Math.round(weather?.main?.temp)} °C</p>

                    <ul className='modal__weather-indicators-list'>
                        <li className='modal__weather-indicator'>
                            <span>По ощущению</span> <span>{Math.round(weather?.main?.feels_like)} °C</span>
                        </li>
                        <li className='modal__weather-indicator'>
                            <span>Максимальная температура </span> <span>{Math.round(weather?.main?.temp_max)} °C</span>
                        </li>
                        <li className='modal__weather-indicator'>
                            <span>Минимальная температура</span> <span>{Math.round(weather?.main?.temp_min)} °C</span>
                        </li>
                        <li className='modal__weather-indicator'>
                            <span>Ветер</span> <span>{weather?.wind?.speed} м/c</span>
                        </li>
                        <li className='modal__weather-indicator'>
                            <span>Давление</span> <span>{weather?.main?.pressure} мм рт. ст.</span>
                        </li>
                        <li className='modal__weather-indicator'>
                            <span>Влажность</span> <span>{weather?.main?.humidity} %</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
