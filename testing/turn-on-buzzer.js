const Gpio = require('pigpio').Gpio;

const buzzer_pin = 17;

const buzzer = new Gpio(buzzer_pin, {mode: Gpio.OUTPUT});


buzzer.digitalWrite(1);
setTimeout(() => {
    buzzer.digitalWrite(0);
}, 1000);

