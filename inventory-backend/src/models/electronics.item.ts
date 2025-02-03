import { Schema } from 'mongoose';
import InventoryItem, { IInventoryItem } from './inventory.item';

export interface IElectronicsItem extends IInventoryItem {
  warrantyPeriod: number;
}

const ElectronicsSchema = new Schema<IElectronicsItem>({
  warrantyPeriod: { 
    type: Number, 
    required: [true, 'Warranty period is required'], 
    min: [0, 'Warranty period must be non-negative'] 
  }
});

const ElectronicsItem = InventoryItem.discriminator<IElectronicsItem>('Electronics', ElectronicsSchema);

export default ElectronicsItem;
