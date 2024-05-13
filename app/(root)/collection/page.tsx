import ProjectCard from "@/components/cards/ProjectCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { ProjectFilters } from "@/constants/filters";
import { getSavedProjects } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
	const { userId } = auth();

	if (!userId) {
		return null;
	}

	const results = await getSavedProjects({
		clerkId: userId,
		searchQuery: searchParams.q,
		filter: searchParams.filter,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Saved Projects</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchBar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for questions"
					otherClasses="flex-1"
				/>
				<Filter
					filters={ProjectFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<div className="mt-10 flex w-full flex-col gap-6">
				{results.projects.length > 0 ? (
					results.projects.map((project: any) => (
						<ProjectCard
							key={project._id}
							_id={project._id}
							title={project.title}
							tags={project.tags}
							author={project.author}
							upvotes={project.upvotes}
							views={project.views}
							category={project.category}
							createdAt={project.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There is no saved Project to Show"
						desc=" Be the first to break the silence! 🚀 Submit a Project and kickstart the journey."
						btn=" Submit a Project"
						link="/submit-project"
					/>
				)}
			</div>
		</>
	);
};

export default Page;
