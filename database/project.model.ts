import { Schema, models, model, Document } from "mongoose";

export interface IProject extends Document {
	title: string;
	content: string;
	tags: Schema.Types.ObjectId[];
	views: number;
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	author: Schema.Types.ObjectId[];
	file: {
		type: Buffer;
		required: true;
	};
	filename: {
		type: string;
		required: true;
	};
	mimetype: {
		type: string;
		required: true;
	};
	category: "undergraduate" | "masters" | "sandwhich" | "pg";
	createdAt: Date;
}

const ProjectSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
	views: { type: Number, default: 0 },
	upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	author: { type: Schema.Types.ObjectId, ref: "User" },
	file: {
		file: { type: Buffer, required: true },
		filename: { type: String, required: true },
		mimetype: { type: String, required: true },
	},
	category: {
		type: String,
		enum: ["undergraduate", "postgraduate", "masters"],
		required: true,
	},
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
