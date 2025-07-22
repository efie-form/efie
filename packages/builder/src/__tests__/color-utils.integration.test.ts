/**
 * Integration tests for color utility functions
 *
 * These tests use the REAL color-convert library to ensure our functions
 * work correctly with the actual third-party dependency in production.
 *
 * NOTE: These tests may require additional Jest configuration to handle
 * ES modules from the color-convert library. If they fail due to ES module
 * issues, you can:
 * 1. Update Jest config to handle ES modules
 * 2. Run these tests in a different environment (e.g., Vitest)
 * 3. Use these as manual integration tests
 */

// Import the actual functions (no mocking)
import { hslaToHex, rgbaToHex } from '@efie-form/core';

describe('Color Utility Functions - Integration Tests', () => {
  describe('Real color-convert library integration', () => {
    it('should convert HSL to hex using real color-convert library', () => {
      // Test with known color values that we can verify manually
      const redHex = hslaToHex(0, 100, 50); // Pure red
      expect(redHex).toBe('#ff0000');

      const greenHex = hslaToHex(120, 100, 50); // Pure green
      expect(greenHex).toBe('#00ff00');

      const blueHex = hslaToHex(240, 100, 50); // Pure blue
      expect(blueHex).toBe('#0000ff');
    });

    it('should handle real-world color conversions accurately', () => {
      // Test some real-world colors
      const orangeHex = hslaToHex(30, 100, 50); // Orange
      expect(orangeHex).toBe('#ff8000');

      const purpleHex = hslaToHex(300, 100, 50); // Purple/Magenta
      expect(purpleHex).toBe('#ff00ff');

      const cyanHex = hslaToHex(180, 100, 50); // Cyan
      expect(cyanHex).toBe('#00ffff');
    });

    it('should handle alpha values correctly with real library', () => {
      const semiTransparentRed = hslaToHex(0, 100, 50, 0.5);
      expect(semiTransparentRed).toBe('#ff000080');

      const quarterTransparentBlue = hslaToHex(240, 100, 50, 0.25);
      expect(quarterTransparentBlue).toBe('#0000ff40');
    });

    it('should match between RGBA and HSLA for equivalent colors', () => {
      // Red: RGB(255, 0, 0) = HSL(0, 100%, 50%)
      const rgbRed = rgbaToHex(255, 0, 0);
      const hslRed = hslaToHex(0, 100, 50);
      expect(rgbRed).toBe(hslRed);

      // Green: RGB(0, 255, 0) = HSL(120, 100%, 50%)
      const rgbGreen = rgbaToHex(0, 255, 0);
      const hslGreen = hslaToHex(120, 100, 50);
      expect(rgbGreen).toBe(hslGreen);

      // Blue: RGB(0, 0, 255) = HSL(240, 100%, 50%)
      const rgbBlue = rgbaToHex(0, 0, 255);
      const hslBlue = hslaToHex(240, 100, 50);
      expect(rgbBlue).toBe(hslBlue);
    });

    it('should handle grayscale colors correctly', () => {
      // Test grayscale where HSL saturation = 0
      const black = hslaToHex(0, 0, 0);
      expect(black).toBe('#000000');

      const white = hslaToHex(0, 0, 100);
      expect(white).toBe('#ffffff');

      const gray = hslaToHex(0, 0, 50);
      expect(gray).toBe('#808080');
    });

    it('should handle edge cases that might differ from our mock', () => {
      // These tests will reveal if our mock behaves differently from the real library

      // Test hue wrapping
      const red360 = hslaToHex(360, 100, 50);
      const red0 = hslaToHex(0, 100, 50);
      expect(red360).toBe(red0);

      // Test very small values
      const nearBlack = hslaToHex(0, 100, 1);
      expect(nearBlack).toMatch(/^#[0-9a-f]{6}$/i);

      // Test very high lightness
      const nearWhite = hslaToHex(0, 100, 99);
      expect(nearWhite).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Production-like scenarios', () => {
    it('should handle user input scenarios', () => {
      // Simulate real user inputs from color pickers
      const userColors = [
        { h: 210, s: 75, l: 45 }, // A nice blue
        { h: 45, s: 90, l: 60 }, // A warm yellow
        { h: 330, s: 65, l: 55 }, // A pink
      ];

      for (const { h, s, l } of userColors) {
        const hex = hslaToHex(h, s, l);
        expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
        expect(hex.length).toBe(7);
      }
    });

    it('should handle theme color conversions', () => {
      // Test common theme colors
      const themeColors = {
        primary: hslaToHex(220, 90, 50), // Blue primary
        secondary: hslaToHex(45, 85, 55), // Orange secondary
        success: hslaToHex(120, 70, 45), // Green success
        warning: hslaToHex(40, 95, 60), // Yellow warning
        danger: hslaToHex(0, 85, 55), // Red danger
      };

      for (const hex of Object.values(themeColors)) {
        expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
        expect(hex.length).toBe(7);
      }
    });
  });
});

/**
 * MANUAL TESTING INSTRUCTIONS:
 *
 * If these integration tests fail due to Jest ES module configuration,
 * you can manually verify the integration by:
 *
 * 1. Creating a simple Node.js script:
 *    ```javascript
 *    import { hslaToHex, rgbaToHex } from './src/lib/utils.js';
 *
 *    console.log('Red HSL:', hslaToHex(0, 100, 50)); // Should be #ff0000
 *    console.log('Red RGB:', rgbaToHex(255, 0, 0));  // Should be #ff0000
 *    ```
 *
 * 2. Running it with Node.js ES modules:
 *    ```bash
 *    node --experimental-modules test-integration.mjs
 *    ```
 *
 * 3. Or using a tool like Vitest which handles ES modules better:
 *    ```bash
 *    npx vitest run color-utils.integration.test.ts
 *    ```
 */
