
// const EventEmitter = require('events');

// class Logger extends EventEmitter {
//     log(message){
//         //send an http request
//         console.log(message);
//         //eventEmitter.emit, will trigger listener .on() in app.js
//         this.emit('messageLogged', {id: 1, url: 'http://'});
//     }
// }


// module.exports = Logger;

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`My name is ${this.name} and I am ${this.age}.`)
    }
};

module.exports = Person;