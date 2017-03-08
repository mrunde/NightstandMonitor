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

// Required constants
import { DAYTIME, GREETINGS } from './constants';

// Welcome
class Welcome extends React.Component {

  constructor(props) {
    super(props);

    this.setGreeting = this.setGreeting.bind(this);
  }

  // Set the greeting initially
  componentWillMount() {
    this.setGreeting();
  }

  // Set the time interval
  componentDidMount() {
    const thirtyMinutes = 30 * 60 * 1000;

    this.state.timeInterval = window.setInterval(function () {
      this.setGreeting();
    }.bind(this), thirtyMinutes);
  }

  // Clear the time interval
  componentWillUnmount() {
    clearInterval(this.state.timeInterval);
  }

  // Get the greeting for the daytime
  setGreeting() {
    var currentDate = new Date();
    var currentHours = currentDate.getHours();

    var greeting;
    if (currentHours < DAYTIME.NIGHT) {
      greeting = GREETINGS.NIGHT;
    } else if (currentHours < DAYTIME.MORNING) {
      greeting = GREETINGS.MORNING;
    } else if (currentHours < DAYTIME.AFTERNOON) {
      greeting = GREETINGS.AFTERNOON;
    } else {
      greeting = GREETINGS.EVENING;
    }

    this.setState({
      greeting
    });
  }

  // Render the component
  render() {
    const { name } = this.props;
    const { greeting } = this.state;

    return(
      <h1>
        { greeting + ', ' + name }
      </h1>
    );
  }
}

Welcome.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Welcome;