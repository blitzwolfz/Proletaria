"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = exports.store = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../../util/db");
exports.store = {
    name: "store",
    description: "Brings you to economy store",
    group: "economy",
    owner: false,
    async execute(message, client, args) {
        var _a, _b, _c, _d, _e, _f;
        if (args.length === 0) {
            return message.channel.send("Three stores available: military, population, resources");
        }
        if (args[0].toLowerCase() === "military") {
            const militaryStore = new discord_js_1.MessageEmbed()
                .setTitle("Military Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields({ name: `Your balance:`, value: `${(_a = (await db_1.getUser(message.author.id))) === null || _a === void 0 ? void 0 : _a.resources.money} ${(_b = (await db_1.getUser(message.author.id))) === null || _b === void 0 ? void 0 : _b.resources.currencyname}`, inline: false }, { name: '\u200b', value: '\u200b' }, { name: `Recuirt Soldiers:`, value: `Costs 1.5k. Recruit loyal citizens to fight for the motherland, with your pop decreasing by one, each soldier having 500 power. To maintain you need 750 food, and 250 money a day`, inline: true }, { name: `Private Corpo Soldiers:`, value: `Costs 12.5k. A Private Corporation will provide you with a soldier, each soldier having 1500 power. To maintain you need 2500 money a day`, inline: true }, { name: '\u200b', value: '\u200b' }, { name: `Build a ship:`, value: `Costs 10.5k. Build ships to strengthen your Naval power. To maintain you need 550 food, and 1k money a day, 300 metal`, inline: true }, { name: `Private Corpo Ship:`, value: `Costs 25.5k. A Private Corporation will provide you with a ship.`, inline: true })
                .setColor("RED");
            await message.channel.send(militaryStore);
        }
        else if (args[0].toLowerCase() === "population") {
            const militaryStore = new discord_js_1.MessageEmbed()
                .setTitle("Population Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields({ name: `Your balance:`, value: `${(_c = (await db_1.getUser(message.author.id))) === null || _c === void 0 ? void 0 : _c.resources.money} ${(_d = (await db_1.getUser(message.author.id))) === null || _d === void 0 ? void 0 : _d.resources.currencyname}`, inline: false }, { name: '\u200b', value: '\u200b' }, { name: `Immigration:`, value: `Costs 500/person. Open your broders to make loyal citizens for the motherland. Each person costs 10 currency, 1 food.`, inline: true }, { name: `Cloning Vat:`, value: `Costs 10k/1000 people. A Private Corporation will grow you loyal citizens. Each person costs 10 currency, 1 food.`, inline: true }, { name: '\u200b', value: '\u200b' }, { name: `Farm:`, value: `Costs 1k currency, 500 metal. Each farm will provide you 1000 food daily. To maintain, you need 100 currency, 100 energy`, inline: true }, { name: `Private Corpo Farm:`, value: `Costs 100k. A Private Corporation will give you daily 10k food. To maintain, you need 1k currency`, inline: true })
                .setColor("RED");
            await message.channel.send(militaryStore);
        }
        else if (args[0].toLowerCase() === "resources") {
            const militaryStore = new discord_js_1.MessageEmbed()
                .setTitle("Resources Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields({ name: `Your balance:`, value: `${(_e = (await db_1.getUser(message.author.id))) === null || _e === void 0 ? void 0 : _e.resources.money} ${(_f = (await db_1.getUser(message.author.id))) === null || _f === void 0 ? void 0 : _f.resources.currencyname}`, inline: false }, { name: '\u200b', value: '\u200b' }, { name: `Mine:`, value: `Costs 100 currency. Gives you 200 metal per day. To maintain it costs 50 currency, 10 energy.`, inline: true }, { name: '\u200b', value: '\u200b' }, { name: `Renewables`, value: `Costs 1k currency, 2k metal. Will provide you with 100 Energy per day. To maintain, you need 100 currency, 100 energy`, inline: true }, { name: `Hot Fusion Reactor`, value: `Costs 10k currency, 9k metal, 2k energy. Will provide you with 1k Energy per day. To maintain, you need 4k currency, 3k metal`, inline: true }, { name: `Cold Fusion Reactor`, value: `Costs 500k currency, 250k metal, 750k energy. Will provide you with 200k Energy per day. To maintain, you need 50k currency, 20k metal`, inline: true })
                .setColor("RED");
            await message.channel.send(militaryStore);
        }
    }
};
exports.buy = {
    name: "buy",
    description: "You can buy items from store",
    group: "economy",
    owner: false,
    async execute(message, client, args) {
        if (args.length === 0) {
            return message.channel.send(`Please check \`${await (await db_1.getServer(message.guild.id)).prefix}store\` to see items availabe`);
        }
        let u = await db_1.getUser(message.author.id);
        if (!u)
            return message.reply(`Use \`${await (await db_1.getServer(message.guild.id)).prefix}create\` to make a profile`);
        let len = 0;
        switch (args[0]) {
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
            case "country":
                if (args[1] === "ship") {
                    u.navy.citizen += parseInt(args[2]);
                }
                else if (args[1] === "soldier") {
                    u.army.citizen += parseInt(args[2]);
                }
                len += 1;
                break;
            default:
                return message.reply("You must mention what you want to buy in one of these formats: "
                    + "\`food, clone, human, mines, renewable, hotfusion, coldfusion, <corpo | country> <ship | soldir>\`");
        }
    }
};
