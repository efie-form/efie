// Performance monitoring utilities for schema state operations

interface PerformanceMetrics {
  operationName: string;
  duration: number;
  timestamp: number;
  fieldCount: number;
  optimizationsEnabled: boolean;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 100; // Keep last 100 operations
  private enabled = false;

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  startOperation(operationName: string): () => void {
    if (!this.enabled) {
      return () => {}; // No-op if disabled
    }

    const startTime = performance.now();

    return (fieldCount: number = 0, optimizationsEnabled: boolean = false) => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.addMetric({
        operationName,
        duration,
        timestamp: Date.now(),
        fieldCount,
        optimizationsEnabled,
      });
    };
  }

  private addMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);

    // Keep only the last maxMetrics entries
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageTime(operationName: string): number {
    const operationMetrics = this.metrics.filter(m => m.operationName === operationName);
    if (operationMetrics.length === 0) return 0;

    const totalTime = operationMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalTime / operationMetrics.length;
  }

  getOptimizationImpact(operationName: string): {
    optimizedAvg: number;
    unoptimizedAvg: number;
    improvement: number;
  } {
    const optimizedMetrics = this.metrics.filter(
      m => m.operationName === operationName && m.optimizationsEnabled,
    );
    const unoptimizedMetrics = this.metrics.filter(
      m => m.operationName === operationName && !m.optimizationsEnabled,
    );

    const optimizedAvg = optimizedMetrics.length > 0
      ? optimizedMetrics.reduce((sum, m) => sum + m.duration, 0) / optimizedMetrics.length
      : 0;

    const unoptimizedAvg = unoptimizedMetrics.length > 0
      ? unoptimizedMetrics.reduce((sum, m) => sum + m.duration, 0) / unoptimizedMetrics.length
      : 0;

    const improvement = unoptimizedAvg > 0
      ? ((unoptimizedAvg - optimizedAvg) / unoptimizedAvg) * 100
      : 0;

    return {
      optimizedAvg,
      unoptimizedAvg,
      improvement,
    };
  }

  clear() {
    this.metrics = [];
  }

  generateReport(): string {
    const operations = [...new Set(this.metrics.map(m => m.operationName))];

    let report = 'Schema State Performance Report\n';
    report += '================================\n\n';

    for (const operation of operations) {
      const impact = this.getOptimizationImpact(operation);
      const avgTime = this.getAverageTime(operation);

      report += `Operation: ${operation}\n`;
      report += `  Average Time: ${avgTime.toFixed(2)}ms\n`;

      if (impact.optimizedAvg > 0 && impact.unoptimizedAvg > 0) {
        report += `  Optimized Average: ${impact.optimizedAvg.toFixed(2)}ms\n`;
        report += `  Unoptimized Average: ${impact.unoptimizedAvg.toFixed(2)}ms\n`;
        report += `  Performance Improvement: ${impact.improvement.toFixed(1)}%\n`;
      }

      report += '\n';
    }

    return report;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Helper function to wrap operations with performance monitoring
export function withPerformanceMonitoring<T extends any[], R>(
  operationName: string,
  fn: (...args: T) => R,
  getFieldCount?: (...args: T) => number,
): (...args: T) => R {
  return (...args: T): R => {
    const endTimer = performanceMonitor.startOperation(operationName);

    try {
      const result = fn(...args);
      const fieldCount = getFieldCount ? getFieldCount(...args) : 0;
      endTimer(fieldCount, true); // Assume optimizations are enabled when using this wrapper
      return result;
    }
    catch (error) {
      endTimer(0, true);
      throw error;
    }
  };
}

// Development-only performance logging
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV === 'development') {
    console.log(performanceMonitor.generateReport());
  }
}
