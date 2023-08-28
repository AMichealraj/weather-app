import React, { useState } from 'react';
import axios from 'axios';
import ErrorPage from './ErrorPage';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [localTime, setLocalTime] = useState(null);
  const [error, setError] = useState(null); // State for general error message
  const [cityNotFound, setCityNotFound] = useState(false); // State to handle city not found

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3fb2859ad1dee0fcaedd2bb5acb882b5`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        if (response.data.cod === '404') {
          setError(null); // Clear any previous errors
          setCityNotFound(true); // Set city not found state
        } else {
          setError(null); // Clear any previous errors
          setCityNotFound(false); // Reset city not found state
          setData(response.data);

          const timezoneOffset = response.data.timezone;
          const currentUTC = new Date().getTime();
          const localTimestamp = currentUTC + timezoneOffset * 1000;
          setLocalTime(new Date(localTimestamp));
        }
      })
      .catch((error) => {
        setError('Please check the spelling'); // Set a general error message
        setCityNotFound(false); // Reset city not found state
      });
      const getCurrentSeason = (month) => {
        if (month >= 3 && month <= 5) {
          return 'Spring';
        } else if (month >= 6 && month <= 8) {
          return 'Summer';
        } else if (month >= 9 && month <= 11) {
          return 'Autumn';
        } else {
          return 'Winter';
        }
      };
      setLocation('');
    }
  };
  
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="descriptions">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      <div className="center">
  {error && <p className="error">Error</p>}
  {cityNotFound && <p className="error">Please Check the Spelling</p>}
</div>
      {data.name !== undefined && (
  <div className="bottom">
          <div className="feels">
            {data.main && <p className='bold'>{data.main.feels_like.toFixed()}°F</p>}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main && <p className='bold'>{data.main.humidity}%</p>}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind && <p className='bold'>{data.wind.speed.toFixed()} MPH</p>}
            <p>Wind Speed</p>
          </div>
          <div className="time">
            <p>
              {localTime
                ? localTime.toLocaleTimeString([], {
                  timeZoneName: 'short',
                })
                : ''}
            </p>
          </div>
          <div className="center">
      {localTime ? (
        <p>
          {localTime.toLocaleTimeString([], {
            timeZoneName: 'short',
          })}
        </p>
      ) : (
        ''
      )}
      {data.weather ? <p>{data.weather[0].main}</p> : null}
      {data.main && (
        <p className="season">
          {localTime ? `Current Season: ${getCurrentSeason(localTime.getMonth() + 1)}` : ''}
        </p>
      )}
    </div>
  </div>
)}



    </div>
   
  );
}

export default App;
const getCurrentSeason = (month) => {
  if (month >= 3 && month <= 5) {
    return 'Spring';
  } else if (month >= 6 && month <= 8) {
    return 'Summer';
  } else if (month >= 9 && month <= 11) {
    return 'Autumn';
  } else {
    return 'Winter';
  }
};