import { AxiosRequestConfig } from 'axios';
export default interface Persist {
  action?: string;
  body: any;
  loading?: boolean;
  config?: AxiosRequestConfig;
}
