import { Request, Response } from 'express';
import InventoryService from '../services/inventory.service';

class InventoryController {
  async createItem(req: Request, res: Response): Promise<void> {
    try {
      const item = await InventoryService.createItem(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((val: any) => val.message);
        res.status(400).json({ error: 'Validation Error', messages });
      } else {
        res.status(500).json({ error: 'Failed to create item', details: error.message });
      }
    }
  }

  async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await InventoryService.updateItem(id, req.body);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.json(item);
      }
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((val: any) => val.message);
        res.status(400).json({ error: 'Validation Error', messages });
      } else {
        res.status(500).json({ error: 'Failed to update item', details: error.message });
      }
    }
  }

  async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await InventoryService.deleteItem(id);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.json({ message: 'Item deleted successfully' });
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete item', details: error.message });
    }
  }

  async getItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await InventoryService.getItem(id);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.json(item);
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch item', details: error.message });
    }
  }

  async getItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await InventoryService.getItems(req.query);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch items', details: error.message });
    }
  }

  async getTotalValue(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.query;
      if (!category || typeof category !== 'string') {
        res.status(400).json({ message: 'Category query parameter is required' });
        return;
      }
      const totalValue = await InventoryService.calculateTotalValue(category);
      res.json({ category, totalValue });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to calculate total value', details: error.message });
    }
  }

  async getLowStockItems(req: Request, res: Response): Promise<void> {
    try {
      const threshold = req.query.threshold ? Number(req.query.threshold) : 5;
      const items = await InventoryService.getLowStockItems(threshold);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch low stock items', details: error.message });
    }
  }
}

export default new InventoryController();
