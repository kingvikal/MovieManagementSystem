import {
  Column,
  Entity,
  JoinColumn,
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
  reservationDate: Date;

  @OneToOne(() => Movies, (movies) => movies.reservation)
  @JoinColumn()
  movies: Movies;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn()
  user: User;

  @OneToOne(() => ShowTime, (showtime) => showtime.reservation)
  @JoinColumn()
  showTime: ShowTime;

  @ManyToOne(() => Ticket, (ticket) => ticket.reservation)
  ticket: Ticket;

  @OneToOne(() => Payment, (payment) => payment.reservation)
  payment: Payment;
}
