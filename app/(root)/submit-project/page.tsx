import React from "react";
import Project from "@/components/forms/Project";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = () => {
	const { userId } = auth();

	if (!userId) redirect("/sign-in");
	return (
		<div>
			<h1 className="h1-bold text-dark100_light900">Submit a Project</h1>
			<div className="mt-9">
				<Project />
			</div>
		</div>
	);
};

export default Page;
