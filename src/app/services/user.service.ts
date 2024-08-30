import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) : Observable<any> {
    return this.http.post('http://stylisimo.ddns.net:8082/api/user/register', user);
   }
   verifyAccount(email: string, otpCode: number): Observable<any> {
    return this.http.post(`http://stylisimo.ddns.net:8082/api/user/verifyAccount`, { email, otpCode });
  }
  login(user:User): Observable<any> {
    return this.http.post('http://stylisimo.ddns.net:8082/api/user/login', user);
  }
  resetPasswordRequest(user:User): Observable<any> {
    return this.http.post('http://stylisimo.ddns.net:8082/api/user/resetPasswordRequest', user);
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`http://stylisimo.ddns.net:8082/api/user/resetPassword/${token}`, { newPassword });
  }

  getUserCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`http://stylisimo.ddns.net:8082/api/user/countUsers`);
  }

  checkEmail(data: { email: string }): Observable<{ emailExists: boolean }> {
    return this.http.post<{ emailExists: boolean }>(`http://stylisimo.ddns.net:8082/api/user/checkEmail`,data);
  }
}
