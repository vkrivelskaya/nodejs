import { ProductEntity } from '../models/product';
import { getAllProducts as fetchAllProducts, getProductById as fetchProductById } from '../repositories/product.repository';

export const getAllProducts = async (): Promise<ProductEntity[]> => {
  try {
    const products = await fetchAllProducts();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (productId: string): Promise<ProductEntity | null> => {
    try {
      const product = await fetchProductById(productId);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  };