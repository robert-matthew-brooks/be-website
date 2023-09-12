const db = require('../db/connection');
const {
  rejectIfNotDigit,
  rejectIfNotValidSlug,
  rejectIfLessThan,
  rejectIfNotInTable,
  rejectIfNotInGreenList,
} = require('../models/util/validate');

afterAll(() => {
  db.end();
});

describe('validate.js', () => {
  describe('rejectIfNotNumber()', () => {
    it('should reject the promise if not provided a number', async () => {
      await expect(rejectIfNotDigit({ input: 'abc' })).rejects.toBeDefined();
    });

    it('should not reject the promise if provided a string which contains only numbers', () => {
      expect(rejectIfNotDigit({ input: '1' })).toBeUndefined();
    });

    it('should not reject the promise if provided a number', () => {
      expect(rejectIfNotDigit({ input: 1 })).toBeUndefined();
    });
  });

  describe('rejectIfNotValidSlug()', () => {
    it('should reject the promise if not provided anything but letters, numbers and hyphens', async () => {
      await expect(
        rejectIfNotValidSlug({ input: 'cannot-$$$-have-!!!-symbols-???' })
      ).rejects.toBeDefined();

      await expect(
        rejectIfNotValidSlug({ input: 'cannot have spaces' })
      ).rejects.toBeDefined();
    });

    it('should not reject the promise if provided provided letters, numbers and hyphens', () => {
      expect(rejectIfNotValidSlug({ input: 'abc-123' })).toBeUndefined();
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
      await expect(
        rejectIfNotInTable('invalid-slug', 'slug', 'projects')
      ).rejects.toBeDefined();
    });

    it('should not reject the promise if value found in column of table', async () => {
      expect(
        await rejectIfNotInTable('proj-1', 'slug', 'projects')
      ).toBeUndefined();
    });
  });

  describe('rejectIfNotInGreenList()', () => {
    it('should reject the promise if value not found in greenlist', async () => {
      await expect(
        rejectIfNotInGreenList({ greeting: 'yo' }, ['hi', 'hello', 'hey'])
      ).rejects.toBeDefined();
    });

    it('should not reject the promise if value found in greenlist', () => {
      expect(
        rejectIfNotInGreenList({ greeting: 'hello' }, ['hi', 'hello', 'hey'])
      ).toBeUndefined();
    });
  });
});
