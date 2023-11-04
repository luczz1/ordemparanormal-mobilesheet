import pool from "../../connection.js";

class CharacterController {
  async getCharacters(req, res) {
    try {
      const [characterResults] = await pool.execute("SELECT * FROM characters");

      if (characterResults.length === 0) {
        res.status(200).json("Nenhum personagem encontrado");
        return;
      }

      const characters = characterResults.map((character) => {
        character.weight = character.weight.toFixed(2);
        return character;
      });

      res.json({ characters });
    } catch (error) {
      console.error("Erro ao obter personagens:", error);
      res.status(500).json("Erro ao obter personagens");
    }
  }

  async getCharacterByID(req, res) {
    try {
      const characterId = req.params.id;

      const [characterResult] = await pool.execute(
        "SELECT * FROM characters WHERE id = ?",
        [characterId]
      );

      if (characterResult.length === 0) {
        res.status(404).json("Personagem não encontrado");
        return;
      }

      const character = characterResult[0];
      character.weight = character.weight.toFixed(2);

      res.json({ character });
    } catch (error) {
      console.error("Erro ao obter personagem:", error);
      res.status(500).json("Erro ao obter personagem");
    }
  }

  async addCharacter(req, res) {
    try {
      const newCharacter = req.body;

      let {
        name,
        current_life,
        max_life,
        current_sanity,
        max_sanity,
        current_effort,
        max_effort,
        charClass,
        image_url,
        nex,
        weight,
        age,
        occupation,
        path,
        player,
        displacement,
        origin,
      } = newCharacter;

      const [characterResult] = await pool.execute(
        "INSERT INTO characters (name, current_life, max_life, current_sanity, max_sanity, current_effort, max_effort, class, image_url, nex, weight, age, occupation, `path`, player, displacement, hidden_life, hidden_sanity, hidden_effort, origin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          current_life,
          max_life,
          current_sanity,
          max_sanity,
          current_effort,
          max_effort,
          charClass,
          image_url,
          nex,
          weight,
          age,
          occupation,
          path,
          player,
          displacement,
          0,
          0,
          0,
          origin,
        ]
      );

      const newCharacterId = characterResult.insertId;

      await pool.execute(
        "INSERT INTO attributes (id, agility, strength, intellect, stamina, presence) VALUES (?, ?, ?, ?, ?, ?)",
        [newCharacterId, 0, 0, 0, 0, 0]
      );

      const skillsName = [
        "artes",
        "atletismo",
        "atualidades",
        "ciência",
        "diplomacia",
        "enganação",
        "fortitude",
        "furtividade",
        "iniciativa",
        "intuição",
        "intimidação",
        "investigação",
        "luta",
        "medicina",
        "ocultismo",
        "percepção",
        "pilotagem",
        "pontaria",
        "prestidigitação",
        "profissão",
        "reflexos",
        "religião",
        "sobrevivência",
        "tática",
        "tecnologia",
        "vontade",
        "crime",
      ];

      const skillsData = skillsName.map((skill) => [
        newCharacterId,
        skill,
        0,
        0,
      ]);

      const query =
        "INSERT INTO skills (character_id, name, value, favorite) VALUES ?";
      await pool.query(query, [skillsData]);

      await pool.execute(
        "INSERT INTO inventory_infos (prestige_points, patent, item_limit, credit_limit, max_load, character_id) VALUES (?, ?, ?, ?, ?, ?)",
        [0, "", 0, 0, 0, newCharacterId]
      );

      await pool.execute(
        "INSERT INTO character_defense (defense_total, character_id) VALUES (?, ?)",
        [0, newCharacterId]
      );

      await pool.execute(
        "INSERT INTO character_about (`history`, personality, goals, character_id) VALUES (?, ?, ?, ?)",
        ["", "", "", newCharacterId]
      );

      await pool.execute(
        "INSERT INTO proficiency (simple_weapon, tactical_weapon, heavy_weapon, light_armor, heavy_armor, character_id) VALUES (?, ?, ?, ?, ?, ?)",
        [0, 0, 0, 0, 0, newCharacterId]
      );

      res.json({
        character: {
          id: newCharacterId,
          ...newCharacter,
        },
      });
    } catch (error) {
      console.error("Erro ao criar um novo personagem:", error);
      res.status(500).json("Erro ao criar um novo personagem");
    }
  }

  async deleteCharacter(req, res) {
    try {
      const characterId = req.params.id;

      await pool.execute("DELETE FROM attributes WHERE id = ?", [characterId]);
      await pool.execute("DELETE FROM powers WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM abilities WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM skills WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM inventory_items WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM inventory_infos WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM defense WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM attacks WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute(
        "DELETE FROM character_defense WHERE character_id = ?",
        [characterId]
      );
      await pool.execute("DELETE FROM character_about WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM proficiency WHERE character_id = ?", [
        characterId,
      ]);
      await pool.execute("DELETE FROM characters WHERE id = ?", [characterId]);

      res.json({ message: "Personagem deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar o personagem:", error);
      res.status(500).json("Erro ao deletar o personagem");
    }
  }

  async editCharacterStatus(req, res) {
    try {
      const characterId = req.params.id;
      const updatedCharacter = req.body;

      await pool.execute(
        "UPDATE characters SET name = ?, current_life = ?, max_life = ?, current_sanity = ?, max_sanity = ?, current_effort = ?, max_effort = ? WHERE id = ?",
        [
          updatedCharacter.name,
          updatedCharacter.current_life,
          updatedCharacter.max_life,
          updatedCharacter.current_sanity,
          updatedCharacter.max_sanity,
          updatedCharacter.current_effort,
          updatedCharacter.max_effort,
          characterId,
        ]
      );

      res.status(200).json({ message: "Personagem atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
      res.status(500).json("Erro ao atualizar personagem");
    }
  }

  async editCharacter(req, res) {
    try {
      const characterId = req.params.id;
      const updatedCharacter = req.body;

      await pool.execute(
        "UPDATE characters SET name = ?, current_life = ?, max_life = ?, current_sanity = ?, max_sanity = ?, current_effort = ?, max_effort = ?, class = ?, image_url = ?, nex = ?, weight = ?, age = ?, occupation = ?, `path` = ?, player = ?, displacement = ?, origin = ? WHERE id = ?",
        [
          updatedCharacter.name,
          updatedCharacter.current_life,
          updatedCharacter.max_life,
          updatedCharacter.current_sanity,
          updatedCharacter.max_sanity,
          updatedCharacter.current_effort,
          updatedCharacter.max_effort,
          updatedCharacter.charClass,
          updatedCharacter.image_url,
          updatedCharacter.nex,
          updatedCharacter.weight,
          updatedCharacter.age,
          updatedCharacter.occupation,
          updatedCharacter.path,
          updatedCharacter.player,
          updatedCharacter.displacement,
          updatedCharacter.origin,
          characterId,
        ]
      );

      res.status(200).json({ message: "Personagem atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
      res.status(500).json("Erro ao atualizar personagem");
    }
  }

  async occultStatus(req, res) {
    try {
      const characterId = req.params.id;
      const updatedCharacter = req.body;

      await pool.execute(
        "UPDATE characters SET hidden_life = ?, hidden_sanity = ?, hidden_effort = ? WHERE id = ?",
        [
          updatedCharacter.hidden_life,
          updatedCharacter.hidden_sanity,
          updatedCharacter.hidden_effort,
          characterId,
        ]
      );

      res.status(200).json({ message: "Personagem atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
      res.status(500).json("Erro ao atualizar personagem");
    }
  }

  async getClasses(req, res) {
    try {
      const [classesResults] = await pool.execute("SELECT * FROM classes");

      if (classesResults.length === 0) {
        res.status(200).json("Nenhuma classe encontrada");
        return;
      }

      res.json(classesResults);
    } catch (error) {
      console.error("Erro ao obter classe:", error);
      res.status(500).json("Erro ao obter classes");
    }
  }

  async getTracks(req, res) {
    try {
      const classId = req.params.id;

      const [trackResult] = await pool.execute(
        "SELECT * FROM tracks WHERE class_id = ?",
        [classId]
      );

      if (trackResult.length === 0) {
        res.status(404).json("Trilha não encontrada");
        return;
      }

      res.json(trackResult);
    } catch (error) {
      console.error("Erro ao obter trilha:", error);
      res.status(500).json("Erro ao obter trilhas");
    }
  }

  async getOrigins(req, res) {
    try {
      const [originsResults] = await pool.execute("SELECT * FROM origins");

      if (originsResults.length === 0) {
        res.status(200).json("Nenhuma origem encontrada");
        return;
      }

      res.json(originsResults);
    } catch (error) {
      console.error("Erro ao obter origem:", error);
      res.status(500).json("Erro ao obter origens");
    }
  }
}

export default new CharacterController();
