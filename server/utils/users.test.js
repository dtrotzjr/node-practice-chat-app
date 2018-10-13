const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
       users = new Users();
        users.users = [{
            id: '1',
            name: 'James',
            room: 'New Testament Characters'
        }, {
            id: '2',
            name: 'Moses',
            room: 'Old Testament Characters'
        }, {
            id: '3',
            name: 'John',
            room: 'New Testament Characters'
        }];
    });

    it('should add new user', () => {
       const users = new Users();
       const user = {
           id: 1234,
           name: 'John',
           room: 'The Office Fans'
       };

       const newUser = users.addUser(user.id, user.name, user.room);
       expect(newUser).toEqual(user);
       expect(users.users).toEqual([user]);
    });

    it('should return a user', () => {
       const user = users.getUser(users.users[1].id);
       expect(user).toEqual(users.users[1]);
    });

    it('should not return a user', () => {
        const user = users.getUser('5');
        expect(user).toBeFalsy();
    });

    it('should remove a user', () => {
        const userToRemove = users.users[0].id;
        const usersToKeep = [users.users[1].id, users.users[2].id];
        const removedUser = users.removeUser(userToRemove);
        expect(removedUser.id).toEqual(userToRemove);
        expect(users.users.length).toEqual(2);
        const test2 = users.getUser(userToRemove);
        expect(test2).toBeFalsy();

        const test3 = users.getUser(usersToKeep[0]);
        expect(test3).toBeTruthy();
        const test4 = users.getUser(usersToKeep[1]);
        expect(test4).toBeTruthy();
    });

    it('should not remove a user', () => {
        const userToRemove = '5';

        const removedUser = users.removeUser(userToRemove);
        expect(removedUser).toBeFalsy();
        expect(users.users.length).toEqual(3);
    });

    it('should return users in a room', () => {
        const userList = users.getUserList(users.users[0].room);
        expect(userList).toEqual([users.users[0].name, users.users[2].name]);
    });
});