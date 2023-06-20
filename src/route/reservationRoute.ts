import { Router } from "express";
import { createReservation } from "../controller/reservationController";

const route = Router();

route.post("/create", createReservation);

export default route;
