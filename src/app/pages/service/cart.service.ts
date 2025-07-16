import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.service';

export interface Cart {
    id?: number;
    client?: number;
    product?: number;
    productNav?: Product;
    quantity?: number;
}

@Injectable({
    providedIn: 'root' // Importante para que funcione globalmente
})

export class CartService {

    private apiUrl = 'http://localhost:5113/api/';

    constructor(private http: HttpClient) { }

    saveOrUpdateCart(cart: Cart): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<any>(this.apiUrl + 'cart/save', cart, { headers });
    }

    getCartsByClient(clientId: number): Observable<any[]> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(this.apiUrl + 'cart/list/' + clientId, { headers });
    }
}
