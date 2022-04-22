import express, { Request, Response } from "express";

const apiRouter = express.Router();

apiRouter.get("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "v1",
		data: {},
	});
});

export default apiRouter;
