import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
	mongoose.set("strictQuery", true);

	if (!process.env.MONGODB_URL) return console.log("Missing Mongodb url");

	if (isConnected) {
		return console.log("MongoDb is already connected");
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, { dbName: "cresarepo" });

		isConnected = true;
		console.log("Mongodb is connected");
	} catch (error) {
		console.log(error);
	}
};
