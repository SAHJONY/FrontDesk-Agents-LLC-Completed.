/**
 * Load Testing Script
 * Simulates high traffic and concurrent users
 */

interface LoadTestConfig {
  baseUrl: string;
  duration: number; // seconds
  concurrentUsers: number;
  requestsPerSecond: number;
}

interface LoadTestResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
  errors: Array<{ message: string; count: number }>;
}

class LoadTester {
  private config: LoadTestConfig;
  private results: {
    requests: number;
    successes: number;
    failures: number;
    responseTimes: number[];
    errors: Map<string, number>;
  };

  constructor(config: LoadTestConfig) {
    this.config = config;
    this.results = {
      requests: 0,
      successes: 0,
      failures: 0,
      responseTimes: [],
      errors: new Map(),
    };
  }

  /**
   * Run load test
   */
  async run(): Promise<LoadTestResult> {
    console.log('Starting load test...');
    console.log(`Duration: ${this.config.duration}s`);
    console.log(`Concurrent Users: ${this.config.concurrentUsers}`);
    console.log(`Target RPS: ${this.config.requestsPerSecond}`);

    const startTime = Date.now();
    const endTime = startTime + this.config.duration * 1000;

    // Create user sessions
    const users = Array(this.config.concurrentUsers)
      .fill(null)
      .map((_, i) => this.simulateUser(i, endTime));

    await Promise.all(users);

    const duration = (Date.now() - startTime) / 1000;

    return this.generateReport(duration);
  }

  /**
   * Simulate a user session
   */
  private async simulateUser(userId: number, endTime: number): Promise<void> {
    const delay = Math.floor(Math.random() * 1000); // Random start delay
    await this.sleep(delay);

    while (Date.now() < endTime) {
      await this.makeRequest();
      
      // Random delay between requests
      const waitTime = Math.floor(Math.random() * 2000) + 500;
      await this.sleep(waitTime);
    }
  }

  /**
   * Make a test request
   */
  private async makeRequest(): Promise<void> {
    const endpoints = [
      '/api/monitoring?action=status',
      '/api/marketplace?action=featured',
      '/api/integrations?action=providers',
      '/api/autonomous/status?customerId=test',
    ];

    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const responseTime = Date.now() - startTime;
      this.results.responseTimes.push(responseTime);
      this.results.requests++;

      if (response.ok) {
        this.results.successes++;
      } else {
        this.results.failures++;
        this.recordError(`HTTP ${response.status}`);
      }
    } catch (error: any) {
      this.results.failures++;
      this.results.requests++;
      this.recordError(error.message);
    }
  }

  /**
   * Record error
   */
  private recordError(message: string): void {
    const count = this.results.errors.get(message) || 0;
    this.results.errors.set(message, count + 1);
  }

  /**
   * Generate test report
   */
  private generateReport(duration: number): LoadTestResult {
    const avgResponseTime =
      this.results.responseTimes.reduce((sum, t) => sum + t, 0) /
      this.results.responseTimes.length;

    const minResponseTime = Math.min(...this.results.responseTimes);
    const maxResponseTime = Math.max(...this.results.responseTimes);

    const errors = Array.from(this.results.errors.entries()).map(([message, count]) => ({
      message,
      count,
    }));

    return {
      totalRequests: this.results.requests,
      successfulRequests: this.results.successes,
      failedRequests: this.results.failures,
      averageResponseTime: avgResponseTime,
      minResponseTime,
      maxResponseTime,
      requestsPerSecond: this.results.requests / duration,
      errors,
    };
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Run load tests
 */
async function runLoadTests() {
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';

  // Test 1: Light load
  console.log('\n=== Test 1: Light Load ===');
  const lightTest = new LoadTester({
    baseUrl,
    duration: 30,
    concurrentUsers: 10,
    requestsPerSecond: 50,
  });
  const lightResults = await lightTest.run();
  printResults(lightResults);

  // Test 2: Medium load
  console.log('\n=== Test 2: Medium Load ===');
  const mediumTest = new LoadTester({
    baseUrl,
    duration: 60,
    concurrentUsers: 50,
    requestsPerSecond: 200,
  });
  const mediumResults = await mediumTest.run();
  printResults(mediumResults);

  // Test 3: Heavy load
  console.log('\n=== Test 3: Heavy Load ===');
  const heavyTest = new LoadTester({
    baseUrl,
    duration: 60,
    concurrentUsers: 100,
    requestsPerSecond: 500,
  });
  const heavyResults = await heavyTest.run();
  printResults(heavyResults);

  // Test 4: Stress test
  console.log('\n=== Test 4: Stress Test ===');
  const stressTest = new LoadTester({
    baseUrl,
    duration: 120,
    concurrentUsers: 500,
    requestsPerSecond: 1000,
  });
  const stressResults = await stressTest.run();
  printResults(stressResults);
}

/**
 * Print test results
 */
function printResults(results: LoadTestResult) {
  console.log('\nResults:');
  console.log(`Total Requests: ${results.totalRequests}`);
  console.log(`Successful: ${results.successfulRequests} (${((results.successfulRequests / results.totalRequests) * 100).toFixed(2)}%)`);
  console.log(`Failed: ${results.failedRequests} (${((results.failedRequests / results.totalRequests) * 100).toFixed(2)}%)`);
  console.log(`Average Response Time: ${results.averageResponseTime.toFixed(2)}ms`);
  console.log(`Min Response Time: ${results.minResponseTime}ms`);
  console.log(`Max Response Time: ${results.maxResponseTime}ms`);
  console.log(`Actual RPS: ${results.requestsPerSecond.toFixed(2)}`);

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(error => {
      console.log(`  ${error.message}: ${error.count}`);
    });
  }

  // Performance assessment
  const successRate = (results.successfulRequests / results.totalRequests) * 100;
  const avgResponseTime = results.averageResponseTime;

  console.log('\nAssessment:');
  if (successRate >= 99.9 && avgResponseTime < 200) {
    console.log('✅ EXCELLENT - System performing optimally');
  } else if (successRate >= 99 && avgResponseTime < 500) {
    console.log('✅ GOOD - System performing well');
  } else if (successRate >= 95 && avgResponseTime < 1000) {
    console.log('⚠️  ACCEPTABLE - Some performance degradation');
  } else {
    console.log('❌ POOR - System under stress, optimization needed');
  }
}

// Run tests if executed directly
if (require.main === module) {
  runLoadTests().catch(console.error);
}

export { LoadTester, runLoadTests };
