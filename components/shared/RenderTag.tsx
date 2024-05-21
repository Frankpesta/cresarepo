import React from "react";
import { Badge } from "../ui/badge";

interface Props {
	_id: string;
	name: string;
	totalProjects?: number;
	showCount?: boolean;
}

const RenderTag = ({ _id, name, totalProjects, showCount }: Props) => {
	return (
		<article className="flex justify-between gap-2">
			<Badge className="subtle-medium bg-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
				{name}
			</Badge>

			{showCount && (
				<p className="small-medium text-dark500_light700">{totalProjects}</p>
			)}
		</article>
	);
};

export default RenderTag;
