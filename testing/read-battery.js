const i2c = require('i2c-bus');


const ADDRESS = 0x48; // 72 - 1001000
const ADDRESS_WRITE = 0x49; // 73 = 1001001
const COMMAND = 0x84; // 132 - 1 000 01 00
const COMMAND_BATTERY = 0b10010100;
const CHANNEL = 2;

let connection = i2c.openSync(1);

function read(callback) {
    //connection.writeByteSync(ADDRESS, COMMAND_BATTERY, 0)
    connection.readByte(ADDRESS, COMMAND_BATTERY, (error, rawData) => {
        let voltage = rawData / 255 * 3.7;

        callback(voltage);
    });
}
read((voltage) => {
    console.log('voltage', voltage);
});
