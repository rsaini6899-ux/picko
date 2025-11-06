// import mongoose from "mongoose"

// export async function connect() {
//     try {
//       await mongoose.connect(process.env.MONGO_URI); // ✅ No need for extra options
  
//       const connection = mongoose.connection;
  
//       connection.on("connected", () => {
//         console.log("✅ MongoDB Connected");
//       });
  
//       connection.on("error", (error) => {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);
//       });
//     } catch (error) {
//       console.error("❌ Connection Error:", error);
//     }
//   }
  

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connect() {

//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }


import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "picko", // ensure database name
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}


