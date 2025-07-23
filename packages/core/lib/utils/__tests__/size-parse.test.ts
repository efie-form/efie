import { stringToSize } from '../size-parse';

describe('stringToSize', () => {
  describe('valid inputs with units', () => {
    it('should parse pixel values', () => {
      expect(stringToSize('10px')).toEqual({ type: 'length', value: 10, unit: 'px' });
      expect(stringToSize('0px')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('100.5px')).toEqual({ type: 'length', value: 100.5, unit: 'px' });
    });

    it('should parse percentage values - note: percentage unit is not supported by SizeUnit', () => {
      expect(stringToSize('50%')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('100%')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('0%')).toEqual({ type: 'length', value: 0, unit: 'px' });
    });

    it('should parse em values', () => {
      expect(stringToSize('1em')).toEqual({ type: 'length', value: 1, unit: 'em' });
      expect(stringToSize('2.5em')).toEqual({ type: 'length', value: 2.5, unit: 'em' });
    });

    it('should parse rem values', () => {
      expect(stringToSize('1rem')).toEqual({ type: 'length', value: 1, unit: 'rem' });
      expect(stringToSize('1.25rem')).toEqual({ type: 'length', value: 1.25, unit: 'rem' });
    });

    it('should parse viewport units', () => {
      expect(stringToSize('100vh')).toEqual({ type: 'length', value: 100, unit: 'vh' });
      expect(stringToSize('50vw')).toEqual({ type: 'length', value: 50, unit: 'vw' });
    });

    it('should handle case insensitive units', () => {
      expect(stringToSize('10PX')).toEqual({ type: 'length', value: 10, unit: 'px' });
      expect(stringToSize('1EM')).toEqual({ type: 'length', value: 1, unit: 'em' });
    });
  });

  describe('numeric values without units', () => {
    it('should default to px when no unit is provided', () => {
      expect(stringToSize('10')).toEqual({ type: 'length', value: 10, unit: 'px' });
      expect(stringToSize('0')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('100.5')).toEqual({ type: 'length', value: 100.5, unit: 'px' });
    });

    it('should handle negative values', () => {
      expect(stringToSize('-10')).toEqual({ type: 'length', value: -10, unit: 'px' });
      expect(stringToSize('-5px')).toEqual({ type: 'length', value: -5, unit: 'px' });
    });
  });

  describe('whitespace handling', () => {
    it('should trim whitespace', () => {
      expect(stringToSize(' 10px ')).toEqual({ type: 'length', value: 10, unit: 'px' });
      expect(stringToSize('\t1em\n')).toEqual({ type: 'length', value: 1, unit: 'em' });
      expect(stringToSize('  100  ')).toEqual({ type: 'length', value: 100, unit: 'px' });
    });
  });

  describe('invalid inputs', () => {
    it('should return default for empty strings', () => {
      expect(stringToSize('')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('   ')).toEqual({ type: 'length', value: 0, unit: 'px' });
    });

    it('should return default for non-string inputs', () => {
      // @ts-expect-error - Testing runtime behavior with invalid input
      expect(stringToSize()).toEqual({ type: 'length', value: 0, unit: 'px' });
      // @ts-expect-error - Testing runtime behavior with invalid input
      expect(stringToSize(123)).toEqual({ type: 'length', value: 0, unit: 'px' });
    });

    it('should return default for invalid string formats', () => {
      expect(stringToSize('abc')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('px10')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('10.5.5px')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('10xyz')).toEqual({ type: 'length', value: 0, unit: 'px' });
    });

    it('should return default for unsupported units', () => {
      expect(stringToSize('10pt')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('10cm')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('10in')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('50%')).toEqual({ type: 'length', value: 0, unit: 'px' });
    });
  });

  describe('edge cases', () => {
    it('should handle decimal numbers correctly', () => {
      expect(stringToSize('0.5px')).toEqual({ type: 'length', value: 0.5, unit: 'px' });
      expect(stringToSize('.75em')).toEqual({ type: 'length', value: 0.75, unit: 'em' });
    });

    it('should handle zero values', () => {
      expect(stringToSize('0')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('0px')).toEqual({ type: 'length', value: 0, unit: 'px' });
      expect(stringToSize('0em')).toEqual({ type: 'length', value: 0, unit: 'em' });
    });

    it('should handle very large numbers', () => {
      expect(stringToSize('999999px')).toEqual({ type: 'length', value: 999_999, unit: 'px' });
    });

    it('should handle very small numbers', () => {
      expect(stringToSize('0.001rem')).toEqual({ type: 'length', value: 0.001, unit: 'rem' });
    });
  });
});
