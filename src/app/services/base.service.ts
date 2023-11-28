import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  public Basepath() {
    return 'http://localhost:3000/'
  }

  public Headers() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }
}
