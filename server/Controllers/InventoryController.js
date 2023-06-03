import pool from '../../connection.js';

class InventoryController {
  async getInventoryInfo(req, res) {
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
  }

  async editInventoryInfos(req, res) {
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

      res.status(200).json({
        message: 'Informações de inventário atualizadas com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar informações de inventário:', error);
      res.status(500).json('Erro ao atualizar informações de inventário');
    }
  }

  async getInventoryItems(req, res) {
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
  }

  async getInventoryTotalWeight(req, res) {
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

  async addInventoryItems(req, res) {
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
  }

  async deleteInventoryItems(req, res) {
    try {
      const id = req.params.id;

      await pool.execute('DELETE FROM inventory_items WHERE item_id = ?', [
        id,
      ]);

      res.json({ message: 'Item do inventário excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir item do inventário:', error);
      res.status(500).json('Erro ao excluir item do inventário');
    }
  }
}

export default new InventoryController()
