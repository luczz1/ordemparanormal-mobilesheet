export interface CharacterModel {
  id: number;
  age: number;
  birthplace: string;
  characteristic: string;
  class: string;
  current_effort: number;
  current_life: number;
  current_sanity: number;
  displacement: number;
  image_url: string;
  max_effort: number;
  max_life: number;
  max_sanity: number;
  name: string;
  nex: number;
  personality: string;
  player: string;
  weight: number;
}

export interface CharacterAttributesModel {
  id: { name: string; value: number };
  agility: { name: string; value: number };
  strength: { name: string; value: number };
  intellect: { name: string; value: number };
  force: { name: string; value: number };
  presence: { name: string; value: number };
}

export interface CharacterSkillsModel {
  name: string;
  value: number;
  name_url: string;
}
