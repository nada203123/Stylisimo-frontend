import { Product } from "./Product";

export interface PaginatedProducts {
    [x: string]: any;
    totalItems: number;
    products: Product[];
    totalPages: number;
    currentPage: number;
  }