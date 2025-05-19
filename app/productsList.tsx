"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "./product-data";

export const dynamic = "force-dynamic"; // Force the page to be dynamic
export default function ProductsList({
  products,
  initialCartProducts = [],
}: {
  products: Product[];
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] =
    useState<Product[]>(initialCartProducts);

  async function addToCart(productId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/2/cart`,
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    // Update the cart products state with the new cart items
    setCartProducts(response.cartItems);
  }

  async function removeFromCart(productId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/2/cart`,
      {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    setCartProducts(response.cartItems);
  }

  // Check if the product is already in the cart
  function isProductInCart(productId: string) {
    return cartProducts?.some((product) => product.id === productId);
  }

  function handleCartButtonClick(productId: string) {
    return isProductInCart(productId) ? (
      <button
        onClick={(e) => {
          e.preventDefault();
          removeFromCart(productId);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Remove from cart
      </button>
    ) : (
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(productId);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Add to cart
      </button>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-center mb-4 h-48 relative">
            <Image
              src={"/" + product.imageUrl}
              alt={product.name}
              fill // Fill the container
              className="object-cover rounded-md" // Cover the container, maintaining aspect ratio
            />
          </div>
          <h2 className="text-xl text-gray-900 font-semibold mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">${product.price}</p>
          {handleCartButtonClick(product.id)}
        </Link>
      ))}
    </div>
  );
}
