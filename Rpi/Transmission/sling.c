#include <stdio.h>
#include <stdlib.h>
#include "irslinger.h"

void hexToBinStr(char *, char *);
int hexChar2int(char);
void int2binStr(int, char *);

static const char* NEC = "NEC";

int main(int argc, char *argv[])
{
    if (argc != 3) {
        printf("Invalid input, hex value to sling is required. Put in format \"0x<Value>\"\n");
        exit(1);
    }

    if (strcmp(argv[1], NEC) != 0) {
    	printf("Invalid protocol given. Only \"NEC\" is supported at this point");
	exit(1);
    }

    uint32_t outPin = 4;            // The Broadcom pin number the signal will be sent on
    int frequency = 38000;           // The frequency of the IR signal in Hz
    double dutyCycle = 0.5;          // The duty cycle of the IR signal. 0.5 means for every cycle,
                                     // the LED will turn on for half the cycle time, and off the other half
    int leadingPulseDuration = 4500; // The duration of the beginning pulse in microseconds
    int leadingGapDuration = 4500;   // The duration of the gap in microseconds after the leading pulse
    int onePulse = 562;              // The duration of a pulse in microseconds when sending a logical 1
    int zeroPulse = 562;             // The duration of a pulse in microseconds when sending a logical 0
    int oneGap = 1688;               // The duration of the gap in microseconds when sending a logical 1
    int zeroGap = 562;               // The duration of the gap in microseconds when sending a logical 0
    int sendTrailingPulse = 1;       // 1 = Send a trailing pulse with duration equal to "onePulse"
                                     // 0 = Don't send a trailing pulse

    char binaryResult[33];
    binaryResult[0] = '\0';
    hexToBinStr(argv[2], binaryResult);
    printf("\"%s\"\n", binaryResult);

    int result = irSling(
        outPin,
        frequency,
        dutyCycle,
        leadingPulseDuration,
        leadingGapDuration,
        onePulse,
        zeroPulse,
        oneGap,
        zeroGap,
        sendTrailingPulse,
        binaryResult);

    return result;
}

void hexToBinStr(char *hex, char *result)
{
    int i;

    for (i = 2; i < 10; i++)
    {
        char binaryResult[5];
        char hexChar = hex[i];
        int value = hexChar2int(hexChar);
        int2binStr(value, binaryResult);
        binaryResult[4] = '\0';
        strcat(result, binaryResult);
    }
}

int hexChar2int(char hexChar)
{
    return (hexChar > '9') ? (hexChar &~ 0x20) - 'A' + 10 : (hexChar - '0');
}

void int2binStr(int value, char *result)
{
    int i;
    for (i = 3; i >= 0; --i, value >>= 1)
    {
        result[i] = (value & 1) ? '1' : '0';
    }
}
