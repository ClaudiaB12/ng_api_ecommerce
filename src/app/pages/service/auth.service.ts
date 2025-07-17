import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:5113/api/';

    constructor(private http: HttpClient) { }

    //Login
    isValidUser(email: string, password: string): Observable<any> {
        const body: LoginRequest = { email, password };
        return this.http.post<any>(this.apiUrl + 'auth/login', body);

    }

    //Registry
    register(data: RegisterRequest): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'user/register', data);
    }

    //Profile
    getProfile(clientId: number): Observable<any> {
        return this.http.get<any[]>(this.apiUrl + 'user/profile/' + clientId);
    }

    //Logout
    logout(): void {
        localStorage.removeItem('auth_token');
        window.location.href = '/landing/login';
    }
}
