import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { HomePageFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/Home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import ProjectCard from "@/components/cards/ProjectCard";

const projects = [
	{
		_id: "1",
		title:
			"Development of a Web Based Project Repository for the Department of Computer and Robotics Education, University of Nigeria Nsukka",
		tags: [
			{
				_id: "1",
				name: "Development",
			},
			{
				_id: "2",
				name: "Web-based",
			},
		],
		author: {
			_id: "1",
			name: "Enunwa Franklin",
			picture: "https://source.unsplash.com/random",
			clerkId: "asdfghjkl",
		},
		upvotes: ["Hello", "Hi", "Holla"],
		views: 10,
		createdAt: new Date(),
	},
	{
		_id: "2",
		title:
			"Development of a Web Based Project Repository for the Department of Computer and Robotics Education, University of Nigeria Nsukka",
		tags: [
			{
				_id: "1",
				name: "Development",
			},
			{
				_id: "2",
				name: "Web-based",
			},
		],
		author: {
			_id: "1",
			name: "Enunwa Franklin",
			picture: "https://source.unsplash.com/random",
			clerkId: "asdfghjkl",
		},
		upvotes: ["Hello", "Hi", "Holla"],
		views: 10,
		createdAt: new Date(),
	},
];

const Home = () => {
	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Projects</h1>
				<Link href="/submit-project" className="flex justify-end max-sm:w-full">
					<Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
						Submit a Project
					</Button>
				</Link>
			</div>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchBar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for projects"
					otherClasses="flex-1"
				/>
				<Filter
					filters={HomePageFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					containerClasses="hidden max-md:flex"
				/>
			</div>
			<HomeFilters />

			<div className="mt-10 flex w-full flex-col gap-6">
				{projects.length > 0 ? (
					projects.map((project) => (
						<ProjectCard
							key={project._id}
							_id={project._id}
							title={project.title}
							tags={project.tags}
							author={project.author}
							upvotes={project.upvotes}
							views={project.views}
							createdAt={project.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There is no Project work to show"
						desc="Be the first to make the move. Submit a project to kickstart the journey!"
						btn="Submit a Project"
						link="/submit a project"
					/>
				)}
			</div>
		</>
	);
};

export default Home;
