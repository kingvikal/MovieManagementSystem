import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movies } from "./moviesEntity";

enum CategoryType {
  DOCUMENTARY = "documentary",
  SCIENCEFICTION = "sciencefiction",
  EMOTIONAL = "emotional",
  ACTION = "action",
  DRAMA = "drama",
  FICTIONAL = "fictional",
  COMEDY = "comedy",
  HORROR = "horror",
  ROMANCE = "romance",
  MYSTERY = "mystery",
  ALL = "all",
  MYTHICAL = "mythical"
}
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: string;

  @Column({ type: "enum", enum: CategoryType, default: CategoryType.ALL })
  name: CategoryType;

  @Column()
  description: string;

  @OneToMany(() => Movies, (movies) => movies.category)
  movies: Movies[];
}
