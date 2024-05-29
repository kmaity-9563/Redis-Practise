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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartWorker = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
// second server for workers
function StartSubmission(submission) {
    return __awaiter(this, void 0, void 0, function* () {
        const { porblemId, code, language } = JSON.parse(submission);
        console.log(`problem id ${porblemId}`);
        console.log(`code ${code}`);
        console.log(`language ${language}`);
    });
}
function StartWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("redis connected");
            const submission = yield client.brPop("problems", 0);
            console.log("submission", submission === null || submission === void 0 ? void 0 : submission.element);
            StartSubmission(submission === null || submission === void 0 ? void 0 : submission.element);
        }
        catch (error) {
            console.log("error in submission message", error);
        }
    });
}
exports.StartWorker = StartWorker;
StartWorker();
