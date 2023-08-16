import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "./slices/WeatherReducer";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    weather: WeatherReducer,
  },
  //preloadedState- состояние, которое должно подгрузиться сначала, и  в него добавляю данные из localStorage
  preloadedState: persistedState,
});
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
