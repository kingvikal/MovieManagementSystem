import { Router } from "express";
import {
  Login,
  Register,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controller/userController";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/:id", getUserById);
router.get("/getAll", getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
