"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringCommafy = exports.NumCommafy = exports.getRndInteger = exports.toHHMMSS = void 0;
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
async function NumCommafy(str) {
    return stringCommafy(String(str));
}
exports.NumCommafy = NumCommafy;
async function stringCommafy(str) {
    return str.replace(/(^|[^\w.])(\d{4,})/g, function (_$0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
}
exports.stringCommafy = stringCommafy;
