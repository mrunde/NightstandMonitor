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
// Imports
// -----------------------------------------------------------------------------

// Load the application's configuration
const config = require('./config');

// Required modules
const colors = require('colors');
const exec = require('child_process').exec;
const express = require('express');
const path = require('path');

// -----------------------------------------------------------------------------
// Start Message
// -----------------------------------------------------------------------------

console.log('\n############################################################');
console.log('############################################################\n');
console.log('\n                     Nightstand Monitor\n'.cyan);
console.log('\n  Application:', 'Running on a Raspberry Pi this application'.cyan);
console.log('\n                  gives you a morning briefing while you'.cyan);
console.log('\n                  still lay in bed'.cyan);
console.log('\n  Version:    ', '1.0.0'.cyan);
console.log('\n  Copyright:  ', '2017'.cyan);
console.log('\n  Licence:    ', 'MIT'.cyan);
console.log('\n  Author:     ', 'Marius Runde'.cyan);
console.log('\n############################################################');
console.log('############################################################\n');
console.log('\n////////////////////////////////////////////////////////////\n');
console.log('               STARTING SERVER...'.cyan);
console.log('\n////////////////////////////////////////////////////////////\n');

// -----------------------------------------------------------------------------
// Express Web Server
// -----------------------------------------------------------------------------

// Set up the express web server
let app = express();
app.use(express.static(path.join(__dirname, '/dist')));

// Start the web server
var server = app.listen(config.EXPRESS_PORT, function() {
  const port = config.EXPRESS_PORT.toString();
  console.log('\n  Express server listening on port', port.cyan);
  console.log('\n------------------------------------------------------------');
});

// -----------------------------------------------------------------------------
// Start Scripts in Production
// -----------------------------------------------------------------------------

// Read the arguments from the command line
const production = process.argv[2] || null;

if (production === 'production') {
  console.log('\n////////////////////////////////////////////////////////////\n');
  console.log('               STARTING SCRIPTS...'.cyan);
  console.log('\n////////////////////////////////////////////////////////////\n');

  const PATH_TO_SCRIPTS = '/' + __dirname + '/src/scripts';

  // Turn off the green LED of the Pi
//  console.log('\n  Turning off LED...');
//  exec('echo 0 >/sys/class/leds/led0/brightness');

  // Control the touchscreen's backlight
  const touchscreenControlScript = PATH_TO_SCRIPTS + '/touchscreenControl.py';
  console.log('\n  Starting touchscreen control...');
  exec('sudo python ' + touchscreenControlScript);

  // Open the application with the Chromium browser in kiosk mode
  const url = config.EXPRESS_HOST + ':' + config.EXPRESS_PORT;
  console.log('\n  Starting browser and opening application...');
  exec('chromium-browser --noerrdialogs --incognito --kiosk ' + url);
}
