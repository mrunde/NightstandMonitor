/* 
 * The MIT License
 *
 * Copyright 2016 Marius Runde.
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

// Required components
import React from 'react';
import WeatherIcons from 'react-weathericons';

// WeatherForecast
class WeatherForecast extends React.Component {
  
  // Render the component
  render() {
    const { forecastWeather, index } = this.props;
    const date = new Date(forecastWeather.date * 1000);

    return(
      <div className={'weather-forecast-' + index }>
        <WeatherIcons
          className='weather-forecast-icon'
          name={ 'owm-day-' + forecastWeather.id }
          />
        <div className='weather-forecast-date'>
          { date.getDate() + '.' + (date.getMonth() + 1) + '.' }
        </div>
        <div className='weather-forecast-temp'>
          { forecastWeather.tempMax } / { forecastWeather.tempMin }
          <WeatherIcons name='celsius' />
        </div>
      </div>
    );
  }
};

WeatherForecast.propTypes = {
  forecastWeather: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
};

export default WeatherForecast;
