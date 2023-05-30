const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:8100',
};
app.use(cors(corsOptions));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'lucas123',
  database: 'ordem-sheet',
});

app.get('/characters', async (req, res) => {
  try {
    const [characterResults] = await pool.execute('SELECT * FROM characters');

    if (characterResults.length === 0) {
      res.status(200).json('Nenhum personagem encontrado');
      return;
    }

    const characters = characterResults.map((character) => {
      character.weight = character.weight.toFixed(2);
      return character;
    });

    res.json({ characters });
  } catch (error) {
    console.error('Erro ao obter personagens:', error);
    res.status(500).json('Erro ao obter personagens');
  }
});

app.get('/characters/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [characterResult] = await pool.execute(
      'SELECT * FROM characters WHERE id = ?',
      [characterId]
    );

    if (characterResult.length === 0) {
      res.status(404).json('Personagem não encontrado');
      return;
    }

    const character = characterResult[0];
    character.weight = character.weight.toFixed(2);

    res.json({ character });
  } catch (error) {
    console.error('Erro ao obter personagem:', error);
    res.status(500).json('Erro ao obter personagem');
  }
});

app.get('/characters/attributes/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [attributesResult] = await pool.execute(
      'SELECT * FROM attributes WHERE id = ?',
      [characterId]
    );

    if (attributesResult.length === 0) {
      res.status(404).json('Atributos não encontrados');
      return;
    }

    const attributes = attributesResult[0];

    res.json({ attributes });
  } catch (error) {
    console.error('Erro ao obter atributos:', error);
    res.status(500).json('Erro ao obter atributos');
  }
});

app.get('/characters/skills/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [skillsResult] = await pool.execute(
      'SELECT * FROM skills WHERE character_id = ?',
      [characterId]
    );

    if (skillsResult.length === 0) {
      res.status(200).json('Habilidades não encontradas');
      return;
    }

    const skills = skillsResult;

    res.json({ skills });
  } catch (error) {
    console.error('Erro ao obter habilidades:', error);
    res.status(500).json('Erro ao obter habilidades');
  }
});

app.get('/characters/abilities/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [abilitiesResult] = await pool.execute(
      'SELECT * FROM abilities WHERE character_id = ?',
      [characterId]
    );

    if (abilitiesResult.length === 0) {
      res.status(200).json('Habilidades não encontradas');
      return;
    }

    const abilities = abilitiesResult;

    res.json({ abilities });
  } catch (error) {
    console.error('Erro ao obter habilidades:', error);
    res.status(500).json('Erro ao obter habilidades');
  }
});

app.get('/characters/powers/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [powersResult] = await pool.execute(
      'SELECT * FROM powers WHERE character_id = ?',
      [characterId]
    );

    if (powersResult.length === 0) {
      res.status(200).json('Poderes não encontrados');
      return;
    }

    const powers = powersResult;

    res.json({ powers });
  } catch (error) {
    console.error('Erro ao obter poderes:', error);
    res.status(500).json('Erro ao obter poderes');
  }
});

app.post('/characters/create', async (req, res) => {
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
      birthplace,
      characteristic,
      personality,
      player,
      displacement,
    } = newCharacter;

    const [characterResult] = await pool.execute(
      'INSERT INTO characters (name, current_life, max_life, current_sanity, max_sanity, current_effort, max_effort, class, image_url, nex, weight, age, birthplace, characteristic, personality, player, displacement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        birthplace,
        characteristic,
        personality,
        player,
        displacement,
      ]
    );

    const newCharacterId = characterResult.insertId;

    await pool.execute(
      'INSERT INTO attributes (id, agility, strength, intellect, stamina, presence) VALUES (?, ?, ?, ?, ?, ?)',
      [newCharacterId, 0, 0, 0, 0, 0]
    );

    const skillsName = [
      'artes',
      'atletismo',
      'atualidades',
      'ciência',
      'diplomacia',
      'enganação',
      'fortitude',
      'furtividade',
      'iniciativa',
      'intuição',
      'intimidação',
      'investigação',
      'luta',
      'medicina',
      'ocultismo',
      'percepção',
      'pilotagem',
      'pontaria',
      'prestidigitação',
      'profissão',
      'reflexos',
      'religião',
      'sobrevivência',
      'tática',
      'tecnologia',
      'vontade',
    ];

    const skillsData = skillsName.map((skill) => [newCharacterId, skill, 0]);

    const query = 'INSERT INTO skills (character_id, name, value) VALUES ?';
    await pool.query(query, [skillsData]);

    await pool.execute(
      'INSERT INTO inventory_infos (prestige_points, patent, item_limit, credit_limit, max_load, character_id) VALUES (?, ?, ?, ?, ?, ?)',
      [0, '', 0, 0, 0, newCharacterId]
    );

    await pool.execute(
      'INSERT INTO defense (defense_total, protection, resistances, character_id) VALUES (?, ?, ?, ?)',
      [0, '', '', newCharacterId]
    );

    await pool.execute(
      'INSERT INTO attacks (attack_name, test, damage, critical_or_range_or_special, character_id) VALUES (?, ?, ?, ?, ?)',
      ['', '', 0, '', newCharacterId]
    );

    res.json({
      character: {
        id: newCharacterId,
        ...newCharacter,
      },
    });
  } catch (error) {
    console.error('Erro ao criar um novo personagem:', error);
    res.status(500).json('Erro ao criar um novo personagem');
  }
});

