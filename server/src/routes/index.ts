import express from 'express';
import userValidate from '../middlewares/user.validate';
import registerUser from '../controllers/user.controller';
import forgotPassword from '../controllers/forgotPassword';
import resetPassword from '../controllers/resetPassword';
import verifyToken from '../controllers/emailToken_check';
import listWallets from '../controllers/wallet.controller';
import { login } from '../controllers/user.login';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* Registration page. */
router.post('/auth/register', userValidate, registerUser);

/* Verify email */
router.post('/auth/verify-email/:verifyToken', verifyToken);

/* Login */
router.post('/login', login);

/* Forgot password */
router.post('/auth/forgot-password', forgotPassword);

/* Reset password */
router.post('/auth/reset-password/:resetToken', resetPassword);

/* List wallets */
router.get('/wallets', listWallets);

export default router;
