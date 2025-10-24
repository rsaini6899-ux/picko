import { NextResponse } from "next/server"
import User from "../../../../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { connect } from "../../../../lib/db"
import { authUser } from "../../../../middleware/userAuth"

connect()

function getActionFromURL(req) {
    return new URL(req.url).pathname.split("/api/user/").pop()
}

export async function POST(req) {
    const action = getActionFromURL(req)
  if (action === "signup") {
    try {
        const { name, email, password } = await req.json()
        const existUser = await User.findOne({ email })
        console.log(existUser)
        if (existUser) {
          return NextResponse.json(
            { error: "user all ready signup" },
            { status: 400 }
          );
        }
    
        const hashPassword = await bcrypt.hash(password, 10)
    
        const newUser = new User({
          name,
          email,
          password: hashPassword,
          cartData: { test: "check" }
        })

        console.log("Before Save:", newUser); 
    
        await newUser.save();
    
        return NextResponse.json(newUser, { status: 200 })
      } catch (error) {
        console.log(error);
        return NextResponse.json(error.message, { status: 500 })
      }
  }
  if (action === "login") {
    try {
        const { email, password } = await req.json()
        const user = await User.findOne({ email })
    
        if (!user) {
          return NextResponse.json({ error: "user not found" }, { status: 400 })
        }
    
        const matchPassword = await bcrypt.compare(password, user.password)
    
        if (!matchPassword) {
          return NextResponse.json(
            { error: "password not match" },
            { status: 400 }
          );
        }
    
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
    
        return NextResponse.json({ token, user }, { status: 200 })
      } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, { status: 500 })
      }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 })
}

export async function GET(req) {
  const action = getActionFromURL(req);
  if (action === "getProfile") {
    try {
      const { user, error, status } = await authUser(req);

      if (error) {
        return NextResponse.json({ error }, { status });
      }

      return NextResponse.json(user ,{ status: 200 })
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}
