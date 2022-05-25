import { Request, Response } from "express";
import { promisify } from "util";
import pool from "../db/connection";
import jwt from "jsonwebtoken";
require("dotenv").config();

const getUserWallet = async (req: Request, res: Response) => {
  const id = req.user.id;
  try {
    const myWallet = await pool.query(
      `SELECT address, coin FROM "Wallets" WHERE "UserId"=${id}`
    );

    res.status(200).json(myWallet.rows);
  } catch (error: any) {
    res.status(500).json(error);
    console.log(error.message);
  }
};

export default getUserWallet;
