import { AxiosRequestConfig } from 'axios';

export default interface Select {
  action: string;
  params?: any;
  loading?: boolean;
  config?: AxiosRequestConfig;
}
