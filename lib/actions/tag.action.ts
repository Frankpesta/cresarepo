import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase();

		const { userId } = params;
		const user = await User.findById(userId);

		if (!user) throw new Error("User not found");

		// Find ineractions for the user and group by tags
		// create a new model called interaction

		return [
			{ _id: "1", name: "tag1" },
			{ _id: "2", name: "tag2" },
		];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase();

		const { searchQuery, filter } = params;

		const query: FilterQuery<typeof Tag> = {};

		if (searchQuery) {
			query.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
		}

		let sortOptions = {};

		switch (filter) {
			case "popular":
				sortOptions = { questions: -1 };
				break;
			case "recent":
				sortOptions = { createdAt: -1 };
				break;
			case "name":
				sortOptions = { name: 1 };
				break;
			case "old":
				sortOptions = { createdAt: 1 };
				break;
			default:
				break;
		}

		const tags = await Tag.find(query).sort(sortOptions);

		return { tags };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getTopPopularTags() {
	try {
		connectToDatabase();

		const popularTags = await Tag.aggregate([
			{ $project: { name: 1, numberOfProjects: { $size: "$projects" } } },
			{ $sort: { numberOfProjects: -1 } },
			{ $limit: 5 },
		]);

		return popularTags;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
