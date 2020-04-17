import * as core from '@actions/core';
import axios from 'axios';
import cheerio from 'cheerio';

import weatherData from './data/weather.json';

export const parse = async() => {
  const token = process.env.WEATHER_API_KEY;
  const city = 'Seongnam-si';

  
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`);
  const data = response.data;

  console.log('✅ 날씨 파싱 완료');

  return {
    cod: data.cod,
    weather: (<any> weatherData)[data.weather[0].id],
    temp: `(${data.main.temp_min}도 ~ ${data.main.temp_max}도)`
  };
  
//   return {
//     weather: "짱짱맑음",
//     temp: `(10도 ~ 20도)`
//   };
};
