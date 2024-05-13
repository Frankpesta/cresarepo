"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
	CreateUserParams,
	UpdateUserParams,
	DeleteUserParams,
	ToggleSaveProjectParams,
	GetAllUsersParams,
	GetSavedProjectsParams,
	GetUserByIdParams,
	GetUserStatsParams,
} from "./shared.types";
import Project from "@/database/project.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";

export async function createUser(userData: CreateUserParams) {
	try {
		connectToDatabase();
		// creating new users

		const newUser = await User.create(userData);

		return newUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserById(params: any) {
	try {
		connectToDatabase();

		const { userId } = params;
		const user = await User.findOne({
			clerkId: userId,
		});
		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function updateUser(params: UpdateUserParams) {
	try {
		connectToDatabase();

		const { clerkId, updateData, path } = params;

		await User.findOneAndUpdate({ clerkId }, updateData, {
			new: true,
		});

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteUser(params: DeleteUserParams) {
	try {
		connectToDatabase();

		const { clerkId } = params;

		const user = await User.findOne({ clerkId });

		if (!user) {
			throw new Error("User not found!");
		}

		// Delete user from DB
		// and questions and answers and comments etc

		// get user question IDS
		// const userQuestionIds = await Question.find({ author: user._id }).distinct(
		//   "_id"
		// );

		await Project.deleteMany({ author: user._id });

		// TODO: Delete user answers and comments etc

		const deletedUser = await User.findByIdAndDelete(user._id);

		return deletedUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function toggleSaveProject(params: ToggleSaveProjectParams) {
	try {
		connectToDatabase();

		const { userId, projectId, path } = params;

		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}

		const isProjectSaved = user.saved.includes(projectId);

		if (isProjectSaved) {
			// remove project from saved array

			await User.findByIdAndUpdate(
				userId,
				{
					$pull: { saved: projectId },
				},
				{ new: true }
			);
		} else {
			// add question to saved
			await User.findByIdAndUpdate(
				userId,
				{
					$addToSet: { saved: projectId },
				},
				{ new: true }
			);
		}

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getAllUsers(params: GetAllUsersParams) {
	try {
		connectToDatabase();

		const { searchQuery, filter } = params;

		const query: FilterQuery<typeof User> = {};

		if (searchQuery) {
			query.$or = [
				{ name: { $regex: searchQuery, $options: "i" } },
				{ username: { $regex: searchQuery, $options: "i" } },
			];
		}

		let searchOptions = {};
		switch (filter) {
			case "new_users":
				searchOptions = { joinedAt: -1 };
				break;
			case "old_users":
				searchOptions = { joinedAt: 1 };
				break;
			default:
				break;
		}

		const users = await User.find(query).sort(searchOptions);

		return { users };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getSavedProjects(params: GetSavedProjectsParams) {
	try {
		connectToDatabase();

		const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

		const query: FilterQuery<typeof Project> = searchQuery
			? { title: { $regex: new RegExp(searchQuery, "i") } }
			: {};

		let sortOptions = {};

		switch (filter) {
			case "undergraduate":
				sortOptions = { category: "undergraduate" };
				break;
			case "masters":
				sortOptions = { category: "masters" };
				break;
			case "sandwhich":
				sortOptions = { category: "sandwhich" };
				break;
			case "pg":
				sortOptions = { category: "pg" };
				break;
			default:
				break;
		}

		const user = await User.findOne({ clerkId }).populate({
			path: "saved",
			match: query,
			options: {
				sort: sortOptions,
			},
			populate: [
				{ path: "tags", model: Tag, select: "_id name" },
				{ path: "author", model: User, select: " _id clerkId name picture " },
			],
		});

		if (!user) {
			throw new Error("User not found");
		}

		const savedProjects = user.saved;

		return { projects: savedProjects };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserInfo(params: GetUserByIdParams) {
	try {
		connectToDatabase();

		const { userId } = params;

		const user = await User.findOne({ clerkId: userId });

		if (!user) {
			throw new Error("No user found!");
		}

		const totalProjects = await Project.countDocuments({ author: user._id });

		return {
			user,
			totalProjects,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserProjects(params: GetUserStatsParams) {
	try {
		connectToDatabase();

		const { userId, page = 1, pageSize = 10 } = params;

		const totalProjects = await Project.countDocuments({ author: userId });

		const userProjects = await Project.find({ author: userId })
			.sort({ views: -1, upvotes: -1 })
			.populate("tags", "_id name")
			.populate("author", "_id clerkId name picture");

		return {
			totalProjects,
			projects: userProjects,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}
