import pool from '../../connection.js';

class AbilitiesController {
  async getAbilities(req, res) {
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
  }

  async getRituals(req, res) {
    try {
      const characterId = req.params.id;

      const [powersResult] = await pool.execute(
        'SELECT * FROM powers WHERE character_id = ?',
        [characterId]
      );

      if (powersResult.length === 0) {
        res.status(200).json('Rituais não encontrados');
        return;
      }

      const powers = powersResult;

      res.json({ powers });
    } catch (error) {
      console.error('Erro ao obter rituais:', error);
      res.status(500).json('Erro ao obter rituais');
    }
  }

  async addAbilities(req, res) {
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
  }

  async addRituals(req, res) {
    try {
      const characterId = req.params.id;
      const power = req.body;

      await pool.execute(
        'INSERT INTO powers (character_id, name, description) VALUES (?, ?, ?)',
        [characterId, power.name, power.description]
      );

      res.status(200).json({ message: 'Ritual criado com sucesso' });
    } catch (error) {
      console.error('Erro ao criar novo ritual:', error);
      res.status(500).json('Erro ao criar novo ritual');
    }
  }

  async deleteAbilities(req, res) {
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
  }

  async deleteRituals(req, res) {
    try {
      const characterId = req.params.id;
      const itemId = req.params.itemId;

      await pool.execute('DELETE FROM powers WHERE character_id = ? AND id = ?', [
        characterId,
        itemId,
      ]);

      res.status(200).json({ message: 'Ritual excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir um ritual:', error);
      res.status(500).json('Erro ao excluir ritual');
    }
  }
}

export default new AbilitiesController();
