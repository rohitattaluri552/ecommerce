export const GET_CART = `${process.env.BASE_URL}/api/users/2/cart`;
export const GET_PRODUCTS = `${process.env.BASE_URL}/api/products`;
export const GET_PRODUCT = (id: string) =>
  `${process.env.BASE_URL}/api/products/${id}`;
export const ADD_TO_CART = `${process.env.BASE_URL}/api/users/2/cart`;
export const REMOVE_FROM_CART = `${process.env.BASE_URL}/api/users/2/cart`;
