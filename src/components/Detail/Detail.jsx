import React, { useEffect, useState } from 'react'
import './Detail.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiKey, getCurrentDate, weatherIcons } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { setWeatherForDay } from '../../redux/slices/WeatherReducer'
import line2 from '../../images/Vector 11.png'

export default function Detail() {
    const weather = useSelector((state) => state.weather.weather)
    const dispatch = useDispatch()

    const [weatherForDays, setWeatherForDays] = useState({})

    //выполняется каждый раз, когда меняется weather. 
    //Запрос на получение 5-дневной информации о погоде
    //.then((res) => {console.log(res.data);}) - нужен для того, чтобы увидеть какой ответ приходит от сервера
    //.catch((error) => {console.log(error);}) - нудно для того, чтобы если на сервера была ошибка, она не выводилась на весь экран пользователя
    //а просто вылезала в консоли
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${apiKey}`).then((res) => {
            // console.log(new Date(res.data.list[0].dt_txt).getDate());
            setWeatherForDays(res.data.list.reduce((obj, elem) => {
                return {
                    //разворачиваем объект для того, чтобы не затирать его значения, к нему добавляем новый ключ [new Date(elem.dt_txt).getDate()]
                    //и присваиваем новое значение - это отфильтрованные массив, который ищет совпадение по дате в новом ключе
                    ...obj, [getCurrentDate(elem.dt_txt)]: res.data.list.filter((date) => {
                        //new Date(elem.dt_txt).getDate() - текущий элемент, мы из него достаем дату
                        // и в массиве оставляем только те элементы, в которых дата такая же
                        return new Date(elem.dt_txt).getDate() === new Date(date.dt_txt).getDate()
                    })
                }
            }, {}))
        }).catch((error) => {
            console.log(error);
        })
    }, [weather])


    return (
        <div className='detail'>
            <img className='detail__img' src={line2} />
            <Link to="/" className='detail__back'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M14.4374 16.0001L21.0374 22.6001L19.1521 24.4854L10.6667 16.0001L19.1521 7.51475L21.0374 9.40008L14.4374 16.0001Z" fill="white" />
                </svg>

            </Link>
            <div className='detail__day'>
                <h4 className='detail__title'>Сегодня</h4>
                <p className='detail__subtitle'>{Object.keys(weatherForDays)[0]}</p>

            </div>
            <ul className='scroll scroll__today'>
                {
                    Object.values(weatherForDays)[0]?.map((elem) => {
                        return <li className='scroll__day'>
                            <p className='scroll__temp'>{Math.round(elem.main.temp - 273.15)} °C</p>
                            <img className='scroll__img' src={weatherIcons[elem?.weather?.[0]?.icon] || `https://openweathermap.org/img/wn/${elem?.weather?.[0]?.icon}@2x.png`} />
                            <p className='scroll__time'>{new Date(elem.dt_txt).getHours() + ".00"}</p>

                        </li>

                    })
                }
            </ul>

            <h4 className='detail__title detail__title_next-forecast'>Следующий прогноз</h4>
            <ul className='scroll scroll__next-forecast'>
                {
                    Object.values(weatherForDays)?.slice(1)?.map((elem) => {
                        return <li className='scroll__day scroll__day_next-forecast'>
                            <Link to='/detail-for-day'
                                className='scroll__date'
                                onClick={() => dispatch(setWeatherForDay(elem))}
                            >{getCurrentDate(Object.values(elem)[1].dt_txt)}</Link>
                            <img className='scroll__img scroll__img_next-forecast' src={weatherIcons[Object.values(elem)[1].weather[0].icon] || `https://openweathermap.org/img/wn/${Object.values(elem)[1].weather.map((elem) => elem.icon)}@2x.png`} />
                            <p className='scroll__temp scroll__temp_next-forecast'>{Math.round(Object.values(elem)[1].main.temp - 273.15)} °C</p>
                        </li>

                    })
                }
            </ul>
        </div>
    )
}
