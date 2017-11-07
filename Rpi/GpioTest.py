import RPi.GPIO as GPIO
import time

ledPin = 7
GPIO.setmode(GPIO.BOARD)
GPIO.setup(ledPin, GPIO.OUT)

for i in range(0, 50):
    GPIO.output(ledPin, GPIO.LOW)
    time.sleep(0.05)
    GPIO.output(ledPin, GPIO.HIGH)
    time.sleep(0.05)

GPIO.cleanup()
