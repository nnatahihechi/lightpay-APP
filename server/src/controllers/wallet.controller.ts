import { Request, Response } from 'express';
import pool from '../db/connection';

const listWallets = async (req: Request, res: Response) => {
  try {
    const allWallets = await pool.query(`SELECT * FROM "Users"`);
    console.log(allWallets);
    res.status(200).json({
      msg: 'Wallets listed successfully...',
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export default listWallets;
