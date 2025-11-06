import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Food from "@/models/food";
import { connect } from "@/lib/db";

function getActionFromURL(req) {
  return new URL(req.url).pathname.split("/api/food/").pop();
}

export async function POST(req) {
  const action = getActionFromURL(req);
  if (action === "addFood") {
    try {
      await connect();

      const formData = await req.formData();
      const name = formData.get("name");
      const description = formData.get("description");
      const price = formData.get("price");
      const category = formData.get("category");
      const file = formData.get("image");

      if (!file) {
        return NextResponse.json(
          { error: "Image is required" },
          { status: 400 }
        );
      }

      // Save file in /public/uploads
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);

      const imagePath = `${file.name}`;

      const existFood = await Food.findOne({ name });
      if (existFood) {
        return NextResponse.json(
          { error: "Food already  exists" },
          { status: 400 }
        );
      }

      const newFood = new Food({
        name,
        description,
        price,
        image: imagePath,
        category,
      });

      await newFood.save();

      return NextResponse.json(newFood, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }

  if (action === "signup") {
    try {
      await connect()

      const {name, email, password} = await req.json()
      console.log(name, email,password)

     
    } catch (error) {
      console.log(error);
      return NextResponse.json(error.message, { status: 500 })
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}

// export async function GET(req) {
//   const action = getActionFromURL(req);
//   if (action === "getFoodList") {
//     try {
//       await connect();
//       const foods = await Food.find();

//       if (!foods) throw new Error("food list not found");

//       return NextResponse.json(foods, { status: 200 });
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json(error.message, { status: 500 });
//     }
//   }
//   return NextResponse.json({ error: "Not Found" }, { status: 404 });
// }
const headers = {
  "Access-Control-Allow-Origin": "*", // ya apka frontend URL
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const action = getActionFromURL(req);

  if (action === "getFoodList") {
    try {
      await connect();
      const foods = await Food.find();
      return new Response(JSON.stringify(foods), { status: 200, headers });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
  }

  return new Response(JSON.stringify({ error: "Not Found" }), { status: 404, headers });
}


export async function DELETE(req) {
  const action = getActionFromURL(req);
  if (action === "deleteFood") {
    try {
      const { _id } = await req.json();

      if (!_id) throw new Error("id is required");

      const food = await Food.findById({ _id });

      if (!food) throw new Error("food not found");

      // ✅ Absolute image path
      const imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        food.image
      );

      // ✅ Delete image if exists
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await Food.findByIdAndDelete(_id);

      return NextResponse.json("food delete successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}

export async function PUT(req) {
  const action = getActionFromURL(req)

  if(action === 'updateFood'){
    try {
      
    } catch (error) {
      
    }
  }

  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}
