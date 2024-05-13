import { getUserProjects } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import ProjectCard from "../cards/ProjectCard";

interface Props extends SearchParamsProps {
	userId: string;
	clerkId?: string | null;
}

const ProjectTab = async ({ searchParams, userId, clerkId }: Props) => {
	const result = await getUserProjects({
		userId,
		page: 1,
	});
	return (
		<>
			{result.projects.map((item) => (
				<ProjectCard
					key={item._id}
					_id={item._id}
					clerkId={clerkId}
					title={item.title}
					tags={item.tags}
					author={item.author}
					upvotes={item.upvotes}
					views={item.views}
					category={item.category}
					createdAt={item.createdAt}
				/>
			))}
		</>
	);
};

export default ProjectTab;
