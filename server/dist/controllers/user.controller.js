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
const encrypt_1 = __importDefault(require("../auth/encrypt"));
const connection_1 = __importDefault(require("../db/connection"));
connection_1.default.connect();
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullname, mobile, password } = req.body;
    try {
        const hashedPassword = yield (0, encrypt_1.default)(password);
        console.log({
            email,
            fullname,
            mobile,
            password: hashedPassword,
        });
        let insertQuery = `INSERT into "Users"(email, fullname, mobile, password)
                        values('${email}', '${fullname}', '${mobile}', '${hashedPassword}')
    `;
        connection_1.default.query(insertQuery, (err, result) => {
            if (!err) {
                res.status(201).json({
                    email,
                    fullname,
                    mobile,
                    password: hashedPassword,
                });
            }
            else {
                res.status(500).send('User already exist with this email ');
            }
            connection_1.default.end;
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = registerUser;
