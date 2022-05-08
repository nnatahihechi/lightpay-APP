import express from 'express';
import userValidate from '../middlewares/user.validate';
import registerUser from '../controllers/user.controller';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* Registration page. */
router.post('/auth/register', userValidate, registerUser);

export default router;
