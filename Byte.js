const ByteClient = require('./src/structs/Byte');
const Byte = new ByteClient();

Byte.start();

process.on("rejectionHandled", (err) => console.error(err));
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));
