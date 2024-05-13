import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	password?: string;
	bio?: string;
	picture: string;
	regNo?: string;
	reputation?: number;
	saved: Schema.Types.ObjectId[];
	joinedAt: Date;
}

const UserSchema = new Schema({
	clerkId: { type: String, required: true },
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, reqired: false },
	bio: { type: String, required: false },
	picture: { type: String, required: true },
	regNo: { type: String, required: false },
	reputation: { type: Number, default: 0 },
	saved: [{ type: Schema.Types.ObjectId, ref: "Project" }],
	joinedAt: { type: Date, default: Date.now },
});

const User = models?.User || model("User", UserSchema);

export default User;
