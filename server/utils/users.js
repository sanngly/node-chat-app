/* [{
    id: '%$^&CVYVF&R^&',
    name: 'Sanjeeva',
    room: 'The Office Fans'
}]

class Person {
    constructor(name, age){
        console.log(`Constructor called .. ${name} - ${age}`);
        this.name = name;
        this.age = age;
    }
    getPersonInfo() {
        return `${this.name} and ${this.age}`;
    }
}
var me = new Person('Sanjoy', '38');
//console.log(`${me.name} and ${me.age}`);
console.log(me.getPersonInfo());
 */

 class Users {
     constructor() {
         this.users = [];
     }

     addUser(id, name, room) {
         var user = {id, name, room};
         this.users.push(user);
         return user;
     }
 }

 module.exports = {Users};