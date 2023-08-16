import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: {},
  search: "",
  city: [],
  weatherForDay: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action) => {
      let weather = action.payload;
      state.weather = weather;
    },
    setSearch: (state, action) => {
      let search = action.payload;
      state.search = search;
    },
    setCity: (state, action) => {
      let city = action.payload;
      state.city = city;
    },
    setWeatherForDay: (state, action) => {
      let weatherForDay = action.payload;
      state.weatherForDay = weatherForDay;
    },
  },
});

export default weatherSlice.reducer; //экспортируем хранилище
export const { setWeather, setSearch, setCity, setWeatherForDay } =
  weatherSlice.actions; //экспортируем функции (для удобства, чтобы потом обращаться напрямую)
