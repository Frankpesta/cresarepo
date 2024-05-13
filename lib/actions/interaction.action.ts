"use server";

import Project from "@/database/project.model";
import { connectToDatabase } from "../mongoose";
import { ViewProjectParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewProject(params: ViewProjectParams) {
	try {
		connectToDatabase();

		const { projectId, userId } = params;

		// update view count for each project

		await Project.findByIdAndUpdate(projectId, { $inc: { views: 1 } });

		if (userId) {
			const existingInteraction = await Interaction.findOne({
				user: userId,
				action: "view",
				project: projectId,
			});

			if (existingInteraction) {
				return console.log("User has already viewed");
			}

			// create interaction

			await Interaction.create({
				user: userId,
				action: "view",
				project: projectId,
			});
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}
