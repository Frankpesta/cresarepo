"use client";

import React, { useEffect, useState } from "react";
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

	const query = searchParams.get("q");

	const [search, setSearch] = useState(query || "");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "q",
					value: search,
				});

				router.push(newUrl, {
					scroll: false,
				});
			} else {
				if (pathname === route) {
					const newUrl = removeKeysFromQuery({
						params: searchParams.toString(),
						keysToRemove: ["q"],
					});

					router.push(newUrl, { scroll: false });
				}
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [search, route, router, searchParams, query, pathname]);

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
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
				/>
			</div>
		</div>
	);
};

export default LocalSearchBar;
