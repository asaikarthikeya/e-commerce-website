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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisClient_1 = require("../utils/redisClient");
const USER_PREFIX = 'user:';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const key = USER_PREFIX + username;
    try {
        // 1) Check if user exists
        if (yield redisClient_1.redisClient.exists(key)) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // 2) Hash password
        const hash = yield bcryptjs_1.default.hash(password, 10);
        // 3) Store in Redis hash
        yield redisClient_1.redisClient.hSet(key, { password: hash });
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const key = USER_PREFIX + username;
    try {
        // 1) Fetch stored hash
        const storedHash = yield redisClient_1.redisClient.hGet(key, 'password');
        if (!storedHash) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // 2) Compare
        const isMatch = yield bcryptjs_1.default.compare(password, storedHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // 3) Sign JWT
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.login = login;
