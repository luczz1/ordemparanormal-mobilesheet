export interface CharacterModel {
  id: number;
  age: number;
  occupation: string;
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
  path: string;
  player: string;
  weight: number;
  hidden_life: number;
  hidden_sanity: number;
  hidden_effort: number;
  origin: string;
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
  training: number;
}

export interface AbilitiesListModel {
  name: string;
  description: string;
  id: number;
  price?: string;
  page?: string;
  element?: string;
  circle?: number;
  target?: string;
  duration?: string;
  resistance?: string;
  execution?: number;
  reach?: number;
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
  item_limit_1: number;
  item_limit_2: number;
  item_limit_3: number;
  item_limit_4: number;
  credit_limit: number;
  max_load: number;
  max_spc_load: number;
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

export interface AboutModel {
  id: number;
  history: string;
  personality: string;
  goals: string;
  character_id: number;
}

export interface ProficiencyModel {
  id: number;
  simple_weapon: number;
  tactical_weapon: number;
  heavy_weapon: number;
  light_armor: number;
  heavy_armor: number;
  character_id: number;
}

export interface ClassesModel {
  id: number;
  name: string;
}

export interface TracksModel {
  id: number;
  name: string;
  class_id: number;
}