app.delete('/characters/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    await pool.execute('DELETE FROM attributes WHERE id = ?', [characterId]);
    await pool.execute('DELETE FROM powers WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM abilities WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM skills WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM inventory_items WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM inventory_infos WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM defense WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM attacks WHERE character_id = ?', [
      characterId,
    ]);
    await pool.execute('DELETE FROM characters WHERE id = ?', [characterId]);

    res.json({ message: 'Personagem deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar o personagem:', error);
    res.status(500).json('Erro ao deletar o personagem');
  }
});
app.put('/characters/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const updatedCharacter = req.body;

    await pool.execute(
      'UPDATE characters SET name = ?, current_life = ?, max_life = ?, current_sanity = ?, max_sanity = ?, current_effort = ?, max_effort = ?, class = ?, image_url = ?, nex = ?, weight = ?, age = ?, birthplace = ?, characteristic = ?, personality = ?, player = ?, displacement = ? WHERE id = ?',
      [
        updatedCharacter.name,
        updatedCharacter.current_life,
        updatedCharacter.max_life,
        updatedCharacter.current_sanity,
        updatedCharacter.max_sanity,
        updatedCharacter.current_effort,
        updatedCharacter.max_effort,
        updatedCharacter.class,
        updatedCharacter.image_url,
        updatedCharacter.nex,
        updatedCharacter.weight,
        updatedCharacter.age,
        updatedCharacter.birthplace,
        updatedCharacter.characteristic,
        updatedCharacter.personality,
        updatedCharacter.player,
        updatedCharacter.displacement,
        characterId,
      ]
    );

    res.status(200).json({ message: 'Personagem atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json('Erro ao atualizar personagem');
  }
});

app.put('/characters/edit/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const updatedCharacter = req.body;

    await pool.execute(
      'UPDATE characters SET name = ?, current_life = ?, max_life = ?, current_sanity = ?, max_sanity = ?, current_effort = ?, max_effort = ?, class = ?, image_url = ?, nex = ?, weight = ?, age = ?, birthplace = ?, characteristic = ?, personality = ?, player = ?, displacement = ? WHERE id = ?',
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
        updatedCharacter.birthplace,
        updatedCharacter.characteristic,
        updatedCharacter.personality,
        updatedCharacter.player,
        updatedCharacter.displacement,
        characterId,
      ]
    );

    res.status(200).json({ message: 'Personagem atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json('Erro ao atualizar personagem');
  }
});

app.post('/characters/abilities/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const ability = req.body;

    await pool.execute(
      'INSERT INTO abilities (character_id, name, description) VALUES (?, ?, ?)',
      [characterId, ability.name, ability.description]
    );

    res.status(200).json({ message: 'Habilidade criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar nova habilidade:', error);
    res.status(500).json('Erro ao criar nova habilidade');
  }
});

app.post('/characters/powers/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const power = req.body;

    await pool.execute(
      'INSERT INTO powers (character_id, name, description) VALUES (?, ?, ?)',
      [characterId, power.name, power.description]
    );

    res.status(200).json({ message: 'Poder criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar novo poder:', error);
    res.status(500).json('Erro ao criar novo poder');
  }
});

