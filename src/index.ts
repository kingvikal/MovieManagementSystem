import bodyParser from "body-parser";
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnect } from "./database/dbConnect";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

const PORT = process.env.PORT || 5555;

dbConnect();
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
