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
  stamina: { name: string; value: number };
  presence: { name: string; value: number };
}

export interface CharacterSkillsModel {
  name: string;
  value: number;
  id: number;
  favorite: number;
}

export interface AbilitiesListModel {
  name: string;
  description: string;
  id: number;
}

export interface InventoryModel {
  item_id: number;
  item_name: string;
  category: string;
  slots: number;
}

export interface InventoryInfosModel {
  prestige_points: number;
  patent: string;
  item_limit: number;
  credit_limit: number;
  max_load: number;
}

export interface AttackModel {
  id: number;
  attack_name: string;
  test: string;
  damage: number;
  critical_or_range_or_special: string;
}

export interface DefenseModel {
  id: number;
  protection: string;
  character_id: number;
}
