"use client";

import Link from "next/link";
import { useState } from "react";
import { REMOVE_FROM_CART } from "../end-points";
import { Product } from "../product-data";

export default function ShoppingCartPage({
  initialCartProducts,
}: {
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  async function removeFromCart(productId: string) {
    const response = await fetch(REMOVE_FROM_CART, {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setCartProducts(response.cartItems);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Shopping cart</h1>
      <ul className="space-y-4">
        {cartProducts.map((product) => (
          <li
            key={product?.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 flex justify-between items-center"
          >
            <Link href={`/products/${product?.id}`}>
              <h2 className="text-xl font-bold font-gra y-900 mb-2">
                {product?.name}
              </h2>
              <p className="text-gray-600">${product?.price}</p>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                removeFromCart(product.id);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48"
            >
              Remove from cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
