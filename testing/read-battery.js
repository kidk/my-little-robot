const i2c = require('i2c-bus');


const ADDRESS = 0x48;
const COMMAND = 0x84;

let connection = i2c.openSync(1);

function read(callback) {
    connection.readByte(ADDRESS, COMMAND, (error, rawData) => {
        let voltage = rawData / 255.0 * 3.3;

        callback(voltage);
    });
}
read((voltage) => {
    console.log('voltage', voltage);
});
