"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface CustomInputProps {
	route: string;
	iconPosition: string;
	placeholder: string;
	imgSrc: string;
	otherClasses?: string;
}

const LocalSearchBar = ({
	route,
	iconPosition,
	imgSrc,
	placeholder,
	otherClasses,
}: CustomInputProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	return (
		<div className="relative w-full max-w-[600px]">
			<div
				className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
				{iconPosition === "left" && (
					<Image
						src={imgSrc}
						alt="Search"
						width={24}
						height={24}
						className="cursor-pointer"
					/>
				)}

				<Input
					type="text"
					placeholder={placeholder}
					onChange={() => {}}
					className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
				/>
			</div>
		</div>
	);
};

export default LocalSearchBar;
