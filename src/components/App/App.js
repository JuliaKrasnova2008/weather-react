import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "./App.css";
import SearchForm from "../SearchForm/SearchForm";
import Detail from "../Detail/Detail";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCity } from "../../redux/slices/WeatherReducer";
import DetailForDay from "../DetailForDay/DetailForDay";

function App() {
  const dispatch = useDispatch();

  //достаем массив городов из открытого API и сохраняем его в массив из редакса, т.е. он будет обновляться 1 раз при рендере страницы
  useEffect(() => {
    axios.get("https://spirital.clubty.ru/cities").then((res) => {
      dispatch(setCity(res.data));
    });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchForm />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail-for-day" element={<DetailForDay />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
