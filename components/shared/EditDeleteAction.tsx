"use client";

import { deleteProject } from "@/lib/actions/project.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
	type: string;
	itemId: string;
}

const EditDeleteAction = ({ itemId, type }: Props) => {
	const pathname = usePathname();
	const router = useRouter();

	const handleEdit = () => {
		router.push(`/project/edit/${JSON.parse(itemId)}`);
	};

	const handleDelete = async () => {
		await deleteProject({ projectId: JSON.parse(itemId), path: pathname });
	};

	return (
		<div className="flex items-center justify-end gap-3 max-sm:w-full">
			{type === "Project" && (
				<Image
					src="/assets/icons/edit.svg"
					alt="Edit"
					width={14}
					height={14}
					className="cursor-pointer object-contain"
					onClick={handleEdit}
				/>
			)}

			<Image
				src="/assets/icons/trash.svg"
				alt="Delete"
				width={14}
				height={14}
				className="cursor-pointer object-contain"
				onClick={handleDelete}
			/>
		</div>
	);
};

export default EditDeleteAction;
