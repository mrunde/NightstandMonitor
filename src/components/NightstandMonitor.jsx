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

// Required components
import Clock from './clock/Clock';
import Weather from './weather/Weather';
import Welcome from './welcome/Welcome';
import Webradio from './webradio/Webradio';

// NightstandMonitor
class NightstandMonitor extends React.Component {

  // Render the component
  render() {
    const { config } = this.props;

    return(
      <div>
        <div className='component component-top component-left'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Clock />
            </div>
          </div>
        </div>
        <div className='component component-top component-right'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Welcome name={ config.USER } />
            </div>
          </div>
        </div>
        <div className='component component-bottom component-left'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Weather
                apiKey={ config.WEATHER_API_KEY }
                location={ config.WEATHER_LOCATION }
                />
            </div>
          </div>
        </div>
        <div className='component component-bottom component-right'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Webradio stations={ config.WEBRADIO_STATIONS } />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

NightstandMonitor.propTypes = {
  config: React.PropTypes.object.isRequired
};

export default NightstandMonitor;
