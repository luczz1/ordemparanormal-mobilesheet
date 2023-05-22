import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getCharacterByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAttributesByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}attributes/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterSkillsByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}skills/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAbilitiesListByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}abilities/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterPowersListByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}powers/${id}`, {
      headers: this.Headers(),
    });
  }
}
