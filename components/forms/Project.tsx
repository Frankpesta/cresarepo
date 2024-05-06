"use client";

import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Editor } from "@tinymce/tinymce-react";
import { ProjectFilters } from "@/constants/filters";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useRouter, usePathname } from "next/navigation";
import { ProjectsSchema } from "@/lib/validations";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

const Project = () => {
	const editorRef = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	let type = "";

	const form = useForm<z.infer<typeof ProjectsSchema>>({
		resolver: zodResolver(ProjectsSchema),
		defaultValues: {
			title: "",
			explanation: "",
			tags: [],
			file: "",
		},
	});

	async function onSubmit(values: z.infer<typeof ProjectsSchema>) {}

	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: any
	) => {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();

			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim();

			if (tagValue !== "") {
				if (tagValue.length > 15) {
					return form.setError("tags", {
						type: "required",
						message: "Tag must be less than 15 characters.",
					});
				}

				if (!field.value.includes(tagValue as never)) {
					form.setValue("tags", [...field.value, tagValue]);
					tagInput.value = "";
					form.clearErrors("tags");
				}
			} else {
				form.trigger();
			}
		}
	};

	const handleTagRemove = (tag: string, field: any) => {
		const newTags = field.value.filter((t: string) => t !== tag);

		form.setValue("tags", newTags);
	};

	const { mode } = useTheme();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-10">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Project Title
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
									{...field}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Write the title of your project as approved by the project
								coordinator.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="explanation"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Write the abstract of your work here.{" "}
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Editor
									apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
									onInit={(evt, editor) =>
										// @ts-ignore
										(editorRef.current = editor)
									}
									initialValue={""}
									onBlur={field.onBlur}
									onEditorChange={(content) => field.onChange(content)}
									init={{
										height: 500,
										menubar: false,
										plugins:
											"advlist autolink lists link image charmap preview anchor searchreplace visualblocks codesample fullscreen insertdatetime media table",
										toolbar:
											"undo redo | codesample | bold italic forecolor | alignleft aligncenter | alignright alignjustify | bullist numlist",
										content_style: "body { font-family:Inter; font-size:16px }",
										skin: mode === "dark" ? "oxide-dark" : "oxide",
										content_css: mode === "dark" ? "dark" : "light",
										codesample_languages: [
											{ text: "JavaScript", value: "javascript" },
											{ text: "HTML/XML", value: "markup" },
											{ text: "CSS", value: "css" },
											{ text: "PHP", value: "php" },
											{ text: "Ruby", value: "ruby" },
											{ text: "Python", value: "python" },
											{ text: "Java", value: "java" },
											{ text: "C", value: "c" },
											{ text: "C++", value: "cpp" },
											{ text: "C#", value: "csharp" },
											// Add more language objects as needed
										],
										codesample_default_language: "javascript",
									}}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Introduce the problem and expand on what you put in the title
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Tags <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<>
									<Input
										className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
										placeholder="Add tags..."
										onKeyDown={(e) => {
											handleInputKeyDown(e, field);
										}}
										// disabled={type === "Edit"}
									/>
									{field.value.length > 0 && (
										<div className="flex-start mt-2.5 gap-2.5">
											{field.value.map((tag: any) => (
												<Badge
													className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
													key={tag}
													onClick={() => handleTagRemove(tag, field)}>
													{tag}

													<Image
														src="/assets/icons/close.svg"
														alt="Close Icon"
														width={12}
														height={12}
														className="cursor-pointer object-contain invert-0 dark:invert"
													/>
												</Badge>
											))}
										</div>
									)}
								</>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Add up to three tags to describe what your problem is all about
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Select Project Category
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Select>
									<SelectTrigger
										className={`body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
										<div className="line-clamp-1 flex-1 text-left">
											<SelectValue {...field} />
										</div>
									</SelectTrigger>
									<SelectContent className="background-light800_dark300 text-dark500_light700">
										<SelectGroup>
											{ProjectFilters.map((filter) => (
												<SelectItem key={filter.value} value={filter.value}>
													{filter.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Select the appropriate category for your project.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Project File
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									type="file"
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
									{...field}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Upload the completed and approved version of your project. Only
								.docx and .pdf file types are accepted.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="primary-gradient w-fit !text-light900"
					disabled={isSubmitting}>
					{isSubmitting ? (
						<>{type === "Edit" ? "Editing..." : "Posting..."}</>
					) : (
						<>{type === "Edit" ? "Edit Question" : "Submit your Project"}</>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default Project;
