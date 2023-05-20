import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService extends BaseService {

  constructor(private http: HttpClient) {
    super()
   };

   public getCharacterByID(id: number): Observable<any> {
    return this.http.get(
      `${this.Basepath()}characters/${id}`,
      {headers: this.Headers()}
    )
   }
}
