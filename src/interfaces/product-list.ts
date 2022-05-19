export interface IPostsProps {
  products: IProduct[];
  onFav: (id: number) => void;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  isFavorite: boolean;
  rating: { rate: number; count: number };
}
