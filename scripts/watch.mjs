#!/usr/bin/env node

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for better console output
const colors = {
  reset: '\u001B[0m',
  bright: '\u001B[1m',
  dim: '\u001B[2m',
  red: '\u001B[31m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  magenta: '\u001B[35m',
  cyan: '\u001B[36m',
  white: '\u001B[37m',
};

// Define the packages and their dependencies
const packages = {
  '@efie-form/core': {
    path: 'packages/core',
    dependencies: [],
    watch: true,
    color: colors.blue,
  },
  '@efie-form/builder': {
    path: 'packages/builder',
    dependencies: ['@efie-form/core'],
    watch: true,
    postBuild: ['tw'], // Run tailwind after initial build
    color: colors.green,
  },
  '@efie-form/react': {
    path: 'packages/react',
    dependencies: ['@efie-form/core'],
    watch: true,
    color: colors.magenta,
  },
  '@efie-form/vue': {
    path: 'packages/vue',
    dependencies: ['@efie-form/core'],
    watch: true, // Now enabled by default
    color: colors.cyan,
  },
  '@efie-form/iframe': {
    path: 'packages/iframe',
    dependencies: ['@efie-form/core', '@efie-form/builder'],
    watch: false, // Vite-based, use separate dev script
    command: 'dev', // Use vite dev instead of tsup watch
    color: colors.yellow,
  },
};

class WatchManager {
  constructor(options = {}) {
    this.includeVue = options.includeVue || false;
    this.libOnly = options.libOnly || false;
    this.verbose = options.verbose || false;
    this.processes = new Map();
    this.fileWatchers = new Map(); // Track additional file watchers
    this.lastBuildTimes = new Map(); // Track last build times to debounce
    this.isShuttingDown = false;
    this.startTime = Date.now();

    // Handle graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  log(message, color = colors.white) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`);
  }

  logPackage(packageName, message, isError = false) {
    const config = packages[packageName];
    const color = isError ? colors.red : (config?.color || colors.white);
    const prefix = isError ? '❌' : '📦';
    this.log(`${prefix} ${color}[${packageName}]${colors.reset} ${message}`);
  }

  async start() {
    this.log('🚀 Starting tsup watch for Efie Form packages...', colors.bright);

    if (this.includeVue) {
      this.log('🎯 Including Vue package in watch', colors.yellow);
    }

    if (this.libOnly) {
      this.log('📚 Watching only packages with lib folders', colors.yellow);
    }

    console.log(); // Empty line for better readability

    // Determine which packages to watch
    const packagesToWatch = Object.entries(packages).filter(([name, config]) => {
      if (name === '@efie-form/vue' && !this.includeVue) {
        return false;
      }
      if (this.libOnly) {
        // Only watch packages that have lib folders (exclude iframe)
        return config.watch && name !== '@efie-form/iframe';
      }
      return config.watch;
    });

    if (packagesToWatch.length === 0) {
      this.log('⚠️  No packages to watch', colors.yellow);
      return;
    }

    this.log(`📋 Planning to watch ${packagesToWatch.length} packages`, colors.cyan);

    // Sort packages by dependency order (dependencies first)
    const sortedPackages = this.sortByDependencies(packagesToWatch);

    this.log('📊 Dependency order:', colors.cyan);
    for (const [index, [name]] of sortedPackages.entries()) {
      this.log(`   ${index + 1}. ${name}`, colors.dim);
    }

    console.log(); // Empty line

    // Start watching packages in dependency order
    for (const [name, config] of sortedPackages) {
      await this.startPackageWatch(name, config);
      // Small delay to ensure clean startup
      await this.delay(500);
    }

    const duration = Date.now() - this.startTime;
    this.log(`✅ All packages are now being watched! (took ${duration}ms)`, colors.green);
    this.log('💡 Press Ctrl+C to stop watching...', colors.yellow);

    console.log(); // Empty line

    // Keep the process alive
    await this.waitForShutdown();
  }

  sortByDependencies(packagesToWatch) {
    const sorted = [];
    const processed = new Set();

    const processDependencies = (packageName) => {
      if (processed.has(packageName)) return;

      const config = packages[packageName];
      if (!config) return;

      // Process dependencies first
      for (const dep of config.dependencies) {
        if (packages[dep] && !processed.has(dep)) {
          processDependencies(dep);
        }
      }

      // Find the original entry from packagesToWatch
      const packageEntry = packagesToWatch.find(([name]) => name === packageName);
      if (packageEntry) {
        sorted.push(packageEntry);
        processed.add(packageName);
      }
    };

    // Process all packages
    for (const [name] of packagesToWatch) {
      processDependencies(name);
    }

    return sorted;
  }

  async startPackageWatch(name, config) {
    const packagePath = path.join(__dirname, '..', config.path);

    this.logPackage(name, 'Starting watch...');

    try {
      // Initial build for packages with dependencies
      if (config.dependencies.length > 0) {
        this.logPackage(name, `Building initially (depends on: ${config.dependencies.join(', ')})...`);
        const buildResult = await this.runCommand('pnpm', ['build'], packagePath);

        if (this.verbose && buildResult.stdout) {
          this.logPackage(name, `Build output: ${buildResult.stdout.trim()}`);
        }
      }

      // Run post-build commands if any
      if (config.postBuild) {
        for (const cmd of config.postBuild) {
          this.logPackage(name, `Running post-build command: ${cmd}`);
          const process = spawn('pnpm', ['run', cmd], {
            cwd: packagePath,
            stdio: 'pipe',
            shell: true,
          });

          // Don't wait for watch commands (like tailwind --watch)
          if (cmd === 'tw') {
            this.processes.set(`${name}-${cmd}`, process);
            this.setupProcessHandlers(`${name}-tailwind`, process);
          }
          else {
            await this.waitForProcess(process);
          }
        }
      }

      // Start the watch process
      const watchProcess = spawn('pnpm', ['run', 'dev'], {
        cwd: packagePath,
        stdio: 'pipe',
        shell: true,
      });

      this.processes.set(name, watchProcess);

      // Setup process event handlers
      this.setupProcessHandlers(name, watchProcess);

      // Setup supplementary file watching for packages that need it
      await this.setupSupplementaryFileWatcher(name, config, packagePath);

      this.logPackage(name, 'Watch started successfully ✅');
    }
    catch (error) {
      this.logPackage(name, `Failed to start watch: ${error.message}`, true);
      throw error;
    }
  }

  async setupSupplementaryFileWatcher(name, config, packagePath) {
    // Only set up supplementary watching for packages that might have issues
    if (name !== '@efie-form/react' && name !== '@efie-form/builder') {
      return;
    }

    try {
      // Dynamic import for fs since we only need it conditionally
      const fs = await import('node:fs');

      // Watch lib directory for changes
      const libPath = path.join(packagePath, 'lib');
      const srcPath = path.join(packagePath, 'src');

      const watchPaths = [];
      if (fs.existsSync(libPath)) watchPaths.push(libPath);
      if (fs.existsSync(srcPath)) watchPaths.push(srcPath);

      for (const watchPath of watchPaths) {
        const watcher = fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
          if (filename && (filename.endsWith('.ts') || filename.endsWith('.tsx'))) {
            this.handleFileChange(name, packagePath, filename);
          }
        });

        this.fileWatchers.set(`${name}-${path.basename(watchPath)}`, watcher);
        this.logPackage(name, `📁 Supplementary file watcher set up for ${path.basename(watchPath)}/`);
      }
    }
    catch {
      // Fallback if fs.watch is not available or fails
      this.logPackage(name, `⚠️  Could not set up supplementary file watcher`);
    }
  }

  handleFileChange(name, packagePath, filename) {
    const now = Date.now();
    const lastBuild = this.lastBuildTimes.get(name) || 0;

    // Debounce: only trigger rebuild if it's been more than 1 second since last build
    if (now - lastBuild < 1000) {
      return;
    }

    this.lastBuildTimes.set(name, now);
    this.logPackage(name, `🔄 File changed: ${filename}, triggering rebuild...`);

    // Trigger a rebuild by sending SIGUSR1 to the tsup process
    const process = this.processes.get(name);
    if (process && !process.killed) {
      try {
        // Send a signal to trigger rebuild (most watchers respond to SIGUSR1 or SIGUSR2)
        process.kill('SIGUSR1');
      }
      catch {
        // If signal doesn't work, restart the process
        this.logPackage(name, `🔄 Signal failed, restarting watch process...`);
        this.restartPackageWatch(name, packagePath);
      }
    }
  }

  async restartPackageWatch(name, packagePath) {
    try {
      // Kill the existing process
      const existingProcess = this.processes.get(name);
      if (existingProcess && !existingProcess.killed) {
        existingProcess.kill('SIGTERM');
      }

      // Wait a moment for cleanup
      await this.delay(500);

      // Start a new watch process
      const watchProcess = spawn('pnpm', ['run', 'dev'], {
        cwd: packagePath,
        stdio: 'pipe',
        shell: true,
      });

      this.processes.set(name, watchProcess);
      this.setupProcessHandlers(name, watchProcess);

      this.logPackage(name, 'Watch restarted successfully ✅');
    }
    catch (error) {
      this.logPackage(name, `Failed to restart watch: ${error.message}`, true);
    }
  }

  setupProcessHandlers(name, process) {
    process.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        // Filter out noisy tsup messages
        const lines = output.split('\n');
        for (const line of lines) {
          if (line && !this.shouldFilterOutput(line)) {
            this.logPackage(name, line);
          }
        }
      }
    });

    process.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output && !this.shouldFilterOutput(output)) {
        this.logPackage(name, output, true);
      }
    });

    process.on('exit', (code) => {
      if (!this.isShuttingDown && code !== 0) {
        this.logPackage(name, `Process exited with code ${code}`, true);
      }
    });
  }

  shouldFilterOutput(output) {
    const filters = [
      'watching for file changes',
      'Watching for changes',
      /^DTS Build start$/,
      // Remove 'Built at' and build success filters to see more output
      // /^DTS ⚡️ Build success/,
      // /^CLI Building entry/,
      // /^CLI ⚡️ Build success/,
    ];

    return filters.some((filter) => {
      if (typeof filter === 'string') {
        return output.includes(filter);
      }
      return filter.test(output);
    });
  }

  runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, {
        cwd,
        stdio: 'pipe',
        shell: true,
      });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('exit', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        }
        else {
          reject(new Error(`Command failed with code ${code}: ${stderr}`));
        }
      });
    });
  }

  waitForProcess(process) {
    return new Promise((resolve, reject) => {
      process.on('exit', (code) => {
        if (code === 0) {
          resolve();
        }
        else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  waitForShutdown() {
    return new Promise((resolve) => {
      const checkShutdown = () => {
        if (this.isShuttingDown) {
          resolve();
        }
        else {
          setTimeout(checkShutdown, 100);
        }
      };
      checkShutdown();
    });
  }

  async shutdown() {
    if (this.isShuttingDown) return;

    this.isShuttingDown = true;
    console.log(); // Empty line
    this.log('🛑 Shutting down watch processes...', colors.yellow);

    // Close file watchers first
    for (const [name, watcher] of this.fileWatchers.entries()) {
      try {
        this.log(`   Closing file watcher ${name}...`, colors.dim);
        watcher.close();
      }
      catch (error) {
        this.log(`   Failed to close file watcher ${name}: ${error.message}`, colors.red);
      }
    }

    // Kill all processes
    const processEntries = [...this.processes.entries()];
    for (const [name, process] of processEntries) {
      try {
        this.log(`   Stopping ${name}...`, colors.dim);
        process.kill('SIGTERM');
      }
      catch (error) {
        this.log(`   Failed to stop ${name}: ${error.message}`, colors.red);
      }
    }

    // Wait a bit for graceful shutdown
    await this.delay(1000);

    // Force kill if necessary
    for (const [, process] of processEntries) {
      try {
        if (!process.killed) {
          process.kill('SIGKILL');
        }
      }
      catch {
        // Process might already be dead
      }
    }

    const totalTime = Date.now() - this.startTime;
    this.log(`✅ All processes stopped (total runtime: ${Math.round(totalTime / 1000)}s)`, colors.green);
    process.exit(0);
  }
}

// Show help
function showHelp() {
  console.log(`
${colors.bright}Efie Form Watch Script${colors.reset}

Usage: node scripts/watch.mjs [options]

Options:
  --lib-only       Watch only packages with lib folders (excludes iframe)
  --verbose        Show verbose output including build logs
  --help           Show this help message

Examples:
  node scripts/watch.mjs              # Watch all lib packages (core, builder, react, vue)
  node scripts/watch.mjs --lib-only   # Watch only lib-based packages
  node scripts/watch.mjs --verbose    # Watch with verbose output

Available packages:
${Object.entries(packages).map(([name, config]) =>
  `  • ${config.color}${name}${colors.reset} (${config.watch ? 'enabled' : 'disabled by default'})`,
).join('\n')}
`);
}

// Parse command line arguments
const args = new Set(process.argv.slice(2));

if (args.has('--help') || args.has('-h')) {
  showHelp();
  process.exit(0);
}

const includeVue = true; // Always include Vue since it's now enabled by default
const libOnly = args.has('--lib-only');
const verbose = args.has('--verbose') || args.has('-v');

// Start the watch manager
const manager = new WatchManager({ includeVue, libOnly, verbose });
try {
  await manager.start();
}
catch (error) {
  console.error(`${colors.red}❌ Failed to start watch manager: ${error.message}${colors.reset}`);
  process.exit(1);
}
