import { Schema, model, Document, Model } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  quantity: number;
  price: number;
  category: 'Electronics' | 'Grocery' | 'Clothing';
}

const options = { 
  discriminatorKey: 'category', 
  collection: 'inventory', 
  timestamps: true 
};

const InventoryItemSchema = new Schema<IInventoryItem>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [0, 'Quantity must be non-negative'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be non-negative'] },
    category: { 
      type: String, 
      required: [true, 'Category is required'], 
      enum: {
         values: ['Electronics', 'Grocery', 'Clothing'],
         message: '{VALUE} is not a valid category'
      }
    }
  },
  options
);

const InventoryItem: Model<IInventoryItem> = model<IInventoryItem>('InventoryItem', InventoryItemSchema);

export default InventoryItem;
