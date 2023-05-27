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

app.get('/characters/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [characterResult] = await pool.execute(
      'SELECT * FROM characters WHERE id = ?',
      [characterId]
    );

    if (characterResult.length === 0) {
      res.status(404).json({ error: 'Personagem não encontrado' });
      return;
    }

    const character = characterResult[0];
    character.weight = character.weight.toFixed(2);


    res.json({ character });
  } catch (error) {
    console.error('Erro ao obter personagem:', error);
    res.status(500).json({ error: 'Erro ao obter personagem' });
  }
});

app.get('/attributes/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [attributesResult] = await pool.execute(
      'SELECT * FROM attributes WHERE id = ?',
      [characterId]
    );

    if (attributesResult.length === 0) {
      res.status(404).json({ error: 'Atributos não encontrados' });
      return;
    }

    const attributes = attributesResult[0];

    res.json({ attributes });
  } catch (error) {
    console.error('Erro ao obter atributos:', error);
    res.status(500).json({ error: 'Erro ao obter atributos' });
  }
});

app.get('/skills/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [skillsResult] = await pool.execute(
      'SELECT * FROM skills WHERE character_id = ?',
      [characterId]
    );

    if (skillsResult.length === 0) {
      res.status(404).json({ error: 'Habilidades não encontradas' });
      return;
    }

    const skills = skillsResult;

    res.json({ skills });
  } catch (error) {
    console.error('Erro ao obter habilidades:', error);
    res.status(500).json({ error: 'Erro ao obter habilidades' });
  }
});

app.get('/abilities/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [abilitiesResult] = await pool.execute(
      'SELECT * FROM abilities WHERE character_id = ?',
      [characterId]
    );

    if (abilitiesResult.length === 0) {
      res.status(404).json({ error: 'Habilidades não encontradas' });
      return;
    }

    const abilities = abilitiesResult;

    res.json({ abilities });
  } catch (error) {
    console.error('Erro ao obter habilidades:', error);
    res.status(500).json({ error: 'Erro ao obter habilidades' });
  }
});

app.get('/powers/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    const [powersResult] = await pool.execute(
      'SELECT * FROM powers WHERE character_id = ?',
      [characterId]
    );

    if (powersResult.length === 0) {
      res.status(404).json({ error: 'Poderes não encontrados' });
      return;
    }

    const powers = powersResult;

    res.json({ powers });
  } catch (error) {
    console.error('Erro ao obter poderes:', error);
    res.status(500).json({ error: 'Erro ao obter poderes' });
  }
});

app.post('/create', async (req, res) => {
  try {
    const newCharacter = req.body;

    const [characterResult] = await pool.execute(
      'INSERT INTO characters (name, current_life, max_life, current_sanity, max_sanity, current_effort, max_effort, class, image_url, nex, weight, age, birthplace, characteristic, personality, player, displacement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        newCharacter.name,
        newCharacter.current_life,
        newCharacter.max_life,
        newCharacter.current_sanity,
        newCharacter.max_sanity,
        newCharacter.current_effort,
        newCharacter.max_effort,
        newCharacter.class,
        newCharacter.image_url,
        newCharacter.nex,
        newCharacter.weight,
        newCharacter.age,
        newCharacter.birthplace,
        newCharacter.characteristic,
        newCharacter.personality,
        newCharacter.player,
        newCharacter.displacement,
      ]
    );

    const newCharacterId = characterResult.insertId;

    await pool.execute(
      'INSERT INTO attributes (id, agility, strength, intellect, force, presence) VALUES (?, ?, ?, ?, ?, ?)',
      [
        newCharacterId,
        newCharacter.attributes.agility,
        newCharacter.attributes.strength,
        newCharacter.attributes.intellect,
        newCharacter.attributes.force,
        newCharacter.attributes.presence,
      ]
    );

    const skills = newCharacter.skills.skills.map((skill) => [
      newCharacterId,
      skill.name,
      skill.value,
    ]);

    await pool.query(
      'INSERT INTO skills (character_id, name, value) VALUES ?',
      [skills]
    );

    res.json({
      character: {
        id: newCharacterId,
        ...newCharacter,
      },
      attributes: newCharacter.attributes,
      skills: newCharacter.skills,
    });
  } catch (error) {
    console.error('Erro ao criar um novo personagem:', error);
    res.status(500).json({ error: 'Erro ao criar um novo personagem' });
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
        characterId
      ]
    );

    res.status(200).json({ message: 'Personagem atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar personagem' });
  }
});


app.post('/abilities/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const ability = req.body;

    await pool.execute(
      'INSERT INTO abilities (character_id, name, description) VALUES (?, ?, ?)',
      [characterId, ability.name, ability.description]
    );

    res.status(200).json({ message: 'Habilidade criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar uma nova habilidade:', error);
    res.status(500).json({ error: 'Erro ao criar uma nova habilidade' });
  }
});

app.post('/powers/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const power = req.body;

    await pool.execute(
      'INSERT INTO powers (character_id, name, description) VALUES (?, ?, ?)',
      [characterId, power.name, power.description]
    );

    res.status(200).json({ message: 'Poder criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar um novo poder:', error);
    res.status(500).json({ error: 'Erro ao criar um novo poder' });
  }
});

app.delete('/abilities/:id/:itemId', async (req, res) => {
  try {
    const characterId = req.params.id;
    const itemId = req.params.itemId;

    await pool.execute(
      'DELETE FROM abilities WHERE character_id = ? AND id = ?',
      [characterId, itemId]
    );

    res.status(200).json({ message: 'Habilidade excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir uma habilidade:', error);
    res.status(500).json({ error: 'Erro ao excluir uma habilidade' });
  }
});

app.delete('/powers/:id/:itemId', async (req, res) => {
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
    res.status(500).json({ error: 'Erro ao excluir um poder' });
  }
});

app.put('/attributes/:id/:attribute/:value', async (req, res) => {
  try {
    const characterId = req.params.id;
    const attribute = req.params.attribute;
    const attributeValue = req.params.value;

    await pool.execute(`UPDATE attributes SET ${attribute} = ? WHERE id = ?`, [
      attributeValue,
      characterId,
    ]);

    res.status(200).json({ message: 'Atributo atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar um atributo:', error);
    res.status(500).json({ error: 'Erro ao atualizar um atributo' });
  }
});

app.put('/skills/:id/:skillId/:newValue', async (req, res) => {
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
    console.error('Erro ao atualizar uma habilidade:', error);
    res.status(500).json({ error: 'Erro ao atualizar uma habilidade' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
