import { ProductEntity } from "../models/product";
import Product from "../models/product";

export const getAllProducts = async (): Promise<ProductEntity[]> => {
    try {
        const products = await Product.find({}, {_id:0, id: 1, title: 1, description: 1, price: 1 });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

export const getProductById = async (productId: string): Promise<ProductEntity | null> => {
    try {
        const product = await Product.findOne({ id:  productId}, { _id: 0, id: 1, title: 1, description: 1, price: 1 });
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
    }
};
