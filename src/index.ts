import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const mongoDbUri = process.env.MONGO_URI;
mongoose.Promise = Promise;
mongoose.connect(mongoDbUri).then(() => console.log("connected"));
mongoose.connection.on("error", (error: Error) => console.log(error));

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080/");
});
