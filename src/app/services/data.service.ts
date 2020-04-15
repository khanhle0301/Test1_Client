import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
    private BASE_API = 'https://localhost:44301';
    private headers = new HttpHeaders();

    constructor(
        private http: HttpClient) {
        this.headers = this.headers.set('Content-Type', 'application/json');
    }

    get(uri: string) {
        return this.http.get(this.BASE_API + uri, { headers: this.headers });
    }

    post(uri: string, data?: any) {
        return this.http.post(this.BASE_API + uri, data, { headers: this.headers });
    }

    put(uri: string, data?: any) {
        return this.http.put(this.BASE_API + uri, data, { headers: this.headers });
    }

    delete(uri: string, id: string) {
        return this.http.delete(this.BASE_API + uri + '/' + id, { headers: this.headers });
    }
}