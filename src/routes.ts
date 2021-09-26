import { requestHealthCheck } from './controllers/health-check';
import { getMetrics, requestMetrics } from './controllers/metrics';
import { requestTokens } from './controllers/token';

export const AppRoutes: Route[] = [
  {
    path: '/health',
    method: 'get',
    action: requestHealthCheck,
  },
  {
    path: '/metrics',
    method: 'get',
    action: getMetrics,
  },
  {
    path: '/metrics',
    method: 'post',
    action: requestMetrics,
  },
  {
    path: '/token',
    method: 'post',
    action: requestTokens,
  },
];

interface Route {
  path: string;
  method: string;
  action: any;
}
