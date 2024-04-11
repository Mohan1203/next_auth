import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "Username already taken"],
        require: [true, "Username is must"]
    },
    email: {
        type: String,
        unique: [true, "Email already taken"],
        require: [true, "Email ID is missing"]
    },
    password: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    userVerificationToken: String,
    userVerificationTokenExpiry: Date,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date
}, { timestamps: true })

// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     try {
//         user.password = await bcrypt.hash(user.password, 8);
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// })

const userModel = mongoose.models.user || new mongoose.model('user', userSchema)

export default userModel;