"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHHMMSS = void 0;
async function toHHMMSS(timestamp, howlong) {
    return new Date((howlong - (Math.floor(Date.now() / 1000) - timestamp)) * 1000).toISOString().substr(11, 8);
}
exports.toHHMMSS = toHHMMSS;
