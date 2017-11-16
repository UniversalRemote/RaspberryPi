# -*- coding: utf-8 -*-

import sys
import RPi.GPIO as GPIO
import math
import os
from datetime import datetime
from time import sleep

INPUT_WIRE = 11
Past = datetime.now()
Now = datetime.now()
Debug = False

def main():

    global Debug
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(INPUT_WIRE, GPIO.IN)
    CurrentMode = GetSignalValue()
    Past = datetime.now()
    Now = datetime.now()

    if (len(sys.argv) == 2 and sys.argv[1] == "-d"):
	Debug = True;

    while True:
        NewMode = GetSignalValue()
        if (NewMode == False and CurrentMode == True):
	    Past = datetime.now()
            if (Debug):
		print "0: " + str((Past - Now).microseconds) + " μs"

        if (NewMode == True and CurrentMode == False):
            Now = datetime.now()
            print "1: " + str((Now - Past).microseconds) + " μs"
        CurrentMode = NewMode

def GetSignalValue():
    return GPIO.input(INPUT_WIRE)

if __name__ == "__main__":
    main()
