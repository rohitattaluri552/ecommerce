import NotFoundPage from "@/app/not-found";

export const dynamic = "force-dynamic"; // Force the page to be dynamic

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch product data based on the ID from params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}` // Use the GET_PRODUCT endpoint
  ).then((res) => res.json());
  const product = res.product;

  // If product is not found, return a 404 page
  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
        <img
          src={`/${product.imageUrl}`}
          alt="Product image"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-4xl font-bold mb-4">{product.name}</h3>
        <p className="text-2xl text-grey-600 mb-6">${product.price}</p>
        <h3 className="text-2xl font-semibold mb-2">Description: </h3>
        <p className="text-grey-700">{product.description}</p>
      </div>
    </div>
  );
}
// This is a placeholder for the product detail page.
