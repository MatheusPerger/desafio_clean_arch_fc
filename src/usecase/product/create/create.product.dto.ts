export interface InputCreateProductDto {
  type: ProductType;  
  name: string;
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}

export enum ProductType {
  A = "a",
  B = "b",
}