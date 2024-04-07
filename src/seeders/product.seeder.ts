import { EntityManager } from '@mikro-orm/core';
import { Product } from '../models/product.entity';

export async function seedProducts(em: EntityManager) {
  const productData = [
    {
      id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
      title: 'Book',
      description: 'A very interesting book',
      price: 100
    },
    {
      id: '915b2f40-9fd9-47f2-9b51-628f3dc69aac',
      title: 'Game',
      description: 'A very interesting game',
      price: 200
    }
  ];

  for (const data of productData) {
    const product = new Product(data.title, data.description, data.price);
    product.uuid = data.id;
    em.persist(product);
  }

  await em.flush();
}