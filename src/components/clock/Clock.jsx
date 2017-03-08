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

// Clock
class Clock extends React.Component {

  constructor(props) {
    super(props);

    this.setTime = this.setTime.bind(this);

    this.state = {
      time: null
    };
  }

  // Set the time initially
  componentWillMount() {
    this.setTime();
  }

  // Set the time interval
  componentDidMount() {
    this.state.timeInterval = window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  }

  // Clear the time interval
  componentWillUnmount() {
    clearInterval(this.state.timeInterval);
  }

  // Set the time
  setTime() {
    var currentDate = new Date();
    this.setState({
      time: currentDate.toLocaleTimeString()
    });
  }

  // Render the component
  render() {
    return(
      <h1>
        { this.state.time }
      </h1>
    );
  }
};

export default Clock;
