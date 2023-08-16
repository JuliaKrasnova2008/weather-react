import React, { useEffect, useState } from 'react'
import './Home.css'
import geolocation from '../../images/geolocation.svg'
import vector from '../../images/vector.svg'
import Weather from '../Weather/Weather'
import axios from 'axios'
import { apiKey, lang } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch, setWeather } from '../../redux/slices/WeatherReducer'
import NotFound from '../NotFound/NotFound'
import { Link } from 'react-router-dom'
import line from '../../images/Vector 12.png'
import useTheme from '../../hooks/use-theme'

export default function Home() {
    //с помощью useSelector достаю глобальные данные weather из редакса
    const weather = useSelector((state) => state.weather.weather)
    const dispatch = useDispatch()

    const search = useSelector((state) => state.weather.search)

    const [lat, setLat] = useState('44.34')
    const [lon, setLon] = useState('10.99')
    const [error, setError] = useState(false)

    //для смены темы на странице
    const { theme, setTheme } = useTheme();

    const handleLightThemeClick = () => {
        setTheme("light");
    };
    const handleDarkThemeClick = () => {
        setTheme("dark");
    };

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=metric`).then((res) => {
            // с помощью dispatch добавляю полученные данные из api в функцию setWeather из слайса 
            dispatch(setWeather(res.data))
            setError(false)
        }).catch((res) => {
            setError(true)
            console.log(res);
        })
    }, [lat, lon])

    //определение текущий координат (долготы, ширины), 
    //добавляем [search] в массив зависимостей, чтобы когда происходят изменения  в [search] происходили изменение в долготе и ширине
    useEffect(() => {
        if (navigator.geolocation && search.trim() === "") {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
            })
        }
    }, [search])

    //зависит от поиска
    //search.trim() - обрезает пробелы в строке слева и справа, чтобы поиск не работал, если пользователь введет пробелы
    useEffect(() => {
        if (search.trim() !== "") {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&lang=${lang}&units=metric`).then((res) => {
                // с помощью dispatch добавляю полученные данные из api в функцию setWeather из слайса 
                dispatch(setWeather(res.data))
                setError(false)
            }).catch((res) => {
                setError(true)
                console.log(res);
            })
        }
    }, [search])



    return (
        <div className='home'>
            <div className='home__button__theme'>
                <button className={`button__theme ${theme === 'light' ? "button__theme_active" : ""}`} onClick={handleLightThemeClick}>light</button>
                <button className={`button__theme ${theme === 'dark' ? "button__theme_active" : ""}`} onClick={handleDarkThemeClick}>dark</button>

            </div>

            <img className='home__img' src={line} />
            <div className='home__map'>
                <button className='home__geolocation'
                    onClick={() => dispatch(setSearch(""))}
                >
                    <img className='home__geolocation-img' src={geolocation} />
                </button>
                <h1 className='home__city'>{weather.name}</h1>
                <Link to="/search" className='home__geolocation'>
                    <img className='home__vector' src={vector} />
                </Link>

            </div>
            {
                error ? <NotFound /> : <Weather />

            }
        </div >
    )
}
