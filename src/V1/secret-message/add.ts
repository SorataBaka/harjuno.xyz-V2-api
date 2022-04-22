import { Request, Response } from "express";
export default async (req: Request, res: Response) => {
	const messageBody = req.body;
	const message = messageBody.message;

	if (
		!message ||
		message === "" ||
		message === null ||
		message === undefined ||
		typeof message !== "string"
	) {
		return res.status(400).json({
			status: 400,
			message: "Bad Request",
			data: {
				message: "message is required",
			},
		});
	}

	const writeMessage = await res.locals.v1.schemas.secretMessageSchema.create({
		message,
		createdAt: new Date().getTime(),
	});

	if (!writeMessage) {
		return res.status(500).json({
			status: 500,
			message: "failed to write message",
			data: {},
		});
	}

	return res.status(200).json({
		status: 200,
		message: "success",
		data: { writeMessage },
	});
};
