import Select from './interfaces/select';
import Persist from './interfaces/persist';
import Delete from './interfaces/delete';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpClient {
  private axios: AxiosInstance;
  constructor(
    private resource: string,
    private baseUrl?: string,
    private axiosInstace?: AxiosInstance
  ) {
    this.resource = resource;
    this.axios = this.axiosInstace as AxiosInstance;
  }

  async get<T>({
    action = '',
    params = null,
    loading = true,
    config = this.defaultConfig,
  }: Select) {
    return await this.axios.request<T>({
      method: 'GET',
      url: `${this.resource}/${action}${this.createQueryString(params)}`,
      baseURL: this.baseUrl,
      headers: config.headers,
    });
  }

  async post({
    action = '',
    body,
    loading = false,
    config = this.defaultConfig,
  }: Persist) {
    return await this.axios({
      method: 'POST',
      url: `${this.resource}/${action}`,
      baseURL: this.baseUrl,
      headers: config.headers,
      data: body,
    });
  }

  async put({
    action = '',
    body,
    loading = false,
    config = this.defaultConfig,
  }: Persist) {
    return await this.axios({
      method: 'PUT',
      url: action ? `${this.resource}/${action}` : this.resource,
      baseURL: this.baseUrl,
      headers: config.headers,
      data: body,
    });
  }

  async patch({
    action = '',
    body,
    loading = true,
    config = this.defaultConfig,
  }: Persist) {
    return await this.axios({
      method: 'PATCH',
      url: `${this.resource}/${action}`,
      baseURL: this.baseUrl,
      headers: config.headers,
      data: body,
    });
  }

  async delete({
    action = '',
    loading = false,
    config = this.defaultConfig,
  }: Delete) {
    return await this.axios({
      method: 'DELETE',
      url: `${this.resource}/${action}`,
      baseURL: this.baseUrl,
      headers: config.headers,
    });
  }

  createQueryString(params: any) {
    if (params || (Array.isArray(params) && params.length > 0)) {
      return (
        '?' +
        Object.keys(params)
          .map((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
              let query: string[] = [];
              value.forEach((element) => {
                query.push(
                  `${encodeURIComponent(key)}=${encodeURIComponent(element)}`
                );
              });
              return query.join('&');
            } else {
              return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
              );
            }
          })
          .join('&')
      );
    } else {
      return '';
    }
  }
  get defaultConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
