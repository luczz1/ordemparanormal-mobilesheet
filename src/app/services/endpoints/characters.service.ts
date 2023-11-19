import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AboutModel,
  AttackModel,
  CharacterModel,
  ClassesModel,
  InventoryInfosModel,
  InventoryModel,
  ProficiencyModel,
  TracksModel,
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

  public getAbilityByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/abilities/q/${id}`, {
      headers: this.Headers(),
    });
  }

  public getPowerByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/powers/q/${id}`, {
      headers: this.Headers(),
    });
  }

  public createNewCharacter(data: CharacterModel, attr: any): Observable<any> {
    const sendData = {...data, ...attr};

    return this.http.post(`${this.Basepath()}characters/create`, sendData, {
      headers: this.Headers(),
    });
  }
  public updateCharacter(character: CharacterModel): Observable<any> {
    const characterID = character.id;
    const url = `${this.Basepath()}characters/${characterID}`;
    return this.http.put(url, character, {
      headers: this.Headers(),
    });
  }

  public hiddenCharacterStatus(
    status: {
      hidden_life: number;
      hidden_sanity: number;
      hidden_effort: number;
    },
    characterID: number
  ): Observable<any> {
    const url = `${this.Basepath()}characters/hidden-status/${characterID}`;
    return this.http.put(url, status, {
      headers: this.Headers(),
    });
  }

  public updateCharacterAbilitiesList(
    characterId: number,
    skillsList: {
      name: string;
      description: string;
    }
  ): Observable<any> {
    const url = `${this.Basepath()}characters/abilities/${characterId}`;

    return this.http.post(url, skillsList, {
      headers: this.Headers(),
    });
  }

  public updateCharacterAbility(
    id: number,
    skillsList: {
      name: string;
      description: string;
    }
  ): Observable<any> {
    const url = `${this.Basepath()}abilities/${id}`;

    return this.http.put(url, skillsList, {
      headers: this.Headers(),
    });
  }

  public updateCharacterPowersList(
    characterId: number,
    powersList: {
      name: string;
      description: string;
      price: string;
      page: string;
      element: string;
      circle: number;
      target: string;
      duration: string;
      resistance: string;
      execution: number;
      reach: number;
    }
  ): Observable<any> {
    const url = `${this.Basepath()}characters/powers/${characterId}`;

    return this.http.post(url, powersList, {
      headers: this.Headers(),
    });
  }

  public updateCharacterRitual(
    id: number,
    powersList: {
      name: string;
      description: string;
      price: string;
      page: string;
      element: string;
      circle: number;
      target: string;
      duration: string;
      resistance: string;
      execution: number;
      reach: number;
    }
  ): Observable<any> {
    const url = `${this.Basepath()}rituals/${id}`;

    return this.http.put(url, powersList, {
      headers: this.Headers(),
    });
  }

  public updateCharacterRitualDT(
    characterId: number,
    dt: number
  ): Observable<any> {

    return this.http.put(`${this.Basepath()}characters/dt/${characterId}/${dt}`, null, {
      headers: this.Headers(),
    });
  }

  public deleteCharacterPower(
    characterId: number,
    itemid: number
  ): Observable<any> {
    const url = `${this.Basepath()}characters/powers/${characterId}/${itemid}`;
    return this.http.delete(url, {
      headers: this.Headers(),
    });
  }

  public deleteCharacterSkill(
    characterId: number,
    itemid: number
  ): Observable<any> {
    const url = `${this.Basepath()}characters/abilities/${characterId}/${itemid}`;
    return this.http.delete(url, {
      headers: this.Headers(),
    });
  }

  public updateSkillValue(
    characterId: number,
    skillId: number,
    newValue: number
  ): Observable<any> {
    const url = `${this.Basepath()}characters/skills/${characterId}/${skillId}/${newValue}`;
    return this.http.put(
      url,
      {},
      {
        headers: this.Headers(),
      }
    );
  }

  public updateTrainingSkillValue(
    characterId: number,
    skillId: number,
    newValue: number
  ): Observable<any> {
    const url = `${this.Basepath()}characters/skills/t/${characterId}/${skillId}/${newValue}`;
    return this.http.put(
      url,
      {},
      {
        headers: this.Headers(),
      }
    );
  }

  public favoriteSkill(skillId: number, newValue: number): Observable<any> {
    const url = `${this.Basepath()}characters/skills/${skillId}/${newValue}`;
    return this.http.put(
      url,
      {},
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
    const url = `${this.Basepath()}characters/attributes/${characterId}/${attribute}/${value}`;
    return this.http.put(
      url,
      {},
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

  public editCharacterTotalDefense(
    id: number,
    defense_total: number
  ): Observable<any> {
    const url = `${this.Basepath()}characters/defense/${id}/${defense_total}`;
    return this.http.put(
      url,
      {},
      {
        headers: this.Headers(),
      }
    );
  }

  public getCharacterDefenses(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/defenses/${id}`, {
      headers: this.Headers(),
    });
  }

  public addCharacterDefenses(id: number, data: string): Observable<any> {
    let obj = {
      protection: data,
    };

    return this.http.post(`${this.Basepath()}characters/defenses/${id}`, obj, {
      headers: this.Headers(),
    });
  }

  public deleteCharacterDefenses(id: number): Observable<any> {
    return this.http.delete(`${this.Basepath()}characters/defenses/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAttacks(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/attacks/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAttackByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/attack/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterDefenseByID(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/defenses/e/${id}`, {
      headers: this.Headers(),
    });
  }

  public addCharacterAttacks(id: number, data: AttackModel): Observable<any> {
    return this.http.post(`${this.Basepath()}characters/attacks/${id}`, data, {
      headers: this.Headers(),
    });
  }

  public editCharacterAttack(id: number, data: AttackModel): Observable<any> {
    return this.http.put(`${this.Basepath()}characters/attack/${id}`, data, {
      headers: this.Headers(),
    });
  }

  public editCharacterDefenses(id: number, data: string): Observable<any> {
    return this.http.put(
      `${this.Basepath()}characters/defenses/e/${id}`,
      { protection_value: data },
      {
        headers: this.Headers(),
      }
    );
  }

  public editCharacterDefense(id: number, data: AttackModel): Observable<any> {
    return this.http.put(`${this.Basepath()}characters/attack/${id}`, data, {
      headers: this.Headers(),
    });
  }

  public deleteCharacterAttacks(id: number): Observable<any> {
    return this.http.delete(`${this.Basepath()}characters/attacks/${id}`, {
      headers: this.Headers(),
    });
  }

  public getCharacterAbout(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/about/${id}`, {
      headers: this.Headers(),
    });
  }

  public editCharacterAbout(id: number, data: AboutModel): Observable<any> {
    return this.http.put(`${this.Basepath()}characters/about/${id}`, data, {
      headers: this.Headers(),
    });
  }

  public getCharacterProficiences(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}characters/proficiency/${id}`, {
      headers: this.Headers(),
    });
  }

  public editCharacterProficiences(
    proficiencyModel: ProficiencyModel
  ): Observable<any> {
    const proficiencyID = proficiencyModel.id;
    return this.http.put(
      `${this.Basepath()}characters/proficiency/${proficiencyID}`,
      proficiencyModel,
      {
        headers: this.Headers(),
      }
    );
  }

  public getClasses(): Observable<any> {
    return this.http.get<ClassesModel>(`${this.Basepath()}classes`, {
      headers: this.Headers(),
    });
  }

  public getTracks(class_id: number): Observable<any> {
    return this.http.get<TracksModel>(`${this.Basepath()}tracks/${class_id}`, {
      headers: this.Headers(),
    });
  }

  public getOrigins(): Observable<any> {
    return this.http.get<ClassesModel>(`${this.Basepath()}origins`, {
      headers: this.Headers(),
    });
  }
}
