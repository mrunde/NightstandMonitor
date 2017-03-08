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
import { Row, Col } from 'react-bootstrap';
import WeatherIcons from 'react-weathericons';
import jquery from 'jquery';

// Required components
import WeatherForecast from './WeatherForecast';

// Required constants
import {
  CURRENT_WEATHER_URL,
  FORECAST_WEATHER_URL,
  WEATHER_ICON_URL
} from './constants';

// Weather
class Weather extends React.Component {

  constructor(props) {
    super(props);

    this.loadCurrentWeather = this.loadCurrentWeather.bind(this);
    this.loadForecastWeather = this.loadForecastWeather.bind(this);

    this.state = {
      currentWeather: {
        temp: null,
        humidity: null
      },
      forecastWeather: {
        inOneHour: {
          time: null,
          icon: null,
          temp: null
        },
        inThreeHours: {
          time: null,
          icon: null,
          temp: null
        },
        inSixHours: {
          time: null,
          icon: null,
          temp: null
        }
      }
    };
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
              temp: this.transformTempInCelsius(res.main.temp),
              humidity: res.main.humidity
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
          var inOneHourObj = res.list[0];
          var inOneHour = {
            time: inOneHourObj.dt_txt.split(' ')[1].substr(0, 5),
            icon: this.getWeatherIconUrl(inOneHourObj.weather[0].icon),
            temp: this.transformTempInCelsius(inOneHourObj.main.temp)
          };
          
          var inThreeHoursObj = res.list[1];
          var inThreeHours = {
            time: inThreeHoursObj.dt_txt.split(' ')[1].substr(0, 5),
            icon: this.getWeatherIconUrl(inThreeHoursObj.weather[0].icon),
            temp: this.transformTempInCelsius(inThreeHoursObj.main.temp)
          };
          
          var inSixHoursObj = res.list[2];
          var inSixHours = {
            time: inSixHoursObj.dt_txt.split(' ')[1].substr(0, 5),
            icon: this.getWeatherIconUrl(inSixHoursObj.weather[0].icon),
            temp: this.transformTempInCelsius(inSixHoursObj.main.temp)
          };
          
          this.setState({
            forecastWeather: {
              inOneHour,
              inThreeHours,
              inSixHours
            }
          });
        }
      }.bind(this)
    });
  }
  
  // Get the URL for the weather icon
  getWeatherIconUrl(icon) {
    return WEATHER_ICON_URL + icon + '.png';
  }
  
  // Transform the temperature from Kelvin into Celsius
  transformTempInCelsius(temp) {
    return Math.floor(temp - 273.15);
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

  // Render the component
  render() {
    const { location } = this.props;
    const { currentWeather, forecastWeather } = this.state;

    return(
      <div>
        <h1>
          <Row>
            <Col xs={6}>
              { currentWeather.temp } <WeatherIcons name='celsius' /> <WeatherIcons name='thermometer' />
            </Col>
            <Col xs={6}>
              { currentWeather.humidity } <WeatherIcons name='humidity'/>
            </Col>
          </Row>
        </h1>
        <h3>
          <Row>
            <Col xs={4}>
              <WeatherForecast forecastWeather={ forecastWeather.inOneHour } />
            </Col>
            <Col xs={4}>
              <WeatherForecast forecastWeather={ forecastWeather.inThreeHours } />
            </Col>
            <Col xs={4}>
              <WeatherForecast forecastWeather={ forecastWeather.inSixHours } />
            </Col>
          </Row>
          <Row>
            <small>{ location }</small>
          </Row>
        </h3>
      </div>
    );
  }
};

Weather.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired
};

export default Weather;