app.delete('/characters/abilities/:id/:itemId', async (req, res) => {
  try {
    const characterId = req.params.id;
    const itemId = req.params.itemId;

    await pool.execute(
      'DELETE FROM abilities WHERE character_id = ? AND id = ?',
      [characterId, itemId]
    );

    res.status(200).json({ message: 'Habilidade excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir habilidade:', error);
    res.status(500).json('Erro ao excluir habilidade');
  }
});

app.delete('/characters/powers/:id/:itemId', async (req, res) => {
  try {
    const characterId = req.params.id;
    const itemId = req.params.itemId;

    await pool.execute('DELETE FROM powers WHERE character_id = ? AND id = ?', [
      characterId,
      itemId,
    ]);

    res.status(200).json({ message: 'Poder excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir um poder:', error);
    res.status(500).json('Erro ao excluir poder');
  }
});

app.put('/characters/attributes/:id/:attribute/:value', async (req, res) => {
  try {
    const characterId = req.params.id;
    let attribute = req.params.attribute;

    const attributeValue = req.params.value;

    await pool.execute(`UPDATE attributes SET ${attribute} = ? WHERE id = ?`, [
      attributeValue,
      characterId,
    ]);

    res.status(200).json({ message: 'Atributo atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar atributo:', error);
    res.status(500).json('Erro ao atualizar atributo');
  }
});

app.put('/characters/skills/:id/:skillId/:newValue', async (req, res) => {
  try {
    const characterId = req.params.id;
    const skillId = req.params.skillId;
    const newValue = req.params.newValue;

    await pool.execute(
      'UPDATE skills SET value = ? WHERE character_id = ? AND id = ?',
      [newValue, characterId, skillId]
    );

    res.status(200).json({ message: 'Habilidade atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar habilidade:', error);
    res.status(500).json('Erro ao atualizar habilidade');
  }
});

app.get('/characters/inventory_infos/:characterId', async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const [inventoryInfoResult] = await pool.execute(
      'SELECT * FROM inventory_infos WHERE character_id = ?',
      [characterId]
    );

    if (inventoryInfoResult.length === 0) {
      res.status(200).json('Informações do inventário não encontradas');
      return;
    }

    const inventoryInfo = inventoryInfoResult[0];

    res.json({ inventoryInfo });
  } catch (error) {
    console.error('Erro ao obter informações do inventário:', error);
    res.status(500).json('Erro ao obter informações do inventário');
  }
});

app.put('/characters/inventory_infos/:characterId', async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const updatedInventoryInfo = req.body;

    await pool.execute(
      'UPDATE inventory_infos SET prestige_points = ?, patent = ?, item_limit = ?, credit_limit = ?, max_load = ? WHERE character_id = ?',
      [
        updatedInventoryInfo.prestige_points,
        updatedInventoryInfo.patent,
        updatedInventoryInfo.item_limit,
        updatedInventoryInfo.credit_limit,
        updatedInventoryInfo.max_load,
        characterId,
      ]
    );

    res
      .status(200)
      .json({ message: 'Informações de inventário atualizadas com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar informações de inventário:', error);
    res.status(500).json('Erro ao atualizar informações de inventário');
  }
});

app.get('/characters/inventory_items/:characterid', async (req, res) => {
  const characterId = req.params.characterid;

  try {
    const [inventoryItems] = await pool.query(
      'SELECT * FROM inventory_items WHERE character_id = ?',
      [characterId]
    );

    res.json({
      inventory_items: inventoryItems,
    });
  } catch (error) {
    console.error('Erro ao obter itens do inventário:', error);
    res.status(500).json('Erro ao obter itens do inventário');
  }
});

app.get(
  '/characters/inventory_items/total_weight/:characterid',
  async (req, res) => {
    const characterId = req.params.characterid;

    try {
      const [inventoryItems] = await pool.query(
        'SELECT * FROM inventory_items WHERE character_id = ?',
        [characterId]
      );

      const [inventoryInfos] = await pool.query(
        'SELECT * FROM inventory_infos WHERE character_id = ?',
        [characterId]
      );

      const cargaAtual = inventoryItems.reduce((acc, total) => {
        acc += total.slots;
        return acc;
      }, 0);

      const cargaTotal = inventoryInfos[0].max_load;

      res.json({
        atual: cargaAtual,
        total: cargaTotal,
        status: cargaAtual <= cargaTotal ? 'Normal' : 'Sobrecarga',
      });
    } catch (error) {
      console.error('Erro ao obter peso do inventário:', error);
      res.status(500).json('Erro ao obter peso do inventário');
    }
  }
);

app.post('/characters/inventory_items/:characterid', async (req, res) => {
  try {
    const newInventoryItem = req.body;
    const characterId = req.params.characterid;

    const [inventoryItemResult] = await pool.execute(
      'INSERT INTO inventory_items (item_name, category, slots, character_id) VALUES (?, ?, ?, ?)',
      [
        newInventoryItem.item_name,
        newInventoryItem.category,
        newInventoryItem.slots,
        characterId,
      ]
    );

    const newInventoryItemId = inventoryItemResult.insertId;

    res.json({
      inventory_item: {
        id: newInventoryItemId,
        ...newInventoryItem,
      },
    });
  } catch (error) {
    console.error('Erro ao criar um novo item do inventário:', error);
    res.status(500).json('Erro ao criar um novo item do inventário');
  }
});

app.delete('/characters/inventory_items/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await pool.execute('DELETE FROM inventory_items WHERE item_id = ?', [id]);

    res.json({ message: 'Item do inventário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir item do inventário:', error);
    res.status(500).json('Erro ao excluir item do inventário');
  }
});

