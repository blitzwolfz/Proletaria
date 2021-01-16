"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamble = exports.beg = exports.work = void 0;
const db_1 = require("../../util/db");
const util_1 = require("../../util/util");
exports.work = {
    name: "work",
    description: "You can work every 15 mins to earn money",
    group: "economy",
    owner: false,
    async execute(message, client, args) {
        let u = await db_1.getUser(message.author.id);
        if (!u) {
            return message.reply("Please make a user account using the create command");
        }
        let r = await db_1.getReminder(`${message.author.id}money`);
        if (!r || Math.floor(Date.now() / 1000) - r.time > 900) {
            let m = Math.floor(Math.random() * 1000) + 1;
            u.resources.money += m;
            await db_1.updateUser(u);
            await db_1.inserReminder({
                _id: `${message.author.id}money`,
                type: "work",
                time: Math.floor(Date.now() / 1000),
                channel: message.channel.id
            });
            return message.reply(`Congrats on working successfully, you earned ${m}. You can work again in 15 mins`);
        }
        else {
            return message.reply(`You can work again in ${await util_1.toHHMMSS(r.time, 900)}`);
        }
    }
};
exports.beg = {
    name: "beg",
    group: "economy",
    description: "You can beg for food every hour to earn food",
    owner: false,
    async execute(message, client, args) {
        let u = await db_1.getUser(message.author.id);
        if (!u) {
            return message.reply("Please make a user account using the create command");
        }
        let r = await db_1.getReminder(`${message.author.id}food`);
        if (!r || Math.floor(Date.now() / 1000) - r.time > 3600) {
            let f = Math.floor(Math.random() * 1000) + 1;
            u.resources.food += f;
            await db_1.updateUser(u);
            await db_1.inserReminder({
                _id: `${message.author.id}food`,
                type: "food",
                time: Math.floor(Date.now() / 1000),
                channel: message.channel.id
            }).then(() => console.log("inserted"));
            return message.reply(`Congrats on begging successfully, you earned ${f} food. You can beg again in a hour`);
        }
        else {
            return message.reply(`You can beg again in ${await util_1.toHHMMSS(r.time, 3600)}`);
        }
    }
};
exports.gamble = {
    name: "bet",
    group: "economy",
    description: "You can bet your money for **higher** wins, or higher **losses**.\nUse the a or all flag to bet all your money!",
    owner: false,
    async execute(message, client, args) {
        let u = await db_1.getUser(message.author.id);
        if (!u) {
            return message.reply("Please make an account");
        }
        let money = (args[0].toLowerCase() == "a" || "all") ? u.resources.money : parseInt(args[0]);
        if (u.resources.money === 0)
            return message.reply("you don't have any money left!");
        else if ((isNaN(money) && args[0] != "a" && !args[0].toLowerCase().startsWith("h") &&
            !args[0].toLowerCase().startsWith("q"))
            || typeof args[0] === "undefined" || args[0] < 1)
            return message.reply(`please enter a valid amount using \`${await (await db_1.getServer(message.guild.id)).prefix}bet <amount>\` or \`${await (await db_1.getServer(message.guild.id)).prefix}bet a\` to bet all your money.`);
        let won = Math.random() > 0.5;
        if (args[0].toLowerCase() == "half" || args[0].toLowerCase().startsWith("h"))
            money = Math.floor((u.resources.money) / 2);
        else if (args[0].toLowerCase() == "quarter" || args[0].toLowerCase().startsWith("q"))
            money = Math.floor((u.resources.money) * 0.25);
        if (money < 1)
            return message.reply("you can't bet a negative amount");
        if (money > u.resources.money)
            return message.reply("you can't bet more money than you own!");
        let addedMoney = won ? money : -1 * money;
        u.resources.money += addedMoney;
        if (won)
            message.reply("congratulations! You won " + await util_1.NumCommafy(money) + " coins!");
        else
            message.reply("you lost " + await util_1.NumCommafy(money) + " coins. Try again next time!");
        return await db_1.updateUser(u);
    }
};
