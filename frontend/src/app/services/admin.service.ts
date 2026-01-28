import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SystemStats {
    totalUsers: number;
    totalTrainers: number;
    totalActivePlans: number;
    goalDistribution: { goal: string; count: number }[];
}

@Injectable({ providedIn: 'root' })
export class AdminService {
    private baseUrl = `${environment.apiUrl}/admin`;

    constructor(private http: HttpClient) { }

    getStats(): Observable<{ stats: SystemStats }> {
        return this.http.get<{ stats: SystemStats }>(`${this.baseUrl}/stats`);
    }

    getUsers(): Observable<{ users: any[] }> {
        return this.http.get<{ users: any[] }>(`${this.baseUrl}/users`);
    }

    updateUserRole(id: number, role: string): Observable<any> {
        return this.http.put(`${this.baseUrl}/users/${id}/role`, { role });
    }
}
