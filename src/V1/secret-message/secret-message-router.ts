import express, { Request, Response, NextFunction } from "express";
import add from "./add";
import delete_ from "./delete";
import list from "./list";
import "dotenv/config";

const clientSecret = (process.env.SECRET as string) || "secret";

const moduleRouter = express.Router();

const ignoreAuthentication = ["/", "/list"];

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	if (ignoreAuthentication.indexOf(req.path) !== -1) return next();
	const header = req.headers;
	if (!header.authorization) {
		return res.status(401).json({
			status: 401,
			message: "Unauthorized",
			data: {},
		});
	}
	const type = header.authorization.split(" ")[0];
	const token = header.authorization.split(" ")[1];
	if (token !== clientSecret || type !== "Token") {
		return res.status(401).json({
			status: 401,
			message: "Unauthorized",
			data: {},
		});
	}
	return next();
};
moduleRouter.get("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "secret-mesage router",
		data: {
			functions: ["POST /add", "DELETE /delete", "GET /list"],
		},
	});
});
moduleRouter.use(authenticate);
moduleRouter.get("/list", list);
moduleRouter.post("/add", add);
moduleRouter.delete("/delete", delete_);

export default moduleRouter;
