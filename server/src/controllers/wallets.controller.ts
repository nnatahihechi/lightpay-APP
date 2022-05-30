import { Request, Response } from 'express';
import pool from '../db/connection';
const web3 = require('web3');
import dotenv from "dotenv";
import Web3 from 'web3';

dotenv.config();

export const getBalances = async (req: Request | any, res: Response) => {
  try {
    const web3 = new Web3(process.env.BSC_TESTNET_NODE!)
    const id = req.user.id;
    const coin = req.params.coin;
    const myWallet = await pool.query(
      `SELECT address FROM "Wallets" WHERE "UserId"=${id} AND "coin"='${coin}'`
    );
    const address = myWallet.rows[0].address;
    let balance: any = await web3.eth.getBalance(address);
    let decimal = (process.env.BSC_TOKEN_DECIMAL! as unknown as number)
    balance = (balance as unknown as number) / decimal;
    return res.status(200).json({
      balance
    })
  } catch (error: String | String[] | any) {
    if (error.message.includes(`(reading 'address')`)) {
      return res.status(404).json({
        message: "Unsupported Token"
      })
    }
    return res.status(500).json({
      message: "An Unexpected Error Occured"
    });

  }
}
export const getCryptoWallets = async (req: Request, res: Response) => {
  try {
    const allWallets = await pool.query(`SELECT address, coin FROM "Wallets"`);
    res.status(200).send(allWallets.rows);
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getUserWallet = async (req: Request, res: Response) => {
  const id = req.user.id;
  try {
    const myWallet = await pool.query(
      `SELECT address, coin FROM "Wallets" WHERE "UserId"=${id}`
    );

   return res.status(200).json(myWallet.rows);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: "An Unexpected Error Occured"
    });
  }
};
