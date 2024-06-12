import { getAllProducts, getProductById } from "../services/product.service";
import { Request, Response } from 'express';
import logger from "../logger";

export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await getAllProducts();
      res.status(200).json({data:products, error: null});
    } catch (error) {
      logger.error('Error fetching all products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = req.params.id;
      const product = await getProductById(productId);
      if (!product) {
        res.status(404).json({
            'data': null,
            'error': {
              'message': 'No product with such id'
            }
          });
        return;
      }

      res.status(200).json({data:product, error: null});
    } catch (error) {
      logger.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };