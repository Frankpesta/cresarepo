"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import download from "downloadjs";

interface Props {
	file: {
		data: any;
	};
}

const DownloadButton = ({ file }: Props) => {
	const [downloading, setDownloading] = useState(false);
	console.log(typeof file.data);
	console.log(file.data.constructor.name);

	const handleDownloadProject = () => {
		try {
			setDownloading(true);
			const fileData = file.data;
			const fileType =
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document";
			const fileName = "projectwork.docx";

			if (typeof fileData === "object" && fileData !== null) {
				const jsonData = JSON.stringify(fileData);
				const bytes = new TextEncoder().encode(jsonData);
				const blob = new Blob([bytes], { type: fileType });
				download(blob, fileName, fileType);
			} else {
				console.error("File data is not in a supported format.");
			}
		} catch (error) {
			console.log(error);
			setDownloading(false);
		} finally {
			setDownloading(false);
		}
	};
	return (
		<Button
			className="primary-gradient w-fit !text-light900 mt-4"
			onClick={handleDownloadProject}>
			{downloading ? "Downloading..." : "Download Project Work"}
		</Button>
	);
};

export default DownloadButton;
