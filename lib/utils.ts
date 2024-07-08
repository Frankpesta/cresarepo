import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
	const date = new Date(createdAt);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};

export const formatAndDivideNumber = (num: number): string => {
	if (num >= 1000000) {
		const formattedNum = (num / 1000000).toFixed(1);
		return `${formattedNum}M`;
	} else if (num >= 1000) {
		const formattedNum = (num / 1000).toFixed(1);
		return `${formattedNum}K`;
	} else {
		return num?.toString();
	}
};

export const getJoinedDate = (date: Date): string => {
	// Check if date is an instance of Date
	if (date instanceof Date) {
		// Get the month (0-11) and add 1 to it to get the actual month (1-12)
		const month: number = date.getMonth() + 1;
		// Get the full year (4 digits)
		const year: number = date.getFullYear();
		// Join the month and year with a separator
		const joined: string = `${month}/${year}`;
		return joined;
	} else {
		// Handle the case when date is not a Date object
		console.error("Invalid date object");
		return "";
	}
};

interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

interface RemoveKeysParams {
	params: string;
	keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
};

export const removeKeysFromQuery = ({
	params,
	keysToRemove,
}: RemoveKeysParams) => {
	const currentUrl = qs.parse(params);
	keysToRemove.forEach((key) => {
		delete currentUrl[key];
	});
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
};
