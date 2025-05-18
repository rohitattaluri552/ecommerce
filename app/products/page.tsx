import { GET_CART, GET_PRODUCTS } from "../end-points";
import ProductsList from "../productsList";

export const dynamic = "force-dynamic"; // Force the page to be dynamic

export default async function ProductsPage() {
  const res = await fetch(GET_PRODUCTS);
  const data = await res.json();

  const cartRes = await fetch(GET_CART, {
    cache: "no-cache",
  });
  const cartData = await cartRes.json();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <ProductsList
        products={data.products}
        initialCartProducts={cartData.cartItems}
      />
    </div>
  );
}
