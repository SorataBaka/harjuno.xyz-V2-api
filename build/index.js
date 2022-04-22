"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const consola_1 = __importDefault(require("consola"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const body_parser_1 = __importDefault(require("body-parser"));
const nanoid_1 = require("nanoid");
const mongoose_1 = __importDefault(require("mongoose"));
const versionRouter_1 = __importDefault(require("./src/versionRouter"));
const PORT = parseInt(process.env.PORT, 10) || 3000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI)
    throw new Error("MONGO_URI is not defined");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, compression_1.default)());
app.use((0, serve_favicon_1.default)(`${__dirname}/../favicon.ico`));
app.use(body_parser_1.default.json());
app.use(versionRouter_1.default);
app.get("/", (_req, res) => {
    return res.status(200).json({
        status: 200,
        message: "harjuno.xyz website api version 1.0.0",
        data: {},
    });
});
app.listen(PORT, async () => {
    consola_1.default.info(`Server started on port ${PORT}`);
    const mongooseConnection = await mongoose_1.default.connect(MONGO_URI).catch(() => {
        return undefined;
    });
    if (!mongooseConnection)
        throw new Error("Mongoose connection failed");
    const newID = (0, nanoid_1.nanoid)();
    consola_1.default.info(`New ID: ${newID}`);
});
