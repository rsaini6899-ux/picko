import { NextResponse } from "next/server";
import User from "../../../../models/user";
import { connect } from "../../../../lib/db";
import { authUser } from "../../../../middleware/userAuth";

connect();

function getActionFromURL(req) {
  return new URL(req.url).pathname.split("/api/cart/").pop();
}

export async function POST(req) {
  const action = getActionFromURL(req);
  if (action === "add") {
    try {
      const { itemId } = await req.json();
      const { user, error, status } = await authUser(req);

      if (error) {
        return NextResponse.json({ error }, { status });
      }

      const cartData = await user.cartData;

      const userId = user._id;

      if (!cartData[itemId]) {
        cartData[itemId] = 1;
      } else {
        cartData[itemId] += 1;
      }

      await User.findByIdAndUpdate(userId, { cartData });

      return NextResponse.json({message : 'food add to cart successfully'},  { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}

export async function GET(req) {
  const action = getActionFromURL(req)
  if (action === "get") {
    try {
        const { user, error, status } = await authUser(req)
  
        if (error) {
          return NextResponse.json({ error }, { status })
        }
  
        const cartData = await user.cartData

        return NextResponse.json(cartData,  { status: 200 });
  
    } catch (error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 })
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 })
}

export async function DELETE(req) {
  const action = getActionFromURL(req);

  if (action === "remove") {
    try {
      const { itemId } = await req.json();
      const { user, error, status } = await authUser(req);

      if (error) {
        return NextResponse.json({ error }, { status });
      }

      const cartData = await user.cartData;

      const userId = user._id;

      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
      }

      await User.findByIdAndUpdate(userId, { cartData })

      return NextResponse.json({message : 'food remove to cart successfully'},  { status: 200 });
    } catch (error) {
        console.log(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}
