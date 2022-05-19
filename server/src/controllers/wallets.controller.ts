import { Request, Response } from 'express';
import pool from '../db/connection';

const getCryptoWallets = async (req: Request, res: Response) => {
  try {
    const allWallets = await pool.query(`SELECT address, coin FROM "Wallets"`);

    res.status(200).send(allWallets.rows);
  } catch (error: any) {
    console.log(error.message);
  }
};

export default getCryptoWallets;
