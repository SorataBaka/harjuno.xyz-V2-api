import { Request, Response } from "express";
export default async (req: Request, res: Response) => {
	const body = req.body;
	const messageID = body.messageID;
	if (
		!messageID ||
		messageID === "" ||
		messageID === null ||
		messageID === undefined ||
		typeof messageID !== "string"
	) {
		return res.status(400).json({
			status: 400,
			message: "Bad Request",
			data: {
				message: "messageID is required",
			},
		});
	}
	const deleteMessage =
		await res.locals.v1.schemas.secretMessageSchema.findByIdAndDelete(
			messageID
		);
	if (!deleteMessage) {
		return res.status(500).json({
			status: 500,
			message: "failed to delete message",
			data: {},
		});
	}

	return res.status(200).json({
		status: 200,
		message: "success",
		data: {
			message: "message deleted",
			deleteMessage,
		},
	});
};
