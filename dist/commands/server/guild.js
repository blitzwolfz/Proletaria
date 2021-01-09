"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = void 0;
const db_1 = require("../../util/db");
require('dotenv').config();
exports.prefix = {
    name: "prefix",
    description: "View server prefix or add an arg to change it",
    group: "server",
    owner: true,
    async execute(message, client, args, ownerID) {
        var _a;
        let s = await db_1.getServer(message.guild.id);
        console.log(args);
        if (args.length === 0) {
            return message.reply(`The server prefix is ${s.prefix}`);
        }
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(["ADMINISTRATOR", "MANAGE_GUILD"])) && !(ownerID === process.env.owner))
            return message.reply("you need manage server permissions to change the prefix!");
        if (!args[0])
            return message.reply(`please follow the syntax of ${s.prefix}prefix \`new prefix\``);
        s.prefix = args[0];
        db_1.updateServer(s, true).then(() => { var _a; return message.reply(`New prefix of \`${args[0]}\` has updated on ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}`); });
    }
};
