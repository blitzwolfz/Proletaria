"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRndInteger = exports.toHHMMSS = void 0;
async function toHHMMSS(timestamp, howlong) {
    return new Date((howlong - (Math.floor(Date.now() / 1000) - timestamp)) * 1000).toISOString().substr(11, 8);
}
exports.toHHMMSS = toHHMMSS;
async function getRndInteger(min, max, maxInclude = false) {
    if (maxInclude)
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRndInteger = getRndInteger;
