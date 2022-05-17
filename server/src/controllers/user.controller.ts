import { Request, Response, NextFunction } from 'express';
import hashPassword from '../auth/encrypt';
import pool from '../db/connection';
import { sendEmail } from '../utils/sendEmail';
import { token } from '../sha256Encode';
import { passLink } from '../services/verifyEmailTemplate';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, fullname, mobile, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const newToken = token({ email, fullname, currentDate: new Date() });

    let insertQuery = `INSERT into "Users" (email, fullname, mobile, password, "createdAt", "updatedAt", "verifyToken")
                        values ('${email}', '${fullname}', '${mobile}', '${hashedPassword}', (to_timestamp(${Date.now()} / 1000.0)), (to_timestamp(${Date.now()} / 1000.0)), '${newToken}')
    `;

    pool.query(insertQuery, (err: any, result: any) => {
      if (!err) {
        const link = `http://localhost:3000/auth/verify-email/?verifyToken=${newToken}`;

        const verifiedEmail = passLink(fullname.split(' ')[0], link);

        sendEmail(email, 'Verify your LightPay Email', verifiedEmail);

        res.status(201).json({
          msg: 'Registration Successful. Check your email to verify your account.',
        });
      } else {
        res
          .status(500)
          .send('An account already exists with this email. Please sign in.');
      }
    });
  } catch (err) {
    next(err);
  }
};

export default registerUser;
