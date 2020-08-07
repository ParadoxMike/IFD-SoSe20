#include <Adafruit_NeoPixel.h>

#define PIN 2           //pin on which the LED-Data line is connected
#define NUMLEDS 6     //How many LEDs are attached

Adafruit_NeoPixel leds(NUMLEDS, PIN, NEO_GRB + NEO_KHZ800);

bool first = true;

void setup() {
    leds.begin(); // INITIALIZE
}

void loop() {
    if (first == true) {
        for(int i=0; i<NUMLEDS; i++) {
            leds.setPixelColor(i, leds.Color(255,140,0));
        }
        leds.show();
        delay(2000);
        for(int i=0; i<NUMLEDS; i++) {
            leds.setPixelColor(i, leds.Color(255, 0, 0));
        }
        leds.show();
        delay(6000);
        for(int i=0; i<NUMLEDS; i++) {
            leds.setPixelColor(i, leds.Color(0, 255, 0));
        }
        leds.show();
    }
    first = false;
}