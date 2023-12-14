import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface loginResponse {
  authToken: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlLogin: string = 'http://localhost:8080/user/login'

  private urlRegister: string = 'http://localhost:8080/user'
  
  constructor(private http: HttpClient) { }

  login(data: {email: string, password: string}): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.urlLogin, data)
  }

  register(data: {name: string, email: string, password: string}): Observable<void> {
    return this.http.post<void>(this.urlRegister, data)
  }
}
