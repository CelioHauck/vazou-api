import { differenceMinutes } from './../utils/date';
import httpClient from '../infrastructure/http-client';

const httpClientMetric = httpClient('/metrics.json');

import { utcToZonedTime } from 'date-fns-tz';
import { IMeter } from '../model/metric';
import { sendNotification } from './notification';

export const getAllMetrics = async (): Promise<IMeter[]> => {
  const result = await httpClientMetric.get<any>({ action: '' });
  if (result && result.data) {
    const { data } = result;
    const parseData = Object.keys(data).map<IMeter>((key) => {
      return { id: key, ...data[key] };
    });
    return parseData;
  }
  return [];
};

export const getLastMetric = async (
  differenceMinutes: number = 1
): Promise<IMeter | undefined> => {
  const result = await httpClientMetric.get<any>({ action: '' });
  if (result && result.data) {
    const { data } = result;
    const parseData = Object.keys(data).map<IMeter>((key) => {
      return { id: key, ...data[key] };
    });
    const validMeter = verifyValidMetric(parseData.pop(), differenceMinutes);
    return validMeter;
  }
  return;
};

export const saveMetric = async (value: string) => {
  const date = new Date();
  const sendDate = utcToZonedTime(date, 'America/Sao_Paulo');
  if (Number(value) >= 600) {
    const last = await getLastMetric(10);
    if (!last || last.value < 600) {
      sendNotification();
    }
  }
  const result = await httpClientMetric.post({
    body: { value, sendDate },
    action: '',
  });

  return result.data;
};

const verifyValidMetric = (
  meter?: IMeter,
  minutes: number = 1
): IMeter | undefined => {
  if (meter) {
    const difference = differenceMinutes(
      utcToZonedTime(new Date(), 'America/Sao_Paulo'),
      new Date(meter.sendDate)
    );
    console.log(
      meter,
      difference,
      utcToZonedTime(new Date(), 'America/Sao_Paulo'),
      new Date(meter.sendDate)
    );
    if (difference < minutes) return meter;
  }
  return;
};
