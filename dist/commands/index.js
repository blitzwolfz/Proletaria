"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const work_1 = require("./economy/work");
const ping_1 = require("./ping");
const guild_1 = require("./server/guild");
const create_1 = require("./util/create");
const stat_1 = require("./util/stat");
exports.default = [
    create_1.createuser,
    ping_1.ping,
    ping_1.nerdping,
    stat_1.userstats,
    guild_1.prefix,
    work_1.work,
    work_1.beg,
    create_1.rename
];
