const expect = require('expect');

let {generateMessage} = require('./message');

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