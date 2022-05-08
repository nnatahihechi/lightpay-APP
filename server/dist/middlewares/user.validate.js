"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    email: joi_1.default.custom((val) => {
        if (typeof val === 'string' &&
            val.includes('@') &&
            val.length > 12 &&
            val.length < 200)
            return val;
        throw new Error('Invalid email address');
    }).required(),
    fullname: joi_1.default.string().min(3).max(200).required(),
    mobile: joi_1.default.string().max(15).required(),
    password: joi_1.default.string().min(6).max(20).required(),
});
const userValidate = (req, res, next) => {
    schema
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err) => {
        res.status(403).end(err.message);
    });
};
exports.default = userValidate;
