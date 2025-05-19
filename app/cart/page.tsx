/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from "../product-data";

import ShoppingCartPage from "./ShoppingCartPage";

export const dynamic = "force-dynamic"; // Force the page to be dynamic

type CartItemResponse = {
  message: string;
  cartItems: Product[];
  totalCartItems: number;
  totalPrice: number;
};
export default async function CartPage({ params }: { params: { id: string } }) {
  const res: CartItemResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/2/cart`,
    {
      cache: "no-cache",
    }
  ).then((res) => res.json());

  const { cartItems, totalCartItems, totalPrice } = res;

  return <ShoppingCartPage initialCartProducts={cartItems} />;
}
// This is a placeholder for the product detail page.
