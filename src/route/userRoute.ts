import { Router } from "express";
import {
  Login,
  Register,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controller/userController";
import { IsAdmin, IsUser } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/:id", IsUser, getUserById);
router.get("/getAll", IsUser, getAllUser);
router.put("/:id", IsUser, updateUser);
router.delete("/:id", IsUser, deleteUser);

export default router;
