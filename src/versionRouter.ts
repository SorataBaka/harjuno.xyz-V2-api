import express from "express";
import v1Router from "./V1/apirouter";
const versionRouter = express.Router();
versionRouter.use("/v1", v1Router);
export default versionRouter;
