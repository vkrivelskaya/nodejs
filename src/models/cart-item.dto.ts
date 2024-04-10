export interface CartItemDTO {
    product: {
      id: string;
      title: string;
      description: string;
      price: number;
    };
    count: number;
}