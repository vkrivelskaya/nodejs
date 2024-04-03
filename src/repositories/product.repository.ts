import { EntityManager } from '@mikro-orm/core';
import { initializeMikroORM } from '../micro-orm';
import { Product } from '../models/product.entity';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const mikroOrm = await initializeMikroORM();
    const em = mikroOrm.em;
    return await em.find(Product, {});
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const mikroOrm = await initializeMikroORM();
    const em = mikroOrm.em;
    return await em.findOne(Product, { id: productId });
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};