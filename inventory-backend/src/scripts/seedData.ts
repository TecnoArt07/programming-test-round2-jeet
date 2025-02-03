import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InventoryItem from '../models/inventory.item';
import ElectronicsItem from '../models/electronics.item';
import GroceryItem from '../models/grocery.item';
import ClothingItem from '../models/clothing.item';
import { connectDB } from '../config/database';

dotenv.config();

const generateDummyData = async () => {
  try {
    await connectDB();

    await InventoryItem.deleteMany({});
   
    const electronicsItems = [
      { name: 'Smartphone', quantity: 10, price: 699, warrantyPeriod: 24, category: 'Electronics' },
      { name: 'Laptop', quantity: 5, price: 1299, warrantyPeriod: 12, category: 'Electronics' }
    ];
    const createdElectronics = await Promise.all(
      electronicsItems.map(item => new ElectronicsItem(item).save())
    );

    const groceryItems = [
      { name: 'Milk', quantity: 30, price: 2.5, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), category: 'Grocery' },
      { name: 'Bread', quantity: 50, price: 1.5, expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), category: 'Grocery' }
    ];
    const createdGrocery = await Promise.all(
      groceryItems.map(item => new GroceryItem(item).save())
    );

    const clothingItems = [
      { name: 'T-Shirt', quantity: 100, price: 19.99, size: 'M', material: 'Cotton', category: 'Clothing' },
      { name: 'Jeans', quantity: 40, price: 49.99, size: 'L', material: 'Denim', category: 'Clothing' }
    ];
    const createdClothing = await Promise.all(
      clothingItems.map(item => new ClothingItem(item).save())
    );

    console.log('Dummy data generated successfully.');
    console.log({
      electronics: createdElectronics,
      grocery: createdGrocery,
      clothing: createdClothing
    });
  } catch (err) {
    console.error('Error generating dummy data:', err);
  } finally {
    mongoose.disconnect();
  }
};

generateDummyData();
