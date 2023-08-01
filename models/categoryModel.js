import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
})

export default mongoose.model('category', categorySchema);



//slag is use for enstead of space it will strore - in db