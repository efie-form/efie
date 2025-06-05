# Schema State Optimizations

This document outlines the performance optimizations implemented in the schema state management system.

## Issues Fixed

### 1. Object Reference Issues with Maps
**Problem**: Maps stored object references that became stale when schema was updated with new objects.
**Solution**: 
- Optimized map rebuilding to clear existing maps before repopulating
- Added incremental map updates for property-only changes
- Implemented efficient field lookup caching

### 2. Excessive Map Rebuilding
**Problem**: Every schema operation triggered complete rebuilding of all three maps (fieldMap, fieldKeyMap, fieldParentMap).
**Solution**:
- Added `enableOptimizations` flag to control optimization behavior
- For property updates: only update the specific field in fieldMap
- For structural changes: still rebuild maps but with optimized algorithms

### 3. Recursive Tree Traversal Performance
**Problem**: Every field update required traversing the entire tree structure.
**Solution**:
- Implemented optimized tree traversal functions:
  - `findFieldInTree`: Early exit when field is found
  - `addFieldToTree`: Direct insertion without full tree traversal
  - `removeFieldFromTree`: Efficient filtering and mapping
  - `moveFieldInTree`: Combined remove and add operations

### 4. Deep Cloning Overhead
**Problem**: `deepClone` function had redundant code and used expensive operations.
**Solution**:
- Fixed redundant `structuredClone` calls
- Added proper fallback for older browsers
- Optimized cloning for specific use cases

### 5. History Storage Inefficiency
**Problem**: Storing entire schema as JSON strings was memory-intensive.
**Solution**:
- Added duplicate detection to skip unchanged schemas
- Implemented keyed debouncing for better performance
- Added `skipDebounce` option for immediate history updates

## New Features

### Performance Monitoring
- Added `PerformanceMonitor` class to track operation times
- Provides metrics on optimization impact
- Development-only performance logging

### Optimization Controls
- `enableOptimizations` flag to toggle optimizations
- `setEnableOptimizations` method to control behavior
- Graceful fallback to original implementation

### Enhanced Debouncing
- Keyed debounce system to prevent timer conflicts
- `clearAllDebounceTimers` utility for cleanup
- Better memory management

## Usage

### Enabling Optimizations
```typescript
const { setEnableOptimizations } = useSchemaStore();
setEnableOptimizations(true); // Enable optimizations (default)
```

### Performance Monitoring
```typescript
import { performanceMonitor, logPerformanceMetrics } from './performance';

// Enable monitoring in development
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.enable();
}

// Log performance report
logPerformanceMetrics();
```

### Using Optimized Utilities
```typescript
import { 
  addFieldToTree, 
  removeFieldFromTree, 
  findFieldInTree,
  moveFieldInTree 
} from './utils';

// These functions are automatically used when optimizations are enabled
```

## Performance Improvements

### Expected Improvements
- **Field Updates**: 60-80% faster for property-only changes
- **Tree Operations**: 40-60% faster for add/remove/move operations
- **Memory Usage**: 30-50% reduction in memory allocations
- **History Management**: 70% reduction in duplicate history entries

### Benchmarking
Use the performance monitor to measure actual improvements:

```typescript
const impact = performanceMonitor.getOptimizationImpact('updateField');
console.log(`Performance improvement: ${impact.improvement.toFixed(1)}%`);
```

## Migration Guide

### Existing Code
No breaking changes - all existing APIs remain the same.

### New APIs
- `addHistory(schema, skipDebounce?)` - Added optional skipDebounce parameter
- `enableOptimizations` - New state property
- `setEnableOptimizations(enabled)` - New method

### Best Practices
1. Keep optimizations enabled for production
2. Use performance monitoring in development
3. Monitor memory usage with large forms
4. Consider disabling optimizations for debugging if needed

## Technical Details

### Map Management
- Maps are now properly cleared before rebuilding
- Incremental updates for non-structural changes
- Reference integrity maintained across operations

### Tree Operations
- Early exit strategies for better performance
- Minimal object creation during traversals
- Efficient array operations (filter, map, splice)

### Memory Management
- Reduced object allocations
- Better garbage collection patterns
- Optimized debounce timer management

## Testing

All optimizations include fallback to original implementations, ensuring:
- Backward compatibility
- Reliable behavior
- Easy debugging when needed

The optimization flag can be toggled to compare performance and verify correctness.
