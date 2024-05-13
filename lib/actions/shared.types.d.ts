import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateUserParams {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	picture: string;
}

export interface UpdateUserParams {
	clerkId: string;
	updateData: Partial<IUser>;
	path: string;
}

export interface DeleteUserParams {
	clerkId: string;
}

export interface CreateProjectParams {
	title: string;
	content: string;
	path: string;
	category: string;
	author: Schema.Types.ObjectId;
	tags: string[];
	file: {
		file: Buffer;
	};
}

export interface GetProjectsParams {
	page?: number;
	pageSize?: number;
	searchQuery?: string;
	filter?: string;
}

export interface GetProjectByIdParams {
	projectId: string;
}

export interface ViewProjectParams {
	projectId: string;
	userId: string | undefined;
}

export interface ToggleSaveProjectParams {
	userId: string;
	projectId: string;
	path: string;
}

export interface ProjectVoteparams {
	projectId: string;
	userId: string;
	hasupVoted: boolean;
	hasdownVoted: boolean;
	path: string;
}

export interface EditProjectParams {
	projectId: string;
	title: string;
	content: string;
	category: string;
	path: string;
}

export interface GetAllUsersParams {
	page?: number;
	pageSize?: number;
	filter?: string;
	searchQuery?: string; // Add searchQuery parameter
}

export interface GetTopInteractedTagsParams {
	userId: string;
	limit?: number;
}

export interface GetSavedProjectsParams {
	clerkId: string;
	page?: number;
	pageSize?: number;
	filter?: string;
	searchQuery?: string;
}

export interface GetAllTagsParams {
	page?: number;
	pageSize?: number;
	filter?: string;
	searchQuery?: string;
}

export interface GetUserByIdParams {
	userId: string;
}

export interface GetUserStatsParams {
	userId: string;
	page?: number;
	pageSize?: number;
}

export interface DeleteProjectParams {
	projectId: string;
	path: string;
}
