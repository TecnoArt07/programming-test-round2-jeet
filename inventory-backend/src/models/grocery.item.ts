import { Schema } from 'mongoose';
import InventoryItem, { IInventoryItem } from './inventory.item';

export interface IGroceryItem extends IInventoryItem {
  expiryDate: Date;
}

const GrocerySchema = new Schema<IGroceryItem>({
  expiryDate: { 
    type: Date, 
    required: [true, 'Expiry date is required'] 
  }
});

const GroceryItem = InventoryItem.discriminator<IGroceryItem>('Grocery', GrocerySchema);

export default GroceryItem;
