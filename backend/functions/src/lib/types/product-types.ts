export type TProducts = {
  name: string;
  code: string;
  size?: string;
  price: number;
  content?: number;
};

export type TProductsQuery = {
  search?: string;
  searchField: string;
  where?: string;
  whereField: string;
};
