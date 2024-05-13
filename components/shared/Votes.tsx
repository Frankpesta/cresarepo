"use client";

import { viewProject } from "@/lib/actions/interaction.action";
import { downvoteProject, upvoteProject } from "@/lib/actions/project.actions";
import { toggleSaveProject } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
	itemId: string;
	userId: string;
	upvotes: number;
	downvotes: number;
	hasdownVoted: boolean;
	hasupVoted: boolean;
	hasSaved?: boolean;
}

const Votes = ({
	itemId,
	userId,
	upvotes,
	hasupVoted,
	downvotes,
	hasdownVoted,
	hasSaved,
}: Props) => {
	const pathname = usePathname();
	const router = useRouter();

	const handleSave = async () => {
		await toggleSaveProject({
			projectId: JSON.parse(itemId),
			userId: JSON.parse(userId),
			path: pathname,
		});
	};

	const handleVote = async (action: string) => {
		if (!userId) {
			return;
		}

		if (action === "upvote") {
			await upvoteProject({
				projectId: JSON.parse(itemId),
				userId: JSON.parse(userId),
				hasdownVoted,
				hasupVoted,
				path: pathname,
			});
		}

		if (action === "downvote") {
			await downvoteProject({
				projectId: JSON.parse(itemId),
				userId: JSON.parse(userId),
				hasdownVoted,
				hasupVoted,
				path: pathname,
			});
		}
	};

	useEffect(() => {
		viewProject({
			userId: userId ? JSON.parse(userId) : undefined,
			projectId: JSON.parse(itemId),
		});
	}, [itemId, userId, pathname, router]);

	return (
		<div className="flex gap-5">
			<div className="flex-center gap-2.5">
				<div className="flex-center gap-1.5">
					<Image
						src={
							hasupVoted
								? "/assets/icons/upvoted.svg"
								: "/assets/icons/upvote.svg"
						}
						alt="upvote"
						width={18}
						height={18}
						className="cursor-pointer"
						onClick={() => handleVote("upvote")}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatAndDivideNumber(upvotes)}
						</p>
					</div>
				</div>
				<div className="flex-center gap-1.5">
					<Image
						src={
							hasdownVoted
								? "/assets/icons/downvoted.svg"
								: "/assets/icons/downvote.svg"
						}
						alt="upvote"
						className="cursor-pointer"
						width={18}
						height={18}
						onClick={() => handleVote("downvote")}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{" "}
							{formatAndDivideNumber(downvotes)}
						</p>
					</div>
				</div>
			</div>
			<Image
				src={
					hasSaved
						? "/assets/icons/star-filled.svg"
						: "/assets/icons/star-red.svg"
				}
				alt="star"
				className="cursor-pointer"
				width={18}
				height={18}
				onClick={() => handleSave()}
			/>
		</div>
	);
};

export default Votes;
