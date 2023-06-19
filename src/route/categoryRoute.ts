import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controller/categoryController";
import { IsAdmin, IsUser } from "../middleware/authMiddleware";

const router = Router();

router
  .get("/create", IsUser, IsAdmin, createCategory)
  .get("/getAll", IsUser, getAllCategory)
  .put("/:id", IsUser, IsAdmin, updateCategory)
  .delete("/:id", IsUser, IsAdmin, deleteCategory);

export default router;
