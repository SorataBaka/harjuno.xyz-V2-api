import express, { Request, Response } from "express";
import "dotenv/config";
import consola from "consola";
import morgan from "morgan";
import compression from "compression";
import serveFavicon from "serve-favicon";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import mongoose from "mongoose";

import versionRouter from "./src/versionRouter";

const PORT = parseInt(process.env.PORT as string, 10) || 3000;
const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(serveFavicon(`${__dirname}/../favicon.ico`));
app.use(bodyParser.json());
app.use(versionRouter);
app.get("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "harjuno.xyz website api version 1.0.0",
		data: {},
	});
});

app.listen(PORT, async () => {
	consola.info(`Server started on port ${PORT}`);
	const mongooseConnection = await mongoose.connect(MONGO_URI).catch(() => {
		return undefined;
	});
	if (!mongooseConnection) throw new Error("Mongoose connection failed");
	const newID = nanoid();
	consola.info(`New ID: ${newID}`);
});
