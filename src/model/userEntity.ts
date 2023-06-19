import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Wishlist } from "./wishlistEntity";
import { Reservation } from "./reservationEntity";

enum UserType {
  ADMIN = "admin",
  USER = "user",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column({ length: 30 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 30 })
  address: string;

  @Column({ nullable: true })
  contactNumber: string;

  @Column({ type: "enum", enum: UserType, default: UserType.USER })
  userType: UserType;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservation: Reservation[];
}
