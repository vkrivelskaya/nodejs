import { Product } from '../models/product.entity';
import {DI} from '../server';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await DI.productRepository.findAll();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    return await  DI.productRepository.findOne(productId);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};