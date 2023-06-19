import { Router } from "express";
import {
  createMovies,
  deleteMovies,
  getAllMovies,
  getMoviesById,
  updateMovies,
} from "../controller/moviesController";
import { IsAdmin, IsUser } from "../middleware/authMiddleware";

const route = Router();

route.post("/create", IsUser, IsAdmin, createMovies);

route.get("/getAllMovies", getAllMovies),
  route.get("/:id", getMoviesById),
  route.put("/:id", IsUser, IsAdmin, updateMovies);
route.delete("/:id", IsUser, IsAdmin, deleteMovies);

export default route;