app.get('/characters/attacks/:characterid', async (req, res) => {
  const { characterid } = req.params;

  try {
    const [attackResults] = await pool.execute(
      'SELECT * FROM attacks WHERE character_id = ?',
      [characterid]
    );

    if (attackResults.length === 0) {
      res.status(200).json('Nenhum ataque encontrado.');
      return;
    }

    res.json(attackResults);
  } catch (error) {
    console.error('Erro ao obter ataques:', error);
    res.status(500).json('Erro ao obter ataques');
  }
});

app.post('/characters/attacks/:characterid', async (req, res) => {
  try {
    const attackItem = req.body;
    const characterId = req.params.characterid;

    const [attackItemResult] = await pool.execute(
      'INSERT INTO attacks (attack_name, test, damage, critical_or_range_or_special, character_id) VALUES (?, ?, ?, ?, ?)',
      [
        attackItem.attack_name,
        attackItem.test,
        attackItem.damage,
        attackItem.critical_or_range_or_special,
        characterId,
      ]
    );

    const attackItemId = attackItemResult.insertId;

    res.json({
      id: attackItemId,
      ...attackItem,
    });
  } catch (error) {
    console.error('Erro ao criar um adicionar um ataque:', error);
    res.status(500).json('Erro ao criar um adicionar um ataque');
  }
});

app.delete('/characters/attacks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [attackResults] = await pool.execute(
      'DELETE * FROM attacks WHERE id = ?',
      [id]
    );

    res.json({ message: 'Ataque excluído.' });
  } catch (error) {
    console.error('Erro ao excluir ataque:', error);
    res.status(500).json('Erro ao excluir ataque');
  }
});

app.get('/characters/defenses/:characterid', async (req, res) => {
  const { characterid } = req.params;

  try {
    const [defenseResults] = await pool.execute(
      'SELECT * FROM defense WHERE character_id = ?',
      [characterid]
    );

    if (defenseResults.length === 0) {
      res.status(200).json('Nenhuma defesa encontrada.');
      return;
    }

    res.json(defenseResults);
  } catch (error) {
    console.error('Erro ao obter defesas:', error);
    res.status(500).json('Erro ao obter defesas');
  }
});

app.post('/characters/defenses/:characterid', async (req, res) => {

});

app.delete('/characters/defenses/:characterid', async (req, res) => {

});

app.get('/characters/defense/:characterid', async (req, res) => {
  const { characterid } = req.params;

  try {
    const [defenseResults] = await pool.execute(
      'SELECT * FROM character_defense WHERE character_id = ?',
      [characterid]
    );

    if (defenseResults.length === 0) {
      res.status(200).json('Nenhuma defesa encontrada.');
      return;
    }

    res.json(defenseResults);
  } catch (error) {
    console.error('Erro ao obter defesas:', error);
    res.status(500).json('Erro ao obter defesas');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
