import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public createAccount(user_data: LoginModel): Observable<any> {
    return this.http.post(`${this.Basepath()}register/`, user_data, {
      headers: this.Headers(),
    });
  }

  public login(user_data: LoginModel): Observable<any> {
    return this.http.post(`${this.Basepath()}login/`, user_data, {
      headers: this.Headers(),
    });
  }

  public whoami(): Observable<any> {
    return this.http.get(`${this.Basepath()}whoami`, {
      headers: this.Headers(),
    });
  }
}
