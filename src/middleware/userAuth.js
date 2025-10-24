import User from '@/models/user'
import jwt from 'jsonwebtoken'

export const authUser = async (req) => {
    try {
        const authHeader = req.headers.get("authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { error: "Token missing or invalid", status: 401 }
        }

        // const token = req.headers.get("authorization")?.split(" ")[1];
        // if (!token) return { error: "Unauthorized", status: 401 };

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded._id).select("-password")

        if (!user) {
            return { error: "User not found", status: 404 }
        }

        return { user }

    } catch (error) {
        console.log(error)
        return { error: "Invalid token", status: 401 }
    }
}