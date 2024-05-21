import React from "react";
import Metric from "@/components/shared/Metric";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getProjectById } from "@/lib/actions/project.actions";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ParseHTML from "@/components/shared/ParseHTML";
import DownloadButton from "@/components/shared/DownloadButton";

const Page = async ({ params, searchParams }: any) => {
	const result = await getProjectById({ projectId: params.id });

	const { userId: clerkId } = auth();

	let mongoUser;
	if (clerkId) {
		mongoUser = await getUserById({
			userId: clerkId,
		});
	}

	return (
		<>
			<div className="flex flex-start w-full flex-col">
				<div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
					<Link
						href={`/profile/${result?.author?.clerkId}`}
						className="flex items-center justify-start gap-1">
						<Image
							src={result.author.picture}
							className="rounded-full"
							width={22}
							height={22}
							alt="profile"
						/>
						<p className="paragraph-semibold text-dark300_light700">
							{result.author.name}
						</p>
					</Link>

					<div className="flex justify-end">
						<Votes
							itemId={JSON.stringify(result._id)}
							userId={JSON.stringify(mongoUser?._id)}
							upvotes={result?.upvotes?.length}
							hasupVoted={result?.upvotes?.includes(mongoUser?._id)}
							downvotes={result?.downvotes?.length}
							hasdownVoted={result?.downvotes?.includes(mongoUser?._id)}
							hasSaved={mongoUser?.saved?.includes(result._id)}
						/>
					</div>
				</div>
				<h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
					{result.title}
				</h2>
			</div>

			<div className="mb-8 mt-5 flex flex-wrap gap-4">
				<Metric
					imgUrl="/assets/icons/clock.svg"
					alt="clock"
					value={` submitted ${getTimestamp(result.createdAt)}`}
					title="Submitted"
					textStyles="small-medium text-dark400_light800"
				/>

				<Metric
					imgUrl="/assets/icons/eye.svg"
					alt="eye"
					value={formatAndDivideNumber(result.views)}
					title="Views"
					textStyles="small-medium text-dark400_light800"
				/>

				<div>
					<h2 className="text-dark300_light700 small-medium">
						Category: <span className="text-[#FF610F]">{result?.category}</span>
					</h2>
				</div>
			</div>

			<ParseHTML data={result.content} />

			<div className="mt-8 flex flex-wrap gap-2">
				{result.tags.map((tag: any) => (
					<RenderTag
						key={tag._id}
						_id={tag._id}
						name={tag.name}
						showCount={false}
					/>
				))}
			</div>

			<DownloadButton file={result?.file} />
		</>
	);
};

export default Page;
