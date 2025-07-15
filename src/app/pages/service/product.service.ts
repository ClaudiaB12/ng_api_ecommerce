import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
}

@Injectable({
    providedIn: 'root' // Importante para que funcione globalmente
})

export class ProductService {

    private apiUrl = 'http://localhost:5113/api/';

    constructor(private http: HttpClient) { }

    //Products
    getAllProducts(): Observable<Product[]> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Product[]>(this.apiUrl + 'product/list', { headers });
    }
}
