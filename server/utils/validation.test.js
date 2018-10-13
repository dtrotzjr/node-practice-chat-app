const expect = require('expect');

let {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should validate a real string', () => {
        const str = " t 0 1  ";
        expect(isRealString(str)).toBeTruthy();
    });

    it('should not validate a non-string', () => {
        const nonsStr = -100;
        expect(isRealString(nonsStr)).toBeFalsy();
    });

    it('should not validate an empty string', () => {
        const emptyStr = "   ";
        expect(isRealString(emptyStr)).toBeFalsy();
    });
});