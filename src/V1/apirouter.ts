import express, { Request, Response } from "express";
import secret_message from "./secret-message/secret-message-router";

const apiRouter = express.Router();

apiRouter.use("/secret-message", secret_message);
apiRouter.get("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "v1",
		data: {
			functions: ["/secret-message"],
		},
	});
});

export default apiRouter;
