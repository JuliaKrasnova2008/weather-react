import clear from "../images/main-img.png";
import fewClouds from "../images/fewClouds.png";
import scatteredClouds from "../images/scatteredClouds.png";
import brokenClouds from "../images/brokenClouds.png";
import showerRain from "../images/showerRain.png";
import rain from "../images/rain.png";
import thunderstorm from "../images/thunderstorm.png";
import snow from "../images/snow.png";
import mist from "../images/mist.png";

import fewCloudsNight from "../images/fewCloudsN.png";
import scatteredCloudsNight from "../images/scatteredCloudsN.png";
import brokenCloudsNight from "../images/brokenCloudsN.png";
import showerRainNight from "../images/showerRainN.png";
import rainNight from "../images/rainN.png";
import thunderstormNight from "../images/thunderstormN.png";
import snowNight from "../images/snow.png";
import mistNight from "../images/mist.png";

export const apiKey = "b12e1239f352528fb0fc979ea2b068a4";
export const lang = "ru";
export const weatherIcons = {
  "01d": clear,
  "02d": fewClouds,
  "03d": scatteredClouds,
  "04d": brokenClouds,
  "09d": showerRain,
  "10d": rain,
  "11d": thunderstorm,
  "13d": snow,
  "50d": mist,

  "01n": clear,
  "02n": fewCloudsNight,
  "03n": scatteredCloudsNight,
  "04n": brokenCloudsNight,
  "09n": showerRainNight,
  "10n": rainNight,
  "11n": thunderstormNight,
  "13n": snowNight,
  "50n": mistNight,
};

export function getCurrentDate(date) {
  if (!date) {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date().toLocaleDateString("ru", options).replace("в ", "");
  } else {
    const options = {
      month: "short",
      day: "numeric",
      weekday: "long",
    };
    return new Date(date).toLocaleDateString("ru", options);
  }
}
