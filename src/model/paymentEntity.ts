import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservationEntity";
enum PaymentMethod {
  ESEWA = "esewa",
  KHALTI = "khalti",
  FONEPAY = "fonepay",
  IMEPAY = "imepay",
  CASH = "cash",
}

interface TransactionDetails {
  name: string;
  contact: number;
  age: number;
  movie: string;
}
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ type: "enum", enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod: PaymentMethod;

  @Column("jsonb")
  transactionDetails: TransactionDetails;

  @OneToOne(()=> Reservation, (reservation)=> reservation.payment)
  reservation : Reservation
}
