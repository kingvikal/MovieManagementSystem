import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";
import { Movies } from "./moviesEntity";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  wishlistId: string;

  @ManyToOne(() => User, (user) => user.wishlist)
  user: User;

  @OneToMany(() => Movies, (movies) => movies.wishList)
  movies: Movies[];
}
