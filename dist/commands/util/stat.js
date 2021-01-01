"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userstats = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../../util/db");
exports.userstats = {
    name: "stats",
    description: "View your stats",
    async execute(message, client, args) {
        let u = await db_1.getUser(message.author.id);
        if (!u) {
            return message.reply("Please make a user account using the create command");
        }
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setAuthor(`${message.author.tag}`)
            .setThumbnail(message.author.displayAvatarURL())
            .addFields({ name: `Total Population`, value: `${u.resources.people} ${u.resources.peoplename}`, inline: false }, { name: '\u200b', value: '\u200b' }, { name: 'Food', value: u.resources.food, inline: true }, { name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline: true }, { name: '\u200b', value: '\u200b' }, { name: `${u.armyname}`, value: `${u.army} Soldiers`, inline: true }, { name: `${u.navyname}`, value: `${u.navy} Ships`, inline: true }));
    }
};
