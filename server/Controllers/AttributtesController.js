import pool from '../../connection.js';

class AttributesController {
  async getAttributes(req, res) {
    try {
      const characterId = req.params.id;

      const [attributesResult] = await pool.execute('SELECT * FROM attributes WHERE id = ?', [characterId]);

      if (attributesResult.length === 0) {
        res.status(200).json('Atributos não encontrados');
        return;
      }

      const attributes = attributesResult[0];

      res.json({ attributes });
    } catch (error) {
      console.error('Erro ao obter atributos:', error);
      res.status(500).json('Erro ao obter atributos');
    }
  }

  async getSkills(req, res) {
    try {
      const characterId = req.params.id;

      const [skillsResult] = await pool.execute('SELECT * FROM skills WHERE character_id = ?', [characterId]);

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
  }

  async editAttributes(req, res) {
    try {
      const characterId = req.params.id;
      const attribute = req.params.attribute;
      const attributeValue = req.params.value;

      await pool.execute(`UPDATE attributes SET ${attribute} = ? WHERE id = ?`, [attributeValue, characterId]);

      res.status(200).json({ message: 'Atributo atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar atributo:', error);
      res.status(500).json('Erro ao atualizar atributo');
    }
  }

  async editSkills(req, res) {
    try {
      const characterId = req.params.id;
      const skillId = req.params.skillId;
      const newValue = req.params.newValue;

      await pool.execute('UPDATE skills SET value = ? WHERE character_id = ? AND id = ?', [newValue, characterId, skillId]);

      res.status(200).json({ message: 'Habilidade atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar habilidade:', error);
      res.status(500).json('Erro ao atualizar habilidade');
    }
  }
}

export default new AttributesController();
