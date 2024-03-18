// weather.ts

import ky from 'ky';
import {PUBLIC_MAP_API_KEY} from '$env/static/public';
export async function getWeather(CITY:string) {
	const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${PUBLIC_MAP_API_KEY}&units=metric`;
	  try {
		const response = await ky.get(API_URL).json();
		console.log(response);
		return response;
	  } catch (error) {
		console.error('Error fetching weather data:', error);
	  }
	;
}
