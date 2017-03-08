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

// -----------------------------------------------------------------------------
// Configuration for the Nightstand Monitor Application
// -----------------------------------------------------------------------------
module.exports = {
  // Express web server
  EXPRESS_HOST: 'http://localhost',
  EXPRESS_PORT: 8080,
  // User
  USER: 'YOUR_NAME',
  // Weather (using OpenWeatherMap API)
  WEATHER_API_KEY: 'YOUR_API_KEY',
  WEATHER_LOCATION: 'YOUR_LOCATION',
  // Webradio stations
  WEBRADIO_STATIONS: [
    {
      name: 'YOUR_STATION_NAME',
      icon: 'YOUR_STATION_ICON',
      url: 'YOUR_STATION_URL'
    }
  ]
};
