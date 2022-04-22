import { Request, Response } from "express";
export default async (_req: Request, res: Response) => {
	const messageList = await res.locals.v1.schemas.secretMessageSchema.find({});
	return res.status(200).json({
		status: 200,
		message: "success",
		data: { messages: messageList },
	});
};
