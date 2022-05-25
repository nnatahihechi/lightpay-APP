import express from 'express';
import userValidate from '../middlewares/user.validate';
import registerUser from '../controllers/user.controller';
import forgotPassword from '../controllers/forgotPassword';
import resetPassword from '../controllers/resetPassword';
import verifyToken from '../controllers/emailToken_check';
import getCryptoWallets from '../controllers/wallets.controller';
import { login } from '../controllers/user.login';
const getBalance = require('../controllers/getBalances');
import getUserWallet from '../controllers/getUserWallet';
import Auth from '../middlewares/Auth';

const router = express.Router();

/* Home page */
router.get('/', function (req, res) {
  res.render('index', { title: 'LightPay' });
});

/* Registration page */
router.post('/auth/register', userValidate, registerUser);

/* Verify email */
router.post('/auth/verify-email/:verifyToken', verifyToken);

/* Login */
router.post('/login', login);

/* Forgot password */
router.post('/auth/forgot-password', forgotPassword);

/* Reset password */
router.post('/auth/reset-password/:resetToken', resetPassword);

/* Get wallet balance */
// router.get('/wallet/{asset}/balance', getBalance);

/* Get all wallets */
router.get('/wallets', getCryptoWallets);

/* Get all user's wallets */
router.get('/userwallet', Auth, getUserWallet)


export default router;