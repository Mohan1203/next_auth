import mongoose from 'mongoose';

export async function connect() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        return
    } catch (error) {
        return "Something went wrong while connect Database"
    }

}
