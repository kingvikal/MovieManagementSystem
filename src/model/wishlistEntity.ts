import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";
import { Movies } from "./moviesEntity";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  wishlistId: string;

  @ManyToOne(() => User, (user) => user.wishlist)
  user: User;

  @OneToOne(() => Movies, (movies) => movies.wishList)
  movies: Movies;
}
