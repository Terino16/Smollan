<!-- Weather.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getWeather } from "./weather";
	import type { WeatherData } from "../types";
	import {getPhotosByQuery} from "./CityImage"
  
	 let weatherData: WeatherData | null = null;


	let CITY: string = "Delhi";
  let CityIMageUrl="";

	async function fetchWeather(city: string) {
	  try {
    const UNSPLASH_ROOT = 'https://api.unsplash.com'
		weatherData = await getWeather(city);
    const cityImage= await getPhotosByQuery({city})
    CityIMageUrl=cityImage.results[0].urls.small;
		CITY = city;
	  } catch (error) {
		console.error('Error fetching weather data:', error);
	  }
	}
  
	function handleInputChange(event: Event) {
	  const target = event.target as HTMLInputElement;
	  CITY = target.value;
	}
  
	onMount(() => {
	  fetchWeather(CITY);
	});
  
	function Submit(event:Event){
	  fetchWeather(CITY);
	}
  </script>
  
  <style>
      .container {
        padding: 20px;
        margin: auto;
        min-height: 100vh; /* Minimum height of screen */
        
        color: white;
        background-size: contain;
        background-color: black;
    }

    .input {
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
</style>



<div class="container">
   
      <form on:submit={Submit} class="flex m-5">
        <input class="p-2 w-full input mr-2" placeholder="Enter city" bind:value={CITY} on:input={handleInputChange}/>
        <button on:click={Submit} class="input font-bold p-2">Enter</button>
      </form>
   
    {#if weatherData}
    <div class="flex md:flex-row flex-col items-center justify-around">
      <h2 class="md:text-6xl font-bold text-2xl mt-2">Weather in {CITY}</h2>
      <img src={CityIMageUrl} alt="Bold" class="rounded-xl"/>
    </div>
    <div class="gap-2">
        <p class="md:text-4xl text-xl font-bold mt-2">Temperature: {weatherData.main.temp}°C</p>
        <p class="md:text-2xl text-xl font-bold mt-2"> But Feels like: {weatherData.main.feels_like}°C</p>
        <div class="flex items-center justify-around my-4">
          <span class="flex gap-2">
            <img src={"https://cdn-icons-png.freepik.com/512/10752/10752743.png"} alt="vdf" class="md:w-10 w-7 h-10 "/>
            <p class="md:text-xl md:font-bold text-lg">Minimum Temperature {weatherData.main.temp_min}°C</p>
          </span>

        
         <span class="flex gap-2">
            <img src={"https://cdn-icons-png.freepik.com/512/7340/7340001.png"} alt="vdf" class="md:w-10 w-7 h-10"/>
            <p class="md:text-xl md:font-bold text-lg">Maximum Temperature {weatherData.main.temp_min}°C</p>
          </span>
        </div>

        <div>
          <span class="flex">
            <p class="md:text-2xl md:font-bold text-lg  mt-2"> Weather Description: {weatherData.weather[0].main}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather icon" class=""/>
          </span>

          <p class="md:text-xl md:font-bold text-lg">Winds : {weatherData.wind.speed}km/s</p>
          <p class="md:text-xl md:font-bold text-lg">Direction : {weatherData.wind.deg}Degree</p>
         
        </div>
       
       
    </div>
    {:else}
    <p>Loading weather data...</p>
    {/if}
</div>