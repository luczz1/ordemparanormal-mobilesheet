import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AttackModel,
  CharacterModel,
  InventoryInfosModel,
  InventoryModel,
} from 'src/app/models/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getCharacters(): Observable<any> {
    return this.http.get(`${this.Basepath()}characters`, {
      headers: this.Headers(),
    });
  }

  public getCharacterByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/${id}`, {
      headers: this.Headers(),
    });
  }

  public editCharacter(id: number, data: CharacterModel): Observable<any> {
    return this.http.put(`${this.Basepath()}characters/edit/${id}`, data, {
      headers: this.Headers(),
    });
  }

  public deleteCharacterByID(id: number): Observable<any> {
    return this.http.delete(`${this.Basepath()}characters/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAttributesByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/attributes/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterSkillsByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/skills/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAbilitiesListByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/abilities/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterPowersListByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/powers/${id}`, {
      headers: this.Headers(),
    });
  }

  public createNewCharacter(data: CharacterModel): Observable<any> {
    return this.http.post(`${this.Basepath()}characters/create`, data, {
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
      `${this.Basepath()}characters/abilities/${characterId}`,
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
      `${this.Basepath()}characters/powers/${characterId}`,
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
      `${this.Basepath()}characters/powers/${characterId}/${itemid}`,
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
      `${this.Basepath()}characters/abilities/${characterId}/${itemid}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public updateSkillValue(
    characterId: number,
    skillId: number,
    newValue: number
  ): Observable<any> {
    return this.http.put(
      `${this.Basepath()}characters/skills/${characterId}/${skillId}/${newValue}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public updateAttributeValue(
    characterId: number,
    attribute: string,
    value: number
  ): Observable<any> {
    return this.http.put(
      `${this.Basepath()}characters/attributes/${characterId}/${attribute}/${value}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public getInventoryInfos(characterId: number): Observable<any> {
    return this.http.get(
      `${this.Basepath()}characters/inventory_infos/${characterId}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public editInventoryInfos(
    characterId: number,
    data: InventoryInfosModel
  ): Observable<any> {
    return this.http.put(
      `${this.Basepath()}characters/inventory_infos/${characterId}`,
      data,
      {
        headers: this.Headers(),
      }
    );
  }

  public getInventoryItems(characterId: number): Observable<any> {
    return this.http.get(
      `${this.Basepath()}characters/inventory_items/${characterId}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public getInventoryWeight(characterId: number): Observable<any> {
    return this.http.get(
      `${this.Basepath()}characters/inventory_items/total_weight/${characterId}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public addInventoryItems(
    characterId: number,
    data: InventoryModel
  ): Observable<any> {
    return this.http.post(
      `${this.Basepath()}characters/inventory_items/${characterId}`,
      data,
      {
        headers: this.Headers(),
      }
    );
  }

  public deleteInventoryItems(itemId: number): Observable<any> {
    return this.http.delete(
      `${this.Basepath()}characters/inventory_items/${itemId}`,
      {
        headers: this.Headers(),
      }
    );
  }

  public getCharacterTotalDefense(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/defense/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterDefenses(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/defenses/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAttacks(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/attacks/${id}`, {
      headers: this.Headers(),
    });
  }

  public addCharacterAttacks(id: number, data: AttackModel): Observable<any> {
    return this.http.post(`${this.Basepath()}characters/attacks/${id}`, data, {
      headers: this.Headers(),
    });
  }

  public deleteCharacterAttacks(id: number): Observable<any> {
    return this.http.delete(`${this.Basepath()}characters/attacks/${id}`, {
      headers: this.Headers(),
    });
  }
}
