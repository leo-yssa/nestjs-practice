import { Injectable, OnModuleInit } from '@nestjs/common';
import { Counter, Histogram, register } from 'prom-client';

@Injectable()
export class MetricService implements OnModuleInit {
  private requestSuccessHistogram: Histogram<string>;
  private requestFailHistogram: Histogram<string>;
  private failureCounter: Counter<string>;

  onModuleInit() {
    this.initializeMetrics();
  }

  private initializeMetrics() {
    if (!register.getSingleMetric('nestjs_success_requests')) {
      this.requestSuccessHistogram = new Histogram({
        name: 'nestjs_success_requests',
        help: 'NestJs success requests - duration in seconds',
        labelNames: ['handler', 'controller', 'method'],
        buckets: [0.0001, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.09, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      });
    } else {
      this.requestSuccessHistogram = register.getSingleMetric('nestjs_success_requests') as Histogram<string>;
    }

    if (!register.getSingleMetric('nestjs_fail_requests')) {
      this.requestFailHistogram = new Histogram({
        name: 'nestjs_fail_requests',
        help: 'NestJs fail requests - duration in seconds',
        labelNames: ['handler', 'controller', 'method'],
        buckets: [0.0001, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.09, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      });
    } else {
      this.requestFailHistogram = register.getSingleMetric('nestjs_fail_requests') as Histogram<string>;
    }

    if (!register.getSingleMetric('nestjs_requests_failed_count')) {
      this.failureCounter = new Counter({
        name: 'nestjs_requests_failed_count',
        help: 'NestJs requests that failed',
        labelNames: ['handler', 'controller', 'error', 'method'],
      });
    } else {
      this.failureCounter = register.getSingleMetric('nestjs_requests_failed_count') as Counter<string>;
    }
  }

  startSuccessTimer(labels: Record<string, string>): () => void {
    return this.requestSuccessHistogram.startTimer(labels);
  }

  startFailTimer(labels: Record<string, string>): () => void {
    return this.requestFailHistogram.startTimer(labels);
  }

  incrementFailureCounter(labels: Record<string, string>) {
    this.failureCounter.labels(labels).inc(1);
  }

  async getMetrics(): Promise<string> {
    return await register.metrics();
  }
}
