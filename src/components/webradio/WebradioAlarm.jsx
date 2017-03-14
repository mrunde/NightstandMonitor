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

// WebradioAlarm
class WebradioAlarm extends React.Component {

  constructor(props) {
    super(props);

    this.clearIntervals = this.clearIntervals.bind(this);
    this.toggleActiveState = this.toggleActiveState.bind(this);
    this.updateWakeUpTime = this.updateWakeUpTime.bind(this);
    this.increaseHours = this.increaseHours.bind(this);
    this.decreaseHours = this.decreaseHours.bind(this);
    this.increaseMinutes = this.increaseMinutes.bind(this);
    this.decreaseMinutes = this.decreaseMinutes.bind(this);

    this.state = {
      active: true
    };
  }

  // Set the alarm clock interval
  componentDidMount() {
    const { wakeUpTimeHours, wakeUpTimeMinutes } = this.props;

    this.updateWakeUpTime({
      wakeUpTimeHours,
      wakeUpTimeMinutes
    });
  }

  // Clear the alarm clock interval
  componentWillUnmount() {
    this.clearIntervals();
  }

  // Clear all intervals of this component
  clearIntervals() {
    try {
      clearInterval(this.state.alarmClockInterval);
    } catch (exc) {
      // No interval has been set up yet, nothing to clear therefore
    }
  }

  // Called when the alarm is turned on or off
  toggleActiveState() {
    const { active, wakeUpTimeHours, wakeUpTimeMinutes } = this.state;

    if (active) {
      this.setState({
        active: false
      });
      this.clearIntervals();
    } else {
      this.setState({
        active: true
      });
      this.updateWakeUpTime({
        wakeUpTimeHours,
        wakeUpTimeMinutes
      });
    }
  }

  // Called when the wake up time changes
  updateWakeUpTime(wakeUpTime) {
    const { wakeUpTimeWeekdays } = this.props;
    const {wakeUpTimeHours, wakeUpTimeMinutes } = wakeUpTime;

    this.setState({
      wakeUpTimeHours,
      wakeUpTimeMinutes
    });

    // Clear the alarm clock interval first (if it exists)
    this.clearIntervals();

    // Then set up a new alarm clock interval
    this.state.alarmClockInterval = window.setInterval(function() {
      // Get the current time and weekday
      let now = new Date();
      let weekday = now.getDay();

      // Create the date for the alarm clock
      let day = now.getDate();
      let month = now.getMonth();
      let year = now.getFullYear();
      let alarm = new Date(year, month, day, wakeUpTimeHours, wakeUpTimeMinutes);

      // Calculate the time difference
      let timeDiff = alarm.getTime() - now.getTime();

      // Check whether the alarm shall start
      if (wakeUpTimeWeekdays.indexOf(weekday) >= 0
          && timeDiff > 0
          && timeDiff < 15 * 60000) {
        this.props.play();
      }
    }.bind(this), 1000);
  }

  // Increase the wake up time by one hour
  increaseHours(m) {
    const { wakeUpTimeHours, wakeUpTimeMinutes } = this.state;

    let minutes;
    if (isNaN(m)) {
      minutes = wakeUpTimeMinutes;
    } else {
      minutes = m;
    }

    if (wakeUpTimeHours === 23) {
      this.updateWakeUpTime({
        wakeUpTimeHours: 0,
        wakeUpTimeMinutes: minutes
      });
    } else {
      this.updateWakeUpTime({
        wakeUpTimeHours: wakeUpTimeHours + 1,
        wakeUpTimeMinutes: minutes
      });
    }
  }

  // Decrease the wake up time by one hour
  decreaseHours(m) {
    const { wakeUpTimeHours, wakeUpTimeMinutes } = this.state;

    let minutes;
    if (isNaN(m)) {
      minutes = wakeUpTimeMinutes;
    } else {
      minutes = m;
    }

    if (wakeUpTimeHours === 0) {
      this.updateWakeUpTime({
        wakeUpTimeHours: 23,
        wakeUpTimeMinutes: minutes
      });
    } else {
      this.updateWakeUpTime({
        wakeUpTimeHours: wakeUpTimeHours - 1,
        wakeUpTimeMinutes: minutes
      });
    }
  }

  // Increase the wake up time by one minute
  increaseMinutes() {
    const { wakeUpTimeHours, wakeUpTimeMinutes } = this.state;

    if (wakeUpTimeMinutes === 59) {
      this.increaseHours(0);
    } else {
      this.updateWakeUpTime({
        wakeUpTimeHours,
        wakeUpTimeMinutes: wakeUpTimeMinutes + 1
      });
    }
  }

  // Decrease the wake up time by one minute
  decreaseMinutes() {
    const { wakeUpTimeHours, wakeUpTimeMinutes } = this.state;

    if (wakeUpTimeMinutes === 0) {
      this.decreaseHours(59);
    } else {
      this.updateWakeUpTime({
        wakeUpTimeHours,
        wakeUpTimeMinutes: wakeUpTimeMinutes - 1
      });
    }
  }

  // Render the component
  render() {
    const { active, wakeUpTimeHours, wakeUpTimeMinutes } = this.state;

    if (active) {
      return (
        <div className='webradio-alarm'>
          <span
            className='webradio-alarm-active-button'
            onClick={ this.toggleActiveState }
            >
            <FontAwesome
              name='clock-o'
              size='4x'
              />
          </span>
          <FontAwesome
            className='webradio-alarm-hours-minus'
            name='minus-circle'
            size='2x'
            onClick={ this.decreaseHours }
            />
          <div className='webradio-alarm-hours'>
            { wakeUpTimeHours }
          </div>
          <FontAwesome
            className='webradio-alarm-hours-plus'
            name='plus-circle'
            size='2x'
            onClick={ this.increaseHours }
            />
          <FontAwesome
            className='webradio-alarm-minutes-minus'
            name='minus-circle'
            size='2x'
            onClick={ this.decreaseMinutes }
            />
          <div className='webradio-alarm-minutes'>
            { wakeUpTimeMinutes }
          </div>
          <FontAwesome
            className='webradio-alarm-minutes-plus'
            name='plus-circle'
            size='2x'
            onClick={ this.increaseMinutes }
            />
        </div>
      );
    } else {
      return (
        <div className='webradio-alarm'>
          <span
            className='fa-stack fa-2x webradio-alarm-active-button'
            onClick={ this.toggleActiveState }
            >
            <FontAwesome
              name='clock-o'
              stack='1x'
              />
            <FontAwesome
              className='webradio-alarm-active-button-disabled fa-flip-horizontal'
              name='ban'
              stack='2x'
              />
          </span>
        </div>
      );
    }
  }
};

WebradioAlarm.propTypes = {
  wakeUpTimeHours: React.PropTypes.number.isRequired,
  wakeUpTimeMinutes: React.PropTypes.number.isRequired,
  wakeUpTimeWeekdays: React.PropTypes.array.isRequired,
  play: React.PropTypes.func.isRequired
};

export default WebradioAlarm;
