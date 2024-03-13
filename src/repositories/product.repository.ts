import fs from 'fs';
import path from 'path';
import { ProductEntity } from '../models/product';

const PRODUCTS_DB_FILE = path.resolve(__dirname, 'products.db.json');

export const getAllProducts = async (): Promise<ProductEntity[]> => {
  try {
    const data = await fs.promises.readFile(PRODUCTS_DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products data:', error);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<ProductEntity | undefined> => {
  try {
    const data = await fs.promises.readFile(PRODUCTS_DB_FILE, 'utf8');
    const products: ProductEntity[] = JSON.parse(data);
    return products.find(product => product.id === productId);
  } catch (error) {
    console.error('Error reading products data:', error);
    return undefined;
  }
};