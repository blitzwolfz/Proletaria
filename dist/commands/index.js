"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod_1 = require("./economy/owner/mod");
const store_1 = require("./economy/store");
const work_1 = require("./economy/work");
const ping_1 = require("./ping");
const guild_1 = require("./server/guild");
const create_1 = require("./util/create");
const stat_1 = require("./economy/stat");
const help_1 = require("./util/help");
const leaderboards_1 = require("./leaderboards");
exports.default = [
    create_1.createuser,
    create_1.userdelete,
    ping_1.ping,
    ping_1.nerdping,
    stat_1.userstats,
    guild_1.prefix,
    work_1.work,
    work_1.beg,
    create_1.rename,
    store_1.store,
    store_1.buy,
    mod_1.modadd,
    help_1.help,
    help_1.guide,
    stat_1.earnings,
    leaderboards_1.lb
];
