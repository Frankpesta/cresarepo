import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhook",
		"/project/:id",
		"/tags",
		"/tags/:id",
		"/profile/:id",
		"/community",
	],
	ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
