import { connectToDb } from "../db";

export async function GET() {
  const { db } = await connectToDb();
  const products = await db.collection("products").find({}).toArray();

  return new Response(
    JSON.stringify({
      message: "Fetched products successfully",
      products,
      totalProducts: products?.length,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
