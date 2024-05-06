"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
	type: string;
	itemId: string;
}

const EditDeleteAction = ({ itemId, type }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	return (
		<div className="flex items-center justify-end gap-3 max-sm:w-full">
			{type === "Project" && (
				<Image
					src="/assets/icons/edit.svg"
					alt="Edit"
					width={14}
					height={14}
					className="cursor-pointer object-contain"
				/>
			)}

			<Image
				src="/assets/icons/trash.svg"
				alt="Delete"
				width={14}
				height={14}
				className="cursor-pointer object-contain"
			/>
		</div>
	);
};

export default EditDeleteAction;
