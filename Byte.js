const Byte = require('./lib/structs/Byte')
const client = new Byte();

client.start();

client.logger.log('Client started!');

process.on("rejectionHandled", (err) => console.error(err));
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));
