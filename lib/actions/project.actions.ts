"use server";

import Project from "@/database/project.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import {
	DeleteProjectParams,
	EditProjectParams,
	GetProjectByIdParams,
	GetProjectsParams,
	ProjectVoteparams,
} from "./shared.types";
import User from "@/database/user.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getProjects(params: GetProjectsParams) {
	try {
		connectToDatabase();

		const { searchQuery, filter } = params;

		const query: FilterQuery<typeof Project> = {};

		if (searchQuery) {
			query.$or = [
				{ title: { $regex: new RegExp(searchQuery, "i") } },
				{ content: { $regex: new RegExp(searchQuery, "i") } },
			];
		}

		let sortOptions = {};

		switch (filter) {
			case "newest":
				sortOptions = { createdAt: -1 };
				break;
			case "frequent":
				sortOptions = { views: -1 };
				break;
			default:
				break;
		}

		const projects = await Project.find(query)
			.populate({ path: "tags", model: Tag })
			.populate({ path: "author", model: User })
			.sort(sortOptions);

		return { projects };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createProject(formData: FormData) {
	try {
		connectToDatabase();

		const formdata = formData;
		const parsedTags = JSON.parse(formdata.get("tags") as string);
		const parsedAuthor = JSON.parse(formdata.get("author") as string);
		const parsedPath = JSON.parse(formdata.get("path") as string);
		const { title, content, category } = Object.fromEntries(formdata.entries());
		const fileData = formdata.get("file");

		if (fileData instanceof File) {
			const arrayBuffer = await fileData.arrayBuffer();
			const buffer = new Uint8Array(arrayBuffer);
			const bufferData = Buffer.from(buffer);

			const project = await Project.create({
				title,
				content,
				author: parsedAuthor,
				category,
				file: {
					data: bufferData,
				},
			});

			const tagDocuments = [];
			// Getting tags from the database
			for (const tag of parsedTags) {
				const existingTag = await Tag.findOneAndUpdate(
					{ name: { $regex: new RegExp(`^${tag}$`, "i") } },
					{ $setOnInsert: { name: tag }, $push: { projects: project._id } },
					{ upsert: true, new: true }
				);

				tagDocuments.push(existingTag._id);
			}

			await Project.findByIdAndUpdate(project._id, {
				$push: { tags: { $each: tagDocuments } },
			});

			revalidatePath(parsedPath);
		} else {
			console.error("Invalid file data");
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getProjectById(params: GetProjectByIdParams) {
	try {
		connectToDatabase();
		const { projectId } = params;

		const project = await Project.findById(projectId)
			.populate({ path: "tags", model: Tag, select: "_id name" })
			.populate({
				path: "author",
				model: User,
				select: "_id clerkId name picture",
			});

		return project;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function upvoteProject(params: ProjectVoteparams) {
	try {
		connectToDatabase();

		const { userId, projectId, hasdownVoted, hasupVoted, path } = params;

		let updateQuery = {};

		if (hasupVoted) {
			updateQuery = { $pull: { upvotes: userId } };
		} else if (hasdownVoted) {
			updateQuery = {
				$pull: { downvotes: userId },
				$push: { upvotes: userId },
			};
		} else {
			updateQuery = {
				$addToset: {
					upvotes: userId,
				},
			};
		}

		const project = await Project.findByIdAndUpdate(projectId, updateQuery, {
			new: true,
		});

		if (!project) {
			throw new Error("Project not found");
		}

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function downvoteProject(params: ProjectVoteparams) {
	try {
		connectToDatabase();

		const { userId, projectId, hasdownVoted, hasupVoted, path } = params;

		let updateQuery = {};

		if (hasdownVoted) {
			updateQuery = { $pull: { downvotes: userId } };
		} else if (hasupVoted) {
			updateQuery = {
				$pull: { upvotes: userId },
				$push: { downvotes: userId },
			};
		} else {
			updateQuery = {
				$addToset: {
					downvotes: userId,
				},
			};
		}

		const project = await Project.findByIdAndUpdate(projectId, updateQuery, {
			new: true,
		});

		if (!project) {
			throw new Error("Project not found");
		}

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function editProject(params: EditProjectParams) {
	try {
		connectToDatabase();

		const { projectId, title, content, path, category } = params;

		const project = await Project.findById(projectId).populate("tags");

		if (!project) {
			throw new Error("Project not found");
		}

		(project.title = title),
			(project.content = content),
			(project.category = category),
			await project.save();

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteProject(params: DeleteProjectParams) {
	try {
		connectToDatabase();

		const { projectId, path } = params;

		await Project.deleteOne({ _id: projectId });
		await Interaction.deleteMany({ project: projectId });
		await Tag.updateMany(
			{ projects: projectId },
			{ $pull: { projects: projectId } }
		);

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getHotPtojects() {
	try {
		connectToDatabase();

		const hotProjects = await Project.find({})
			.sort({ views: -1, upvotes: -1 })
			.limit(5);

		return hotProjects;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
