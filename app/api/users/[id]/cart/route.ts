import { connectToDb } from "@/app/api/db";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDb();
  const { id } = params;
  /**
   * UserId is the key used in the db
   * id is the product id that passed in the url
   */
  const userCart = await db.collection("carts").findOne({ userId: id });
  // Check if the user has a shopping cart
  if (!userCart) {
    return new Response(
      JSON.stringify({
        message: "No cart items found for this user",
        cartItems: [],
        totalCartItems: 0,
        totalPrice: 0,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const cartIds = userCart.cartIds;
  const cartItems = await db
    .collection("products")
    .find({ id: { $in: cartIds } })
    .toArray();

  return new Response(
    JSON.stringify({
      message: "Fetched cart items successfully",
      cartItems,
      totalCartItems: cartItems.length,
      totalPrice: cartItems.reduce((total, item) => total + item.price, 0),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

type CartBody = {
  productId: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDb();
  const userId = params.id;

  const body: CartBody = await request.json();

  const productId = body.productId;

  const userCart = await db.collection("carts").findOne({ userId });
  const products = await db.collection("products").find({}).toArray();

  // Check if the product ID is valid
  if (products.find((p) => p.id === productId) === undefined) {
    return new Response(
      JSON.stringify({
        message: "Product not found",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Check if the new product ID is already in the cart
  if (userCart?.cartIds.includes(productId)) {
    return new Response(
      JSON.stringify({
        message: "Item already in cart",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { userId },
      { $push: { cartIds: productId } },
      { returnDocument: "after", upsert: true }
    );

  const cartItems = await db
    .collection("products")
    .find({ id: { $in: updatedCart?.cartIds } })
    .toArray();

  return new Response(
    JSON.stringify({
      message: "Added item to cart successfully",
      cartItems,
      totalCartItems: cartItems.length,
      totalPrice: cartItems.reduce(
        (total, item) =>
          total + (products.find((p) => p.id === item.id)?.price ?? 0),
        0
      ),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// DELETE request to remove an item from the cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDb();

  const userId = params.id;

  const body: CartBody = await request.json();

  const productId = body.productId;

  // Remove the product from the user's cart
  // $pull is used to remove an item from an array
  const updatedCartIds = await db
    .collection("carts")
    .findOneAndUpdate(
      { userId },
      { $pull: { cartIds: productId } },
      { returnDocument: "after" }
    );

  if (!updatedCartIds) {
    return new Response(
      JSON.stringify({
        message: "Item not found in cart",
        cartItems: [],
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const cartItems = await db
    .collection("products")
    .find({ id: { $in: updatedCartIds?.cartIds } })
    .toArray();

  return new Response(
    JSON.stringify({
      message: "Removed item from cart successfully",
      cartItems,
      totalCartItems: cartItems.length,
      totalPrice: cartItems.reduce((total, item) => total + item.price, 0),
    }),
    {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
