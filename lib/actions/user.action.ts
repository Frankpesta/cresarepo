"use server";

import User from "@/database/user.model";
import { connetToDatabase } from "../mongoose";
import { CreateUserParams } from "./shared.types";

export async function createUser(userData: CreateUserParams) {
	try {
		connetToDatabase();
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
		connetToDatabase();

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
