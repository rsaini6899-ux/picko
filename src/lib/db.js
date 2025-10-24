import mongoose from "mongoose"

export async function connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL); // ✅ No need for extra options
  
      const connection = mongoose.connection;
  
      connection.on("connected", () => {
        console.log("✅ MongoDB Connected");
      });
  
      connection.on("error", (error) => {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
      });
    } catch (error) {
      console.error("❌ Connection Error:", error);
    }
  }
  


// import mongoose from "mongoose";

// let isConnected = false; // prevent multiple connections

// export const connect = async () => {
//   if (isConnected) return;

//   try {
//     await mongoose.connect(process.env.MONGO_URL || "", {
//       dbName: "your-db-name", // optional: if you want to set a specific DB
//     });

//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };
