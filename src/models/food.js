import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'name is required']},
    description: {type: String, required: [true, 'description is required']},
    price: {type: Number, required: [true, 'price is required']},
    image: {type: String, required: [true, 'image is required']},
    category: {type: String, required: [true, 'category is required']},
},{timestamps: true})

const food = mongoose.models.Food || mongoose.model('Food', foodSchema)

export default food