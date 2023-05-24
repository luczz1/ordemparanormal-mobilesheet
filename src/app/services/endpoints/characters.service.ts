import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterModel } from 'src/app/models/character';

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

  public updateCharacter(character: CharacterModel): Observable<any> {
    const characterID = character.id;
    return this.http.put(
      `${this.Basepath()}characters/${characterID}`,
      character,
      {
        headers: this.Headers(),
      }
    );
  }

  public updateCharacterAbilitiesList(
    characterId: number,
    skillsList: { name: string; description: string }
  ): Observable<any> {
    return this.http.post(
      `${this.Basepath()}abilities/${characterId}`,
      skillsList,
      {
        headers: this.Headers(),
      }
    );
  }

  public updateCharacterPowersList(
    characterId: number,
    powersList: { name: string; description: string }
  ): Observable<any> {
    return this.http.post(
      `${this.Basepath()}powers/${characterId}`,
      powersList,
      {
        headers: this.Headers(),
      }
    );
  }

  public deleteCharacterPower(
    characterId: number,
    itemid: number
  ): Observable<any> {
    return this.http.delete(
      `${this.Basepath()}powers/${characterId}/${itemid}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public deleteCharacterSkill(
    characterId: number,
    itemid: number
  ): Observable<any> {
    return this.http.delete(
      `${this.Basepath()}abilities/${characterId}/${itemid}`,
      {
        headers: this.Headers(),
      }
    );
  }
}
