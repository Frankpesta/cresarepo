import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";

const hotProjects = [
	{
		_id: 1,
		title:
			"Development of a Web Based Project Repository for the Department of Computer and Robotics Education, University of Nigeria Nsukka",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis minima nobis facere suscipit tenetur magnam molestias voluptatem. Asperiores distinctio quas eum nobis aliquam dolores, laudantium soluta. Doloribus dolorem quod tempore!",
		file: "hello",
	},
];

const popularTags = [
	{
		_id: "1",
		name: "IoT",
		numberOfProjects: 10,
	},
	{
		_id: "2",
		name: "Education",
		numberOfProjects: 10,
	},
	{
		_id: "3",
		name: "Data Science",
		numberOfProjects: 10,
	},
];

const RightSidebar = () => {
	return (
		<section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overscroll-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
			<div>
				<h3 className="h3-bold text-dark300_light900">Top Projects</h3>
				<div className="mt-7 flex w-full flex-col gap-[30px]">
					{hotProjects.map((project) => (
						<Link
							href={`/project/${project._id}`}
							key={project._id}
							className="flex cursor-pointer items-center justify-between gap-7">
							<p className="body-medium text-dark500_light700">
								{project.title}
							</p>
							<Image
								src={"/assets/icons/chevron-right.svg"}
								alt="chevron"
								width={20}
								height={20}
								className="invert-colors"
							/>
						</Link>
					))}
				</div>
			</div>

			<div className="mt-16">
				<h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
				<div className="mt-7 flex flex-col gap-4">
					{popularTags.map((tag) => (
						<RenderTag
							key={tag._id}
							_id={tag._id}
							name={tag.name}
							totalProjects={tag.numberOfProjects}
							showCount
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default RightSidebar;
