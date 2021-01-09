var ws281x = require('rpi-ws281x-native');

// LED strip configuration:
const LED_COUNT      = 8       // Number of LED pixels.
const LED_PIN        = 18      // GPIO pin connected to the pixels (18 uses PWM!).
const LED_FREQ_HZ    = 800000  // LED signal frequency in hertz (usually 800khz)
const LED_DMA        = 10      // DMA channel to use for generating signal (try 10)
const LED_BRIGHTNESS = 50     // Set to 0 for darkest and 255 for brightest
const LED_INVERT     = 0       // True to invert the signal (when using NPN transistor level shift)
const LED_CHANNEL    = 0       // set to '1' for GPIOs 13, 19, 41, 45 or 53

// Init leds
ws281x.init(LED_COUNT, {
    frequency: LED_FREQ_HZ,
    dmaNum: LED_DMA,
    gpioPin: LED_PIN,
    invert: LED_INVERT,
    brightness: LED_BRIGHTNESS,
});

// Trap the SIGINT and reset before exit
process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
});

// Helper function
function rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

// Set leds
pixelData = new Uint32Array(LED_COUNT);
for(var i = 0; i < LED_COUNT; i++) {
    pixelData[i] = rgb2Int(255, 255, 255);
}
ws281x.render(pixelData);

// Disable after 5 seconds
setTimeout(() => {
    ws281x.reset();
}, 5000);
