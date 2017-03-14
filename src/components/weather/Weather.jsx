/* 
 * The MIT License
 *
 * Copyright 2017 Marius Runde.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

// Required modules
import React from 'react';
import WeatherIcons from 'react-weathericons';
import jquery from 'jquery';

// Required components
import WeatherForecast from './WeatherForecast';

// Required constants
import { CURRENT_WEATHER_URL, FORECAST_WEATHER_URL } from './constants';

// Weather
class Weather extends React.Component {

  constructor(props) {
    super(props);

    this.loadCurrentWeather = this.loadCurrentWeather.bind(this);
    this.loadForecastWeather = this.loadForecastWeather.bind(this);

    this.state = {
      currentWeather: new Object(),
      forecastWeather: []
    };
  }

  // Load the current weather when the component will mount
  componentWillMount() {
    this.loadCurrentWeather();
    this.loadForecastWeather();
  }

  // Set the weather intervals
  componentDidMount() {
    const thirtyMinutes = 30 * 60 * 1000;

    // Interval for current weather
    this.state.currentWeatherInterval = window.setInterval(function() {
      this.loadCurrentWeather();
    }.bind(this), thirtyMinutes);

    // Interval for forecast weather
    this.state.forecastWeatherInterval = window.setInterval(function() {
      this.loadForecastWeather();
    }.bind(this), thirtyMinutes);
  }

  // Clear the weather interval
  componentWillUnmount() {
    clearInterval(this.state.currentWeatherInterval);
    clearInterval(this.state.forecastWeatherInterval);
  }

  // Load the current weather
  loadCurrentWeather() {
    const { apiKey, location } = this.props;
    const url = CURRENT_WEATHER_URL + location + '&APPID=' + apiKey;

    jquery.get({
      url: url,
      success: function(res) {
        if (res) {
          this.setState({
            currentWeather: {
              description: res.weather[0].description,
              id: res.weather[0].id,
              temp: Math.floor(res.main.temp)
            }
          });
        }
      }.bind(this)
    });
  }

  // Load the forecast weather
  loadForecastWeather() {
    const { apiKey, location } = this.props;
    const url = FORECAST_WEATHER_URL + location + '&APPID=' + apiKey;

    jquery.get({
      url: url,
      success: function(res) {
        if (res) {
          let forecastWeather1 = {
            date: res.list[1].dt,
            id: res.list[1].weather[0].id,
            tempMax: Math.floor(res.list[1].temp.max),
            tempMin: Math.floor(res.list[1].temp.min)
          };

          let forecastWeather2 = {
            date: res.list[2].dt,
            id: res.list[2].weather[0].id,
            tempMax: Math.floor(res.list[2].temp.max),
            tempMin: Math.floor(res.list[2].temp.min)
          };

          let forecastWeather3 = {
            date: res.list[3].dt,
            id: res.list[3].weather[0].id,
            tempMax: Math.floor(res.list[3].temp.max),
            tempMin: Math.floor(res.list[3].temp.min)
          };

          this.setState({
            forecastWeather: [
              forecastWeather1,
              forecastWeather2,
              forecastWeather3
            ]
          });
        }
      }.bind(this)
    });
  }

  // Render the component
  render() {
    const { location } = this.props;
    const { currentWeather, forecastWeather } = this.state;

    return(
      <div className='weather'>
        <div className='weather-temp'>
          <div className='weather-temp-value'>
            { currentWeather.temp }
          </div>
          <WeatherIcons
            className='weather-temp-celsius'
            name='celsius'
            />
        </div>
        <WeatherIcons
            className='weather-icon'
            name={ 'owm-day-' + currentWeather.id }
            />
        <div className='weather-description'>
          { currentWeather.description }
        </div>
        <div className='weather-forecast'>
          { forecastWeather.map(function(forecastWeather, index) {
            return (
              <WeatherForecast
                key={ 'forecast-weather-' + index }
                forecastWeather={ forecastWeather }
                index={ index }
                />
            );
          }) }
        </div>
        <div className='weather-location'>
          { location }
        </div>
      </div>
    );
  }
};

Weather.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired
};

export default Weather;
