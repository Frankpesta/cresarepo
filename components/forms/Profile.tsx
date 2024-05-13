"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { ProfileSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

interface ProfileProps {
	clerkId: string;
	user: string;
}

const Profile = ({ clerkId, user }: ProfileProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const parsedUser = JSON.parse(user);
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: parsedUser.name || "",
			username: parsedUser.username || "",
			regNo: parsedUser.regNo || "",
			bio: parsedUser.bio || "",
		},
	});

	async function onSubmit(values: z.infer<typeof ProfileSchema>) {
		setIsSubmitting(true);
		try {
			await updateUser({
				clerkId,
				updateData: {
					name: values.name,
					username: values.username,
					bio: values.bio,
					regNo: values.regNo,
				},
				path: pathname,
			});

			router.back();
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-9 flex w-full gap-9 flex-col">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark100_light900">
								Name <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Enter your name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark100_light900">
								Username <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your Username"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="regNo"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark100_light900">
								School Registration Number
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Your Registration Number"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark100_light900">
								Bio <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Textarea
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
									placeholder="Tell us a bit more about you"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-7 flex justify-end">
					<Button
						type="submit"
						className="primary-gradient w-fit"
						disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Profile;
