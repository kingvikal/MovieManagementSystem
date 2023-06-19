import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../model/userEntity";
import { Movies } from "../model/moviesEntity";
import { Category } from "../model/categoryEntity";
import { Payment } from "../model/paymentEntity";
import { Ticket } from "../model/ticketEntity";
import { ShowTime } from "../model/showtimeEntity";
import { Theater } from "../model/theaterEntity";
import { Wishlist } from "../model/wishlistEntity";
import { Reservation } from "../model/reservationEntity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [
    User,
    Movies,
    Category,
    Payment,
    Ticket,
    ShowTime,
    Theater,
    Wishlist,
    Reservation,
  ],
});
