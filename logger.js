const EventEmitter = require('events');
// create a random universial of an id
const uuid = require('uuid');

class Logger extends EventEmitter {
    log(msg) {
        // call / raise event
        this.emit('message', { id: uuid.v4(), msg });
    }
}

module.exports = Logger;