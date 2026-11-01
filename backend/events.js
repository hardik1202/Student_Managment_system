const EventEmitter = require("events");

class StudentEvents extends EventEmitter {}

module.exports = new StudentEvents();
