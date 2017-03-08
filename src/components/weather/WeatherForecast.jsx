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
import { Row, Image } from 'react-bootstrap';
import WeatherIcons from 'react-weathericons';

// WeatherForecast
class WeatherForecast extends React.Component {
  
  // Render the component
  render() {
    const { forecastWeather } = this.props;

    return(
      <h3>
        <Row>
          <small>
            { forecastWeather.time }
          </small>
        </Row>
        <Row>
          <Image
            className='background-white'
            src={ forecastWeather.icon }
            circle
            />
          <br/>
        </Row>
        <Row>
          { forecastWeather.temp }<WeatherIcons name='celsius' />
        </Row>
      </h3>
    );
  }
};

WeatherForecast.propTypes = {
  forecastWeather: React.PropTypes.object.isRequired
};

export default WeatherForecast;
