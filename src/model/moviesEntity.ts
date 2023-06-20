import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./categoryEntity";
import { Wishlist } from "./wishlistEntity";
import { Theater } from "./theaterEntity";
import { ShowTime } from "./showtimeEntity";
import { Reservation } from "./reservationEntity";

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  moviesId: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  duration: string;

  @Column()
  rating: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.movies)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.movies, {})
  wishList: Wishlist;

  @ManyToMany(() => Theater, (theater) => theater.movies)
  theater: Theater[];

  @OneToMany(() => ShowTime, (showtime) => showtime.movies)
  showtime: ShowTime[];

  @OneToOne(() => Reservation, (reservation) => reservation.movies)
  reservation: Reservation;
}
