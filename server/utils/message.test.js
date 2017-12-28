var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'reach.sanjoy.ganguly@gmail.com';
        var text = 'Hi, I am on leave today';
        var message = generateMessage(from, text);
        //expect(message.createdAt).toBeA('number');
        //expect(message).toInclude({from, text});
    });
});