import express from 'express';
import userValidate from '../middlewares/user.validate';
import registerUser from '../controllers/user.controller';
import forgotPassword from '../controllers/forgotPassword';
import resetPassword from '../controllers/resetPassword';
import verifyToken from '../controllers/emailToken_check';
import getCryptoWallets from '../controllers/wallets.controller';
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

<<<<<<< HEAD
/* Create wallet */
// router.post('/auth/create-wallet/:verifyToken', createAccount);
=======
/* Get all wallets */
router.get('/wallets', getCryptoWallets);
>>>>>>> 0aedd7bbf504ea87198d05e25caf5839e98b336b

export default router;
