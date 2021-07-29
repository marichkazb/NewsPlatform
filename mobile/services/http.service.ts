import axios from "axios";

interface IHttpConfig {
    url: string;
    data?: object;
    headers?: object;
}
class HttpService {
    constructor(private httpClient = axios,
                private baseUrl = 'http://localhost:5000',
                private apiVersion = 'api'
                ) {
    }

    private prepareUrl(url :string) :string {
        return `${this.baseUrl}/${this.apiVersion}/${url}`
    }

    async get(config: IHttpConfig) :Promise <any> {
         return this.httpClient.get(this.prepareUrl(config.url), {headers: {...config.headers,
                 'Authorization': `token ${this.getToken()}`
             }} )

    }

    async put(config: IHttpConfig) :Promise <any> {
        return this.httpClient.put(this.prepareUrl(config.url), config.data, {headers: {...config.headers,  'Authorization': `token ${this.getToken()}`}} )
    }

    async post(config: IHttpConfig) :Promise <any> {
        return this.httpClient.post(this.prepareUrl(config.url), config.data,{headers: {...config.headers,  'Authorization': `token ${this.getToken()}`}} )
    }

    async delete(config: IHttpConfig) :Promise <any> {
        return this.httpClient.delete(this.prepareUrl(config.url), {headers: {...config.headers,  'Authorization': `token ${this.getToken()}`}} )
    }
    getToken() {
        return `${localStorage.getItem('token')}`;
    }
}

export default new HttpService();