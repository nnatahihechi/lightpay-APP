import { Request, Response } from 'express';
import pool from '../db/connection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/sendEmail';
import { passLink } from '../services/verifyEmailTemplate';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  let { email } = req.body;
  let plainPassword = req.body.password;

  const checkPassQuery = `SELECT id, mobile, email, fullname, password, status, "verifyToken" FROM "Users" WHERE email='${email}'`;

  pool.query(checkPassQuery, (err: any, result: any) => {
    if (!err) {
      if (!result.rows[0]) {
        console.log('User does not exist');
        return res.json({ msg: 'User does not exist' });
      }

      const { id, email, fullname, mobile, password, verifyToken } =
        result.rows[0];
      if (bcrypt.compareSync(plainPassword, password)) {
        if (result.rows[0].status) {
          // console.log("Login successful.");
          const user = { id, email, mobile };
          const user_secret = process.env.SECRET as string;
          const token = jwt.sign(user, user_secret, { expiresIn: '180s' });
          console.log(token);
          res.status(200).json({ msg: 'Login successful.', token });
        } else {
          // send verification email
          const link = `http://localhost:3000/auth/verify-email/?verifyToken=${verifyToken}`;
          const verifiedEmail = passLink(fullname.split(' ')[0], link);
          sendEmail(email, 'Verify your LightPay Email', verifiedEmail);
          res
            .status(200)
            .json({
              msg: 'Account not verified. Please check your email to verify your account.',
            });
        }
      } else {
        console.log('Sign in failed');
        res.status(403).json({ msg: 'Invalid credentials.' });
      }
    }
    pool.end;
  });
};
