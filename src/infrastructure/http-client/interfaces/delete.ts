import { AxiosRequestConfig } from 'axios';
export default interface Delete {
  action: string;
  loading: boolean;
  config: AxiosRequestConfig;
}
