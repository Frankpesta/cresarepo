import React from "react";
import Project from "@/components/forms/Project";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const Page = async () => {
	const { userId } = auth();

	if (!userId) redirect("/sign-in");

	const mongoUser = await getUserById({ userId });
	return (
		<div>
			<h1 className="h1-bold text-dark100_light900">Submit a Project</h1>
			<div className="mt-9">
				<Project mongoUserId={JSON.stringify(mongoUser?._id)} />
			</div>
		</div>
	);
};

export default Page;
