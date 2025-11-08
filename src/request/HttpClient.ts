import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosHeaders } from 'axios'


class HttpClient {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create()
    }

    public get(url: string, headers: AxiosHeaders, params: any): Promise<any> {
        // 设置请求头
        const config: AxiosRequestConfig = {
            headers: headers,
            params: params
        }
        return this.instance.get(url, config)
    }
}

const httpClient = new HttpClient()
export default httpClient