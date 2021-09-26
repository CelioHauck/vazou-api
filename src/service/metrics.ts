import httpClient from '../infrastructure/http-client';

const httpClientMetric = httpClient('/metrics.json');

import { utcToZonedTime } from 'date-fns-tz';
import { IMeter } from '../model/metric';

export const getAllMetrics = async (): Promise<IMeter[]> => {
  const result = await httpClientMetric.get<any>({ action: '' });
  if (result && result.data) {
    const { data } = result;
    const parseData = Object.keys(data).map<IMeter>((key) => {
      return { id: key, ...data[key] };
    });
    return parseData;
  } else {
    return [];
  }
};

export const saveMetric = async (value: string) => {
  const date = new Date();
  const sendDate = utcToZonedTime(date, 'America/Sao_Paulo');
  const result = await httpClientMetric.post({
    body: { value, sendDate },
    action: '',
  });

  return result.data;
};
