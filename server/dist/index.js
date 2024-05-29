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
exports.StartServer = void 0;
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
// import { json } from "stream/consumers";
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = (0, redis_1.createClient)();
client.on("error", (err) => { console.log("redis connection error", err); });
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { porblemId, code, language } = req.body;
    console.log(porblemId, code, language);
    try {
        yield client.lPush("problems", JSON.stringify({ porblemId, code, language }));
        res.status(200).send("submisssion recieved and done");
    }
    catch (error) {
        console.log("error during submit ", error);
        res.status(400).send("didn't recieved");
    }
}));
function StartServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("redis connected");
            app.listen(3000, () => {
                console.log("server running on 3000");
            });
        }
        catch (error) {
            console.log("error during starting server", error);
        }
    });
}
exports.StartServer = StartServer;
StartServer();
