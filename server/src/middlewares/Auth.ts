require('dotenv').config();
import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


const Auth = (req: Request | any, res: Response, next: NextFunction) => {
  const token: any = req.headers.authorization.token.split(' ')[1];

  if(!token) {
    res.status(401).json('Access Denied, No Access Token Provided');
  }

  try {

    // Using Config module to read token validities.
    const decoded = Jwt.verify(token, process.env.PRIVATE_KEY!)
    req.user = decoded;

    next()
  } catch (ex) {
    res.status(400).json('Invalid token')
  }
}

export default Auth;