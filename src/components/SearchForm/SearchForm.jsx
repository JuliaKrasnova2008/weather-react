import React, { useEffect, useRef, useState } from 'react'
import './SearchForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch, setWeather } from '../../redux/slices/WeatherReducer'
import arrow from '../../images/arrow.svg'
import { Link } from 'react-router-dom'
import { Map, Panorama, Placemark, useYMaps } from '@pbe/react-yandex-maps'
import axios from 'axios'
import { apiKey, lang } from '../../utils/utils'

export default function SearchForm() {
    const city = useSelector((state) => state.weather.city);
    const weather = useSelector((state) => state.weather.weather)

    const dispatch = useDispatch()

    const search = useSelector((state) => state.weather.search)

    const [value, setValue] = useState(search)
    const [close, setClose] = useState(true)
    const [filtered, setFiltered] = useState([])

    //чтобы каждый раз, когда менялся поиск, менялся и инпут
    useEffect(() => {
        setValue(search)
    }, [search])

    //зависит от поиска
    //search.trim() - обрезает пробелы в строке слева и справа, чтобы поиск не работал, если пользователь введет пробелы
    useEffect(() => {
        if (search.trim() !== "") {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&lang=${lang}&units=metric`).then((res) => {
                // с помощью dispatch добавляю полученные данные из api в функцию setWeather из слайса 
                dispatch(setWeather(res.data))
            }).catch((res) => {
                console.log(res);
            })
        }
    }, [search])

    //каждый раз при изменение инпута(value) массив будет обновляться и подставляться нужные элементы
    useEffect(() => {
        setFiltered(city.filter((elem) => {
            return elem.toLowerCase().includes(value.toLowerCase())
        }))
    }, [value])

    return (
        <div className='search'>
            <div className='search__input-form'>
                <div className='search__input-elements'>
                    <Link to='/' className='search__back'>
                        <img className='search__back-img' src={arrow} />
                    </Link>
                    <input className='search__input'
                        value={value}
                        onChange={(evt) => {
                            if (evt.target.value.trim() === '') {
                                setClose(true)
                            } else {
                                setClose(false)
                            }

                            setValue(evt.target.value)
                        }}
                        placeholder='Search here'
                    />
                </div>

                {!close &&
                    <ul className='search__list'>
                        {filtered.length >= 1 ? filtered.map((elem) => (<li
                            className='search__item'
                            onClick={() => {
                                dispatch(setSearch(elem))
                                window?.location.reload() //вызывает перезагрузку страницы
                                setClose(true)
                            }}
                        >{elem}</li>)) :
                            <li
                                className='search__item'
                            >Ничего не найдено</li>
                        }
                    </ul>
                }
            </div>

            <Map defaultState={{ center: [weather.coord.lat, weather.coord.lon], zoom: 9 }}
                style={
                    {
                        width: '100%',
                        height: '100vh',
                        minWidth: '100%',
                    }
                }
            >
                <Placemark defaultGeometry={[weather.coord.lat, weather.coord.lon]} />
            </Map>
        </div >
    )
}
