export interface InputListCustomerDto {}

type Product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListCustomerDto {
    products: Product[];
}