export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export interface CartItem extends Item {
  qty: number;
}
