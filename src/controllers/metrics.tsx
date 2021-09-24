import httpClient from '../infrastructure/http-client';

const httpClientMetric = httpClient('/metrics.json');

export async function getMetrics(context) {
  const result = await httpClientMetric.get<any>({ action: '' });
  context.body = result;
  return context;
}

export async function requestMetrics(context) {
  const content = context.request.body;
  const result = await httpClientMetric.post({ body: content, action: '' });
  context.body = result.data;
  return context;
}
