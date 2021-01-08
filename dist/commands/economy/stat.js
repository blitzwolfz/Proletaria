"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.earnings = exports.userstats = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../../util/db");
exports.userstats = {
    name: "stats",
    description: "View your stats",
    group: "stats",
    owner: false,
    async execute(message, client, args) {
        var _a, _b, _c, _d, _e;
        let u = await db_1.getUser(((_c = (_b = (_a = message.mentions) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b.first()) === null || _c === void 0 ? void 0 : _c.id) || args[0] || message.author.id);
        let id = (((_e = (_d = message.mentions) === null || _d === void 0 ? void 0 : _d.users) === null || _e === void 0 ? void 0 : _e.first()) || await client.users.cache.get(args[0]) || message.author);
        if (!u) {
            return message.reply("Please make a user account using the create command");
        }
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setAuthor(`${id.tag}`)
            .setColor('#BC0057')
            .setThumbnail(`${id.displayAvatarURL()}`)
            .addFields({ name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline: false }, { name: `Total Population`, value: `${u.resources.people.clone + u.resources.people.human} ${u.resources.peoplename}`, inline: true }, { name: `Total Human Population`, value: `${u.resources.people.human} ${u.resources.peoplename}`, inline: true }, { name: `Total Clone Population`, value: `${u.resources.people.clone} ${u.resources.peoplename}`, inline: true }, { name: 'Food', value: u.resources.food, inline: true }, { name: `Metal`, value: `${u.resources.metal}`, inline: true }, { name: `Energy`, value: `${u.resources.energy}`, inline: true }, { name: `${u.armyname}`, value: `${u.army.corpo + u.army.citizen} Total Soldiers`, inline: true }, { name: `${u.armyname}`, value: `${u.army.citizen} ${u.resources.peoplename} Soldiers`, inline: true }, { name: `${u.armyname}`, value: `${u.army.corpo} Private Soldiers`, inline: true }, { name: `${u.navyname}`, value: `${u.navy.corpo + u.navy.citizen} Total Ships`, inline: true }, { name: `${u.navyname}`, value: `${u.navy.citizen} ${u.resources.peoplename} Ships`, inline: true }, { name: `${u.navyname}`, value: `${u.navy.corpo} Private Ship`, inline: true }, { name: `Renewable Energy:`, value: `${u.generators.energy.renewable} Energy Farm`, inline: true }, { name: `Hot Fusion`, value: `${u.generators.energy.hotfusion} Reactor`, inline: true }, { name: `Cold Fusion`, value: `${u.generators.energy.coldfusion} Reactor`, inline: true }));
    }
};
exports.earnings = {
    name: "earnings",
    description: "View your gross earning from resource generation",
    group: "stats",
    owner: false,
    async execute(message, client, args) {
        let u = await db_1.getUser(message.author.id);
        if (!u) {
            return message.reply("Please make a user account using the create command");
        }
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setAuthor(`${message.author.tag}`)
            .setColor('#BC0057')
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addFields({ name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline: false }));
    }
};
