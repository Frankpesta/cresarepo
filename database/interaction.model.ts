import { Schema, models, model, Document } from "mongoose";

export interface IInteraction extends Document {
	user: Schema.Types.ObjectId;
	action: string;
	project: Schema.Types.ObjectId;
	tags: Schema.Types.ObjectId;
	createdAt: Date;
}

const InteractionSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	action: { type: String, required: true },
	project: { type: Schema.Types.ObjectId, ref: "Project" },
	tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
	createdAt: { type: Date, default: Date.now },
});

const Interaction =
	models?.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
