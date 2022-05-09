"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_validate_1 = __importDefault(require("../middlewares/user.validate"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_login_1 = require("../controllers/user.login");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
/* Registration page. */
router.post('/auth/register', user_validate_1.default, user_controller_1.default);
router.post('/login', user_login_1.login);
exports.default = router;
