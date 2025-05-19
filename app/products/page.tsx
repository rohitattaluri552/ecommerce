import ProductsList from "../productsList";

export const dynamic = "force-dynamic"; // Force the page to be dynamic

export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const data = await res.json();

  const cartRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/2/cart`,
    {
      cache: "no-cache",
    }
  );
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
