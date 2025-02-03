import InventoryItem, { IInventoryItem } from '../models/inventory.item';

class InventoryService {
  async createItem(data: any): Promise<IInventoryItem> {
    const newItem = new InventoryItem(data);
    return newItem.save();
  }

  async updateItem(id: string, data: any): Promise<IInventoryItem | null> {
    return InventoryItem.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteItem(id: string): Promise<IInventoryItem | null> {
    return InventoryItem.findByIdAndDelete(id);
  }

  async getItem(id: string): Promise<IInventoryItem | null> {
    return InventoryItem.findById(id);
  }

  async getItems(query: any): Promise<IInventoryItem[]> {
    const filter: any = {};

    if (query.category) {
      filter.category = query.category;
    }
    if (query.price_lt) {
      filter.price = { ...filter.price, $lt: Number(query.price_lt) };
    }
    if (query.price_gt) {
      filter.price = { ...filter.price, $gt: Number(query.price_gt) };
    }
    if (query.quantity_lt) {
      filter.quantity = { ...filter.quantity, $lt: Number(query.quantity_lt) };
    }
    if (query.quantity_gt) {
      filter.quantity = { ...filter.quantity, $gt: Number(query.quantity_gt) };
    }

    return InventoryItem.find(filter);
  }

  async calculateTotalValue(category: string): Promise<number> {
    const items = await InventoryItem.find({ category });
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  async getLowStockItems(threshold: number = 5): Promise<IInventoryItem[]> {
    return InventoryItem.find({ quantity: { $lt: threshold } });
  }
}

export default new InventoryService();
