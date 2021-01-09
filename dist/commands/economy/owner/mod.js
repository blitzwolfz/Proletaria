"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modadd = void 0;
const db_1 = require("../../../util/db");
require('dotenv').config();
exports.modadd = {
    name: "mod-add",
    description: "You can buy items from store",
    group: "economy",
    owner: true,
    async execute(message, client, args, ownerID) {
        var _a, _b, _c, _d;
        if (message.author.id !== ownerID && !((_a = process.env.mods) === null || _a === void 0 ? void 0 : _a.split(",").includes(message.author.id))) {
            return await message.reply("You are not allowed to use this command. If you feel that this is in error, contact owner.");
        }
        if (message.mentions.users.array().length === 0 && args.length === 0) {
            return await message.reply("You either must mention the user, or give the user's id");
        }
        else {
            let u = await db_1.getUser(((_d = (_c = (_b = message.mentions) === null || _b === void 0 ? void 0 : _b.users) === null || _c === void 0 ? void 0 : _c.first()) === null || _d === void 0 ? void 0 : _d.id) || args[0]);
            if (!u)
                return await message.reply("This user could not be found.");
            if (message.mentions.users.array().length > 0 || args.length > 3)
                args.shift();
            if (args.length === 0 || args.length === 1)
                return message.reply("You must mention the type of resource using dot format. "
                    + "\`money, food, clone, human, mines, renewable, hotfusion, coldfusion, <corpo | citizen> <ship | soldir>\`");
            let len = 1;
            switch (args[0]) {
                case "money":
                    u.resources.money += parseInt(args[1]);
                    break;
                case "food":
                    u.resources.food += parseInt(args[1]);
                    break;
                case "human":
                    u.resources.people.human += parseInt(args[1]);
                    break;
                case "clone":
                    u.resources.people.clone += parseInt(args[1]);
                    break;
                case "mines":
                    u.generators.mines += parseInt(args[1]);
                    break;
                case "renewable":
                    u.generators.energy.renewable += parseInt(args[1]);
                    break;
                case "hotfusion":
                    u.generators.energy.hotfusion += parseInt(args[1]);
                    break;
                case "corpo":
                    if (args[1] === "ship") {
                        u.navy.corpo += parseInt(args[2]);
                    }
                    else if (args[1] === "soldier") {
                        u.army.corpo += parseInt(args[2]);
                    }
                    len += 1;
                    break;
                case "citizen":
                    if (args[1] === "ship") {
                        u.navy.citizen += parseInt(args[2]);
                    }
                    else if (args[1] === "soldier") {
                        u.army.citizen += parseInt(args[2]);
                    }
                    len += 1;
                    break;
                default:
                    return message.reply("That is not a supported type");
            }
            await db_1.updateUser(u);
            return message.reply(`Added ${args[len - 1]} ${args.slice(0, len - 1).join('')} to user.`);
        }
    }
};