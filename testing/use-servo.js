var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: false
};
pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    console.log("Initialization done");

    // 8 is horizontal movement
    // 9 is vertical movement

    pwm.channelOff(0);
    pwm.channelOn(8);
    pwm.channelOn(9);
    pwm.setPulseLength(8, 2100); // Center
    pwm.setPulseLength(9, 1300); // Center

    //pwm.setPulseLength(9, 1300); // Low max
    //pwm.setPulseLength(9, 2300); // High max

    // pwm.setPulseLength(8, 1600); // Right max
    // pwm.setPulseLength(8, 2600); // Left max
});
