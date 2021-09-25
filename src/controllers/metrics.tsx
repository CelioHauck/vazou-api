import httpClient from '../infrastructure/http-client';

const httpClientMetric = httpClient('/metrics.json');

import { utcToZonedTime } from 'date-fns-tz';

export async function getMetrics(context) {
  const result = await httpClientMetric.get<any>({ action: '' });
  if (result && result.data) {
    const { data } = result;
    const parseData = Object.keys(data).map((key) => {
      return { id: key, ...data[key] };
    });
    context.body = parseData;
  } else {
    context.body = [];
  }

  return context;
}

export async function requestMetrics(context) {
  const { value } = context.request.body;
  if (!value) {
    throw new Error('O campo value é obrigatorio!');
  }

  const date = new Date();
  const sendDate = utcToZonedTime(date, 'America/Sao_Paulo');
  const result = await httpClientMetric.post({
    body: { value, sendDate },
    action: '',
  });
  context.body = result.data;
  return context;
}
