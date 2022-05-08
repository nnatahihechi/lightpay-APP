import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  email: Joi.custom((val) => {
    if (
      typeof val === 'string' &&
      val.includes('@') &&
      val.length > 12 &&
      val.length < 200
    )
      return val;
    throw new Error('Invalid email address');
  }).required(),
  fullname: Joi.string().min(3).max(200).required(),
  mobile: Joi.string().max(15).required(),
  password: Joi.string().min(6).max(20).required(),
});

const userValidate = (req: Request, res: Response, next: NextFunction) => {
  schema
    .validateAsync(req.body, { abortEarly: false })

    .then(() => next())

    .catch((err) => {
      res.status(403).end(err.message);
    });
};

export default userValidate;
