import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movies } from "./moviesEntity";
import { ShowTime } from "./showtimeEntity";

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  theaterId: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  capacity: number;

  @ManyToMany(() => Movies, (movies) => movies.theater)
  movies: Movies[];

  @OneToMany(()=> ShowTime, (showtime) => showtime.theater)
  showTime: ShowTime[]
}
