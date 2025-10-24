import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'name is required']},
    email: {type: String, required: [true, 'email is required']},
    password: {type: String, required: [true, 'password is required'], unique: [true, 'please enter a unique email id']},
    cartData: { type: Object, default: () => ({}) }
},{timestamps : true})

const user = mongoose.models.User || mongoose.model('User', userSchema)

export default user