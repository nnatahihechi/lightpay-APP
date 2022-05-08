"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const users_1 = require("./seeders/users");
// Connect to postgres database
models_1.default.sequelize.sync()
    .then(console.log('Postgres database connected.'))
    .then(() => createUsers()) // Add mock data to the database. Remove for production.
    .catch((err) => console.error('Unable to connect to the database.', err));
// Mock data
const createUsers = () => {
    users_1.users.map(user => {
        models_1.default.User.create(user);
    });
};
