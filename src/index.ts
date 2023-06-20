import bodyParser from "body-parser";
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { AppDataSource } from "./services/AppDataSource";
import userRoute from "./route/userRoute";
import movieRoute from "./route/moviesRoute";
import categoryRoute from "./route/categoryRoute";
import wishlistRoute from "./route/wishlistRoute";
import reservationRoute from "./route/reservationRoute";
dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/movie", movieRoute);
app.use("/wishlist", wishlistRoute);
app.use("/reservation", reservationRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await AppDataSource.initialize()
    .then(async () => {
      console.log("DB connected");
    })
    .catch((e) => console.log("Error connecting database", e));

  console.log(`Server running on ${process.env.PORT}`);
});
