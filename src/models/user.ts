import mongoose, { Schema } from "mongoose";

export interface UserEntity extends Document {
    id: string;
}
const UserSchema: Schema = new Schema({
    id: { type: Schema.Types.UUID, required: true },
});

export default mongoose.model<UserEntity>('User', UserSchema);