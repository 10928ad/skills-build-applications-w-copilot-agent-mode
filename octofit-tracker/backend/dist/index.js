"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api/users', users_1.default);
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
        console.log(`Connected to MongoDB at ${MONGO_URI}`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
