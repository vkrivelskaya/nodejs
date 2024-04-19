import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export type ROLE = 'admin' | 'user';

export interface UserEntity extends Document {
    id: string;
    email: string;
    password: string;
    role: ROLE;
}


const UserSchema: Schema = new Schema({
    id: { type: Schema.Types.UUID, required: true },
    email: { type: Schema.Types.String, unique: true, required: true },
    password: { type: Schema.Types.String, required: true },
    role: { type: Schema.Types.String, enum: ['admin', 'user'], default: 'user' }
});


UserSchema.pre<UserEntity>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(hashedPassword);
        user.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});


export default mongoose.model<UserEntity>('User', UserSchema);