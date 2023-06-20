import { Request, Response } from "express";
import { AppDataSource } from "../services/AppDataSource";
import { Movies } from "../model/moviesEntity";
import { User } from "../model/userEntity";
import { ShowTime } from "../model/showtimeEntity";
import { Ticket } from "../model/ticketEntity";
import { Payment } from "../model/paymentEntity";

const moviesRepo = AppDataSource.getRepository(Movies);
const userRepo = AppDataSource.getRepository(User);
const showTimeRepo = AppDataSource.getRepository(ShowTime);
const ticketRepo = AppDataSource.getRepository(Ticket);
const paymentRepo = AppDataSource.getRepository(Payment);

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { reservationDate } = req.body;
  } catch (err) {
    console.log("error in createReservation", err);
    return res.status(500).json(err);
  }
};
