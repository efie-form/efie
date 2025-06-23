/**
 * Test Suite Entry Point
 *
 * This file serves as the main entry point for all validation tests.
 * It imports all test suites to ensure they are discovered and run by Jest.
 */

// Import all test suites to ensure they are run
import './schema/root-schema.test';
import './fields/fields-validation.test';
import './fields/field-types.test';
import './properties/property-basics.test';
import './properties/string-properties.test';
import './properties/number-boolean.test';
import './properties/size-properties.test';
import './properties/color-properties.test';
import './properties/complex-properties.test';
import './properties/specialized-properties.test';
import './edge-cases.test';

// Add a simple test to satisfy Jest's requirement
describe('Validation Test Suite', () => {
  it('should load all test modules successfully', () => {
    // This test ensures that all imports above are valid
    expect(true).toBe(true);
  });
});
