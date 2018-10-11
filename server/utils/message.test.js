const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
   it('should generate a correct message object', () => {
       const from =  "David";
       const text = "This is a message";
       const message = generateMessage(from, text);

       expect(typeof message.createdAt).toEqual('number');
       expect(message).toHaveProperty('from');
       expect(message).toHaveProperty('text');
       expect(message.from).toEqual(from);
       expect(message.text).toEqual(text);
   })
});

describe('generateLocationMessage', () => {
    it('should generate a correct location message object', () => {
        const from =  "David";
        const longitude = 100;
        const latitude = -900;
        const message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toEqual('number');
        expect(message).toHaveProperty('from');
        expect(message).toHaveProperty('url');
        expect(message.from).toEqual(from);
        expect(message.url).toEqual(`https://www.google.com/maps?q=${latitude},${longitude}`);
    })
});