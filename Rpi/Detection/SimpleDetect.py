import RPi.GPIO as GPIO
import math
import os
from datetime import datetime
from time import sleep

# This is for revision 1 of the Raspberry Pi, Model B
# This pin is also referred to as GPIO23

INPUT_WIRE = 11
Past = datetime.now()
Now = datetime.now()

def main():

    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(INPUT_WIRE, GPIO.IN)
    CurrentMode = GetSignalValue()

    while True:
        NewMode = GetSignalValue()
        if (NewMode == False and CurrentMode == True):
            Past = datetime.now();

        if (NewMode == True and CurrentMode == False):
            Now = datetime.now();
            print "Pulse for " + str((Now - Past).microseconds)
        CurrentMode = NewMode

def GetSignalValue():
    return GPIO.input(INPUT_WIRE)

if __name__ == "__main__":
    main()