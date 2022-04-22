import mongoose from "mongoose";

const secretMessageSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("SecretMessage", secretMessageSchema);
