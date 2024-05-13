import { z } from "zod";

export const ProjectsSchema = z.object({
	title: z.string().min(10).max(200),
	explanation: z.string().min(100),
	tags: z.array(z.string().min(1).max(15)).min(1).max(3),
	file: z.any(),
	category: z.string(),
});

export const ProfileSchema = z.object({
	name: z.string().min(5).max(150),
	username: z.string().min(5).max(150),
	bio: z.string().min(5).max(150),
	regNo: z.string(),
});
