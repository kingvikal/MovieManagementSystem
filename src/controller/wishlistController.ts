import { Request, Response } from "express";
import { AppDataSource } from "../services/AppDataSource";
import { Wishlist } from "../model/wishlistEntity";
import { Movies } from "../model/moviesEntity";
import { User } from "../model/userEntity";

const userRepo = AppDataSource.getRepository(User);
const moviesRepo = AppDataSource.getRepository(Movies);
const wishlistRepo = AppDataSource.getRepository(Wishlist);

interface UserRequest extends Request {
  user: any;
  id: any;
}
export const createWishlist = async (req: UserRequest, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { id: moviesId } = req.body;

    const movie: Movies = await moviesRepo.findOne({
      where: { moviesId },
    });

    const user = await userRepo.findOne({
      where: { userId },
      relations: { wishlist: true },
    });

    const wishlists = await wishlistRepo.findOne({
      relations: { user: true, movies: true },
      where: { user: { userId } },
    });

    let wishlist = new Wishlist();
    let result: any;

    if (movie && user) {
      if (wishlists) {
        wishlists.movies.push(movie);
        result = await wishlistRepo.save(wishlists);
      } else {
        wishlist.user = user;
        wishlist.movies = [movie];
        result = await wishlistRepo.save(wishlist);
      }
    } else {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    if (result) {
      return res
        .status(200)
        .json({ message: "Wishlist Created Successfully", data: result });
    }
  } catch (err) {
    console.log("error in create Wishlist", err);
    return res.status(500).json(err);
  }
};

export const getWishlistById = async (req: Request, res: Response) => {
  try {
    const { id: wishlistId }: any = req.params;

    const wishlist = await wishlistRepo.findOne({
      where: { wishlistId },
      relations: ["user", "movies"],
    });

    console.log(wishlist);

    if (wishlist) {
      res.status(200).json({ data: wishlist });
    } else {
      res.status(400).json({ message: "No data found" });
    }
  } catch (err) {
    console.log("error in getWishlistById", err);
    return res.status(500).json(err);
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await wishlistRepo.find({
      relations: { user: true, movies: true },
    });

    if (wishlist) {
      return res.status(200).json({ data: wishlist });
    } else {
      return res.status(400).json({ message: "No any Data" });
    }
  } catch (err) {
    console.log("error in getwishlist", err);
    return res.status(500).json(err);
  }
};
export const deleteWishlist = async (req: Request, res: Response) => {
  try {
    const { id: wishlistId } = req.params;

    const wishlist = await wishlistRepo.delete(wishlistId);

    if (wishlist.affected === 1) {
      return res.status(200).json({ success: "wishlist deleted successfull" });
    } else {
      return res
        .status(400)
        .json({ message: "Already deleted or no wishlist" });
    }
  } catch (err) {
    console.log("error in getwishlist", err);
    return res.status(500).json(err);
  }
};
