import { Router } from "express";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
  getWishlistById,
} from "../controller/wishlistController";
import { IsUser } from "../middleware/authMiddleware";

const route = Router();

route.post("/create", IsUser, createWishlist);
route.get("/getById/:id", IsUser, getWishlistById);
route.get("/getAll", IsUser, getWishlist);
route.delete("/:id", IsUser, deleteWishlist);

export default route;
