import { Request, Response } from "express";
import { AppDataSource } from "../services/AppDataSource";
import { Movies } from "../model/moviesEntity";
import { Category } from "../model/categoryEntity";
import { CategoryValidate } from "../joiValidation/joiValidation";

const movieRepo = AppDataSource.getRepository(Movies);
const categoryRepo = AppDataSource.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
  try {
    const createCategory = await CategoryValidate.validateAsync(req.body);

    if (!createCategory) {
      return res.status(400).json({ message: "Validation Failed" });
    } else {
      const category = new Category();

      category.name = req.body.name;
      category.description = req.body.description;

      if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: "Field must not be empty" });
      }

      await categoryRepo.save(category);
      return res.status(200).json({ message: "Category added successfull" });
    }
  } catch (e) {
    console.log("Something wrong in createCategory");

    return res.status(500).json(e);
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const getAll = await categoryRepo.find({});

    if (getAll) {
      return res.status(200).json({ data: getAll });
    } else {
      return res.status(400).json({ message: "No data found" });
    }
  } catch (e) {
    console.log("error in getAllCategory");
    return res.status(500).json(e);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const { name, description } = req.body;

    const update = await categoryRepo
      .createQueryBuilder("category")
      .update(Category)
      .set({ name: name, description: description })
      .where({ id: categoryId })
      .execute();

    if (update.affected == 0) {
      return res
        .status(400)
        .json({ message: "Cannot update or already Updated" });
    }
    return res.status(200).json({ success: "Category update Sucessfull" });
  } catch (e) {
    console.log("error in updateCategory");
    return res.status(500).json(e);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const deleteCategory = await categoryRepo
      .createQueryBuilder("category")
      .delete()
      .from(Category)
      .where({ id: categoryId })
      .execute();

    if (deleteCategory.affected === 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete or already Deleted" });
    }
    return res.status(200).json({ succes: "Category deleted Successfully" });
  } catch (e) {
    console.log("error in deleteCategory");
    return res.status(500).json(e);
  }
};
