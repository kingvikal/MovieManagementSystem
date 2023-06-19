import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movies } from "./moviesEntity";
import { Theater } from "./theaterEntity";
import { Reservation } from "./reservationEntity";

@Entity()
export class ShowTime {
  @PrimaryGeneratedColumn()
  showtimeId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  date: Date;

  @OneToOne(() => Movies, (movies) => movies.showtime)
  @JoinColumn()
  movies: Movies;

  @ManyToOne(() => Theater, (theater) => theater.showTime)
  @JoinColumn()
  theater: Theater;

  @OneToMany(() => Reservation, (reservation) => reservation.showTime)
  reservation: Reservation[];
}
