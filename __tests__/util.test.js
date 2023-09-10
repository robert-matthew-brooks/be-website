const {
  rejectIfNotNumber,
  rejectIfLessThan,
  rejectIfNotInTable,
  rejectIfNotInGreenList,
} = require('../models/util/validate');

describe('validate.js', () => {
  describe('rejectIfNotNumber()', () => {
    it('should reject the promise if not provided a number', async () => {
      await expect(rejectIfNotNumber({ input: 'abc' })).rejects.toBeDefined();
    });

    it('should not reject the promise if provided a string which contains only numbers', () => {
      expect(rejectIfNotNumber({ input: '1' })).toBeUndefined();
    });

    it('should not reject the promise if provided a number', () => {
      expect(rejectIfNotNumber({ input: 1 })).toBeUndefined();
    });
  });

  describe('rejectIfLessThan()', () => {
    it('should reject the promise if input is less than limit', async () => {
      await expect(rejectIfLessThan({ input: 1 }, 2)).rejects.toBeDefined();
    });

    it('should reject the promise if one of multiple inputs is less than limit', async () => {
      await expect(
        rejectIfLessThan({ input1: 1, input2: 3 }, 2)
      ).rejects.toBeDefined();
    });

    it('should not reject the promise if input is equal to limit', () => {
      expect(rejectIfLessThan({ input: 2 }, 2)).toBeUndefined();
    });

    it('should not reject the promise if input is greater than limit', () => {
      expect(rejectIfLessThan({ input: 3 }, 2)).toBeUndefined();
    });
  });

  describe('rejectIfNotInTable()', () => {
    it('should reject the promise if value not found in column of table', async () => {
      await expect(rejectIfNotInTable()).rejects.toBeDefined();
    });

    it('should not reject the promise if value found in column of table', () => {});
  });
});
