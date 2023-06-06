import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controller/categoryController";
import { IsUser } from "../middleware/authMiddleware";

const router = Router();

router
  .get("/create", IsUser, createCategory)
  .get("/getAll", IsUser, getAllCategory)
  .put("/:id", IsUser, updateCategory)
  .delete("/:id", IsUser, deleteCategory);

export default router;
