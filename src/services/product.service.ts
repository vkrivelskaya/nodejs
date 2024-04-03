import { EntityManager } from '@mikro-orm/core';
import { Product } from "../models/product.entity";
import { getAllProducts as fetchAllProducts, getProductById as fetchProductById } from '../repositories/product.repository';


export const getAllProducts = async (): Promise<Product[]> => {
    try {
        return await fetchAllProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
    try {
        return await fetchProductById(productId);
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
    }
};