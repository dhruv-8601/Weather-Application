import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {

    let[city, setCity] = useState('');
    let[unit, setUnit] = useState('imperial');
    let[responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e){
        e.preventDefault();
        if(city.length === 0){
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(false);

        let uriEncodedCity = encodeURIComponent(city);
        // weather data fetch function will go here
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "795978446dmshde041ed25ee7041p13d937jsnea4aab546bf7"
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response);
            setLoading(false);
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
    }

    return (
        //JSX code will go here
       <div>
           <h2>Find Current Weather Conditions</h2>
           <form onSubmit={getForecast}>
               <input
               type="text"
               placeholder="Enter City"
               maxLength="50"
               className={classes.textInput}
               value={city}
               onChange={(e) =>
            setCity(e.target.value)} />
            <label className={classes.Radio}>
                <input
                type="radio"
                name="units"
                checked={unit === "imperial"}
                value="imperial"
                onChange={(e) =>
                setUnit(e.target.value)} />
                Fahrenheit
            </label>
            <label className={classes.Radio}>
                <input
                type="radio"
                name="units"
                checked={unit === "metric"}
                value="metric"
                onChange={(e) =>
                setUnit(e.target.value)} />
                Celcius
            </label>
            <button className={classes.Button} type="submit">Get Forecast</button>
           </form>
           <Conditions 
           responseObj={responseObj}
           error={error}
           loading={loading}
           />
       </div>
    )
}

export default Forecast;