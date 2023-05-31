import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservationEntity";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    ticketId: number;

    @Column()
    seatNumber: number;

    @Column()
    price: number;

    @OneToOne(()=> Reservation, (reservation) => reservation.ticket)
    reservation: Reservation;
}