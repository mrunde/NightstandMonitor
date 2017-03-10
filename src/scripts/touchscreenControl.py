#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os #for OS program calls
import sys #For Clean sys.exit command
import time #for sleep/pause 
import RPi.GPIO as GPIO #read the GPIO pins

GPIO.setmode(GPIO.BCM)

SENSOR_PIN = 23 # Sensor pin 23 for data out of the PIR sensor 

GPIO.setup(SENSOR_PIN, GPIO.IN)
time.sleep(30) # Wait 30 seconds
os.system("echo 1 > /sys/class/backlight/rpi_backlight/bl_power") # Turn off touchscreen backlight

while True:  # endless loop, waiting for nothing. Use Control+C to exit
    if GPIO.input(SENSOR_PIN): # Waits for motion signal from PIR on GPIO pin 23
    	os.system("echo 0 > /sys/class/backlight/rpi_backlight/bl_power") # Turn on touchscreen backlight
	print("PIR detected movement")
	time.sleep(10) # Wait 10 seconds before turning off touchscreen backlight
    else:
	os.system("echo 1 > /sys/class/backlight/rpi_backlight/bl_power") # Turn off touchscreen backlight
    
    #GPIO.cleanup()

