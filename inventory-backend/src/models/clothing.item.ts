import { Schema } from 'mongoose';
import InventoryItem, { IInventoryItem } from './inventory.item';

export interface IClothingItem extends IInventoryItem {
  size: string;
  material: string;
}

const ClothingSchema = new Schema<IClothingItem>({
  size: { 
    type: String, 
    required: [true, 'Size is required'] 
  },
  material: { 
    type: String, 
    required: [true, 'Material is required'] 
  }
});

const ClothingItem = InventoryItem.discriminator<IClothingItem>('Clothing', ClothingSchema);

export default ClothingItem;
