import React from "react";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface ProjectProps {
	_id: string;
	title: string;
	tags: {
		_id: string;
		name: string;
	}[];
	upvotes: string[];
	author: {
		_id: string;
		name: string;
		picture: string;
		clerkId: string;
	};
	views: number;
	category: string;
	// projectFile: File;
	createdAt: Date;
	clerkId?: string | null;
}

const ProjectCard = ({
	_id,
	title,
	tags,
	author,
	upvotes,
	views,
	createdAt,
	clerkId,
	category,
}: ProjectProps) => {
	const showActionButtons = clerkId && clerkId === author.clerkId;
	return (
		<div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
			<div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
				<div>
					<span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
						{getTimestamp(createdAt)}
					</span>
					<Link href={`/project/${_id}`}>
						<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
							{title}
						</h3>
					</Link>
				</div>

				<SignedIn>
					{showActionButtons && (
						<EditDeleteAction type="Project" itemId={JSON.stringify(_id)} />
					)}
				</SignedIn>
			</div>

			<div className="mt-3.5 flex flex-wrap gap-2">
				{tags.map((tag) => (
					<RenderTag key={tag._id} _id={tag._id} name={tag.name} />
				))}
			</div>

			<div className="flex-between mt-6 w-full flex-wrap gap-3">
				<Metric
					imgUrl={author.picture}
					alt="User"
					value={author.name}
					title={` - submitted ${getTimestamp(createdAt)}`}
					href={`/profile/${author._id}`}
					textStyles="body-medium text-dark400_light700"
				/>

				<Metric
					imgUrl="/assets/icons/like.svg"
					alt="upvotes"
					value={formatAndDivideNumber(upvotes.length)}
					title="Votes"
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/eye.svg"
					alt="eye"
					value={formatAndDivideNumber(views)}
					title="Views"
					textStyles="small-medium text-dark400_light800"
				/>

				<h2 className="text-dark300_light700 small-medium">
					Category: <span className="text-[#FF610F]">{category}</span>
				</h2>
			</div>
		</div>
	);
};

export default ProjectCard;
