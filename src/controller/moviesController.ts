import { Request, Response } from "express";
import { AppDataSource } from "../services/AppDataSource";
import { Category } from "../model/categoryEntity";
import { Movies } from "../model/moviesEntity";
import { title } from "process";
import { ILike } from "typeorm";

const categoryRepo = AppDataSource.getRepository(Category);
const moviesRepo = AppDataSource.getRepository(Movies);

export const createMovies = async (req: Request, res: Response) => {
  try {
    const { title, genre, duration, rating, description, categoryId } =
      req.body;

    const category = await categoryRepo.findOne({
      where: { categoryId: categoryId },
    });

    const movies = new Movies();
    movies.title = title;
    movies.genre = genre;
    movies.duration = duration;
    movies.rating = rating;
    movies.description = description;
    if (category) movies.category = category;
    else {
      return res.status(400).json({ message: "Invalid Category" });
    }
    await moviesRepo.save(movies);
    return res
      .status(200)
      .json({ message: "Movies Created Successfully", data: movies });
  } catch (e) {
    console.log("while creating movies", e);

    return res.status(500).json(e);
  }
};

export const getMoviesById = async (req: Request, res: Response) => {
  try {
    const { id: moviesId }: any = req.params;

    const movie = await moviesRepo.findOne({
      where: { moviesId },
      relations: { category: true },
    });

    movie
      ? res.status(200).json({ data: movie })
      : res.status(400).json({ message: "No movies to show" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const sortLike = req.body.sort || "ASC";
    const limits = req.body.limit || 20;
    const pages = req.body.page || 1;
    const searchTerm = req.body.searchTerm;
    const skipIndex = (pages - 1) * limits;

    const getAllMovie = moviesRepo
      .createQueryBuilder("movies")
      .leftJoinAndSelect("movies.category", "category");

    if (searchTerm) {
      getAllMovie.andWhere({
        title: ILike(`%${searchTerm}%`),
      });
    }
    const count = await getAllMovie.getCount();

    getAllMovie
      .orderBy("movies.moviesId", sortLike)
      .take(limits)
      .skip(skipIndex)
      .getMany()
      .then(async (data) => {
        const totalPage = Math.ceil(count / limits);
        res.status(200).json({ data, totalPage, count: count });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateMovies = async (req: Request, res: Response) => {
  try {
    const { title, genre, rating, description } = req.body;
    const { id: moviesId } = req.params;

    const update = await moviesRepo
      .createQueryBuilder("movies")
      .update(Movies)
      .set({
        title: title,
        genre: genre,
        rating: rating,
        description: description,
      })
      .where("moviesId = :moviesId", { moviesId })
      .execute();

    if (!title || !genre || !description) {
      return res
        .status(400)
        .json({ message: "Title, Genre and Description cannot be Empty" });
    }

    if (update.affected === 1) {
      return res.status(200).json({ success: "Update Successful" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteMovies = async (req: Request, res: Response) => {
  try {
    const { id: moviesId } = req.params;

    const deleteMovie = await moviesRepo
      .createQueryBuilder()
      .delete()
      .from(Movies)
      .where("moviesId = :moviesId", { moviesId })
      .execute();

    if (deleteMovie?.affected === 1) {
      return res.status(200).json({ message: "deleted Successfull" });
    }
    if (deleteMovie?.affected === 0) {
      return res
        .status(400)
        .json({ message: "No movie to delete or already deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


