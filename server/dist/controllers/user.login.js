"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// client.connect();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const query = `SELECT id,mobile,email FROM "Users" WHERE email='${email}' AND password='${password}'`;
    connection_1.default.query(query, (err, result) => {
        if (!err) {
            if (!result.rows[0])
                return res.json({ msg: "user does not exist" });
            const { id, email, mobile } = result.rows[0];
            const user = { id, email, mobile };
            const user_secret = process.env.SECRET;
            const token = jsonwebtoken_1.default.sign(user, user_secret, { expiresIn: '180s' });
            console.log(token);
            res.status(200).send(token);
        }
        else {
            console.log(err);
            res.status(500).send('User not found ');
        }
        connection_1.default.end;
    });
});
exports.login = login;
