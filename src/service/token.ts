import httpClient from '../infrastructure/http-client';
import { IToken } from '../model/token';

const httpClientToken = httpClient('/tokens.json');

export const saveToken = async (token: string) => {
  const hasSomeToken = await hasToken(token);
  if (!hasSomeToken) {
    const response = await httpClientToken.post({
      action: '',
      body: {
        value: token,
      },
    });
    return response.data;
  }
  return;
};

export const getAllTokens = async (): Promise<IToken[]> => {
  const result = await httpClientToken.get({ action: '' });
  if (result && result.data) {
    const { data } = result;
    const tokens = Object.keys(data).map<IToken>((key) => {
      return { id: key, ...data[key] };
    });
    return tokens;
  } else {
    return [];
  }
};

const hasToken = async (token: string) => {
  const result = await httpClientToken.get({ action: '' });
  if (result && result.data) {
    const { data } = result;
    const hasSomeToken = Object.keys(data)
      .map<IToken>((key) => {
        return { id: key, ...data[key] };
      })
      .some((e) => e.value === token);
    return hasSomeToken;
  }
  return false;
};
