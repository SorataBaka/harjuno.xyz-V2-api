import { Request, Response } from "express";
export default async (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "success",
		data: {},
	});
};
