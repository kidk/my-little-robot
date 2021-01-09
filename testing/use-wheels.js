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

    for(let i = 0; i < 9; i++) {
        pwm.channelOff(i);
    }

    // 0 is left front forward
    // 1 is left front backward
    // 2 is left back forward
    // 3 is left back backward
    // 4 is right back forward
    // 5 is right back backward
    // 6 is right front forward
    // 7 is right front backward


    let channel = 1;
    pwm.channelOn(channel);
    pwm.setPulseLength(channel, 4095); // Center

    // Speed: low end 0.2, high end 1
    pwm.setDutyCycle(channel, 0.2);

});
