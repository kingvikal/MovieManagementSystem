import { AppDataSource } from "../services/AppDataSource";

export const dbConnect = () =>
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Problem with the database");
    });
