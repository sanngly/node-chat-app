var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'reach.sanjoy.ganguly@gmail.com';
        var text = 'Hi, I am on leave today';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate location message object', () => {
        var from = 'reach.sanjoy.ganguly@gmail.com';
        var latitude = 12;
        var longitude = 17;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});