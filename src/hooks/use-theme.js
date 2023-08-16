import { useLayoutEffect, useState } from "react";

//делаем запрос и спрашиваем, является ли текущая тема темной
const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
//если да-присваеваем dark, в ином случае - light
const defaultTheme = isDarkTheme ? "dark" : "light";

export default function useTheme() {
  //нужно сохранять значение в localStorage, чтобы при перезагрузке значение сохранялось
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || defaultTheme
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);
  return { theme, setTheme };
}
