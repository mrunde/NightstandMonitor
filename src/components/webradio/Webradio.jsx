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
import FontAwesome from 'react-fontawesome';

// Required components
import WebradioAlarm from './WebradioAlarm';
import WebradioIcon from './WebradioIcon';

// Webradio
class Webradio extends React.Component {

  constructor(props) {
    super(props);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.changeActiveStation = this.changeActiveStation.bind(this);

    this.state = {
      activeStation: 0,
      isPlaying: false
    };
  }

  // Start playing from the active station
  play() {
    this.setState({
      isPlaying: true
    });
  }

  // Pause playing from the active station
  pause() {
    this.setState({
      isPlaying: false
    });
  }

  // Toggle the status of playing from the active station
  togglePlaying() {
    const { isPlaying } = this.state;

    this.setState({
      isPlaying: !isPlaying
    });
  }

  // Change the active webradio station
  changeActiveStation(activeStation) {
    this.setState({
      activeStation
    });
  }

  // Render the component
  render() {
    const {
      stations,
      wakeUpTimeHours,
      wakeUpTimeMinutes,
      wakeUpTimeWeekdays
    } = this.props;
    const { activeStation, isPlaying } = this.state;

    return(
      <div className='webradio'>
        <div className='webradio-active-station'>
          { stations[activeStation].name }
        </div>
        <FontAwesome
          className='webradio-play-button'
          name={ isPlaying ? 'stop-circle-o' : 'play-circle-o' }
          size='5x'
          onClick={ this.togglePlaying }
          />
        { isPlaying && (
          <audio src={ stations[activeStation].url } autoPlay>
            Your browser does not support the audio tag.
          </audio>
        ) }
        <div className='webradio-station-icons'>
          { stations.map(function(station, index) {
            return (
              <WebradioIcon
                key={ 'webradio-station-' + index }
                icon={ station.icon }
                index={ index }
                onClick={ this.changeActiveStation }
                />
            );
          }.bind(this)) }
        </div>
        <WebradioAlarm
          wakeUpTimeHours={ wakeUpTimeHours }
          wakeUpTimeMinutes={ wakeUpTimeMinutes }
          wakeUpTimeWeekdays={ wakeUpTimeWeekdays }
          play={ this.play }
          />
      </div>
    );
  }
}

Webradio.propTypes = {
  stations: React.PropTypes.array.isRequired,
  wakeUpTimeHours: React.PropTypes.number.isRequired,
  wakeUpTimeMinutes: React.PropTypes.number.isRequired,
  wakeUpTimeWeekdays: React.PropTypes.array.isRequired
};

export default Webradio;
