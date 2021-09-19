import HttpClient from './http-client';
import instance from './instance';

export default (resource: string, baseUrl?: string) =>
  new HttpClient(resource, baseUrl, instance);
