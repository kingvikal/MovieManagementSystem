import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movies } from "./moviesEntity";
import { User } from "./userEntity";
import { ShowTime } from "./showtimeEntity";
import { Ticket } from "./ticketEntity";
import { Payment } from "./paymentEntity";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column()
  reservationDate: number;

  @OneToOne(() => Movies, (movies) => movies.reservation)
  movies: Movies;

  @ManyToOne(() => User, (user) => user.reservation)
  user: User;

  @OneToOne(() => ShowTime, (showtime) => showtime.reservation)
  showTime: ShowTime;

  @ManyToOne(() => Ticket, (ticket) => ticket.reservation)
  ticket: Ticket;

  @OneToOne(() => Payment, (payment) => payment.reservation)
  payment: Payment;
}
