import { Router } from "express";

import InventoryController from "./server/Controllers/InventoryController.js";
import CombatController from "./server/Controllers/CombatController.js";
import CharacterController from "./server/Controllers/CharacterController.js";
import AttributtesController from "./server/Controllers/AttributtesController.js";
import AbilitiesController from "./server/Controllers/AbilitiesController.js";
import AboutController from "./server/Controllers/AboutController.js";
import ProficiencyController from "./server/Controllers/ProficiencyController.js";


const routes = Router();

//inventario
routes.get("/characters/inventory_infos/:characterId", InventoryController.getInventoryInfo);
routes.put("/characters/inventory_infos/:characterId", InventoryController.editInventoryInfos);
routes.get("/characters/inventory_items/:characterid", InventoryController.getInventoryItems);
routes.get("/characters/inventory_items/total_weight/:characterid", InventoryController.getInventoryTotalWeight);
routes.post("/characters/inventory_items/:characterid", InventoryController.addInventoryItems);
routes.delete("/characters/inventory_items/:id", InventoryController.deleteInventoryItems);

//combate
routes.get("/characters/attacks/:characterid", CombatController.getAttacks);
routes.get("/characters/attack/:id", CombatController.getAttackByID);
routes.post("/characters/attacks/:characterid", CombatController.addAttacks);
routes.put("/characters/attack/:id", CombatController.editAttack);
routes.delete("/characters/attacks/:id", CombatController.deleteAttacks);
routes.get("/characters/defenses/:characterid", CombatController.getDefenses);
routes.get("/characters/defenses/e/:id", CombatController.getDefenseByID);
routes.post("/characters/defenses/:characterid", CombatController.addDefenses);
routes.put("/characters/defenses/e/:id", CombatController.editDefense);
routes.delete("/characters/defenses/:id", CombatController.deleteDefenses);
routes.get("/characters/defense/:characterid", CombatController.getTotalDefense);
routes.put("/characters/defense/:id/:defense_total", CombatController.editTotalDefense);

//personagem
routes.get("/characters", CharacterController.getCharacters);
routes.get("/characters/:id", CharacterController.getCharacterByID);
routes.post("/characters/create", CharacterController.addCharacter);
routes.delete("/characters/:id", CharacterController.deleteCharacter);
routes.put("/characters/:id", CharacterController.editCharacterStatus);
routes.put("/characters/edit/:id", CharacterController.editCharacter);
routes.put("/characters/hidden-status/:id", CharacterController.occultStatus);

//atributos e pericias
routes.get("/characters/attributes/:id", AttributtesController.getAttributes);
routes.get("/characters/skills/:id", AttributtesController.getSkills);
routes.put("/characters/attributes/:id/:attribute/:value", AttributtesController.editAttributes);
routes.put("/characters/skills/:id/:skillId/:newValue", AttributtesController.editSkills);
routes.put("/characters/skills/:skillId/:newValue", AttributtesController.favoriteSkill);

//habilidades e rituais
routes.get("/characters/abilities/:id", AbilitiesController.getAbilities);
routes.get("/characters/powers/:id", AbilitiesController.getRituals);
routes.post("/characters/abilities/:id", AbilitiesController.addAbilities);
routes.post("/characters/powers/:id", AbilitiesController.addRituals);
routes.delete("/characters/abilities/:id/:itemId", AbilitiesController.deleteAbilities);
routes.delete("/characters/powers/:id/:itemId", AbilitiesController.deleteRituals);

//sobre
routes.get("/characters/about/:characterId", AboutController.getCharacterAbout);
routes.put("/characters/about/:characterId", AboutController.editCharacterAbout);

//proficiências
routes.get("/characters/proficiency/:id", ProficiencyController.getProficiencies);
routes.put("/characters/proficiency/:id", ProficiencyController.editProficiences);

export default routes;
