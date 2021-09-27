import { getAllMetrics, getLastMetric, saveMetric } from '../service/metrics';

export async function getMetrics(context) {
  const result = await getAllMetrics();
  context.body = result;
  return context;
}

export async function getMetric(context) {
  const result = await getLastMetric();
  context.body = result;
  return context;
}

export async function requestMetrics(context) {
  const { value } = context.request.body;
  if (!value) {
    throw new Error('O campo value é obrigatorio!');
  }
  const result = await saveMetric(value);
  context.body = result;
  return context;
}
