
import { Request, Response } from "express";
import client from '../db/connection';

client.connect();

export const   checkRegAuthForAccount
= async (req: Request, res: Response) => {

  try {
    
    let [email, password] = req.body;

    const user = await client.query(
      `SELECT * FROM "Users" WHERE "email" = $1 AND "password" = $2`,
      [email, password]
    );

    if (user.rows.length) {
      console.log("Login successful");
      res.json({msg: "Login successful"});
    }

    else {
      console.log("Invalid credentials");
      res.json({msg: "Invalid credentials"});
      
    }

  } catch (error: any) {
    res.status(409).json(error.message);
  }
}


export default {
  checkRegAuthForAccount
}
