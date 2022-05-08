import { Request, Response, NextFunction } from 'express';
import hashPassword from '../auth/encrypt';
import client from '../db/connection';

client.connect();

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, fullname, mobile, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    console.log({
      email,
      fullname,
      mobile,
      password: hashedPassword,
    });
    let insertQuery = `INSERT into "Users"(email, fullname, mobile, password)
                        values('${email}', '${fullname}', '${mobile}', '${hashedPassword}')
    `;

    client.query(insertQuery, (err: any, result: any) => {
      if (!err) {
        res.status(201).json({
          email,
          fullname,
          mobile,
          password: hashedPassword,
        });
      } else {
        res.status(500).send('User already exist with this email ');
      }
      client.end;
    });
  } catch (err) {
    next(err);
  }
};

export default registerUser;
