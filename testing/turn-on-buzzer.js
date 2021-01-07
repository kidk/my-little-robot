const gpio = require('onoff').Gpio;
const buzzer = new gpio(17, 'out');

buzzer.writeSync(1);
setTimeout(() => {
    buzzer.writeSync(0);
}, 1000);
