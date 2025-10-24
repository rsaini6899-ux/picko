import mongoose from "mongoose"
import { type } from "os"

const orderSchema = new mongoose.Schema({
    userId:{type: String, required: [true, 'user id is required']},
    items:{type: Array, required: [true, 'items id is required']},
    amount:{type: Number, required: [true, 'amount id is required']},
    address:{type: Object, required: [true, 'address id is required']},
    status:{type: String, default:'Food Processing'},
    date:{type: Date, default: Date.now()},
    payment:{type: Boolean, default:false},
})

const order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default order