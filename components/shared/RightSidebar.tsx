import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";
import { getHotPtojects } from "@/lib/actions/project.actions";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
	const hotProjects = await getHotPtojects();
	const popularTags = await getTopPopularTags();
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
				<h3 className="h3-bold text-dark200_light900">Popular Keywords</h3>
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
