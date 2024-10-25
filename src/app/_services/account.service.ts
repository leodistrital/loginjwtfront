import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
      console.log({environment});
        return this.http.post<User>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(user => {

                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {

        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
      const resp  = this.http.post(`${environment.apiUrl}/api/usuarios`, user);
      console.log({resp});
      return resp
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/usuarios`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/api/usuarios/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/api/usuarios/${id}`, params)
            .pipe(map(x => {

                if (id == this.userValue?.id) {

                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));


                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/usuarios/${id}`)
            .pipe(map(x => {

                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
