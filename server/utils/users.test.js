var expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '10641895',
            name: 'Sanjoy',
            room: 'The Cisco Fans'
        };

        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
});