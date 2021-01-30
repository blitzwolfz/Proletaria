"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rock8 = exports.botinvite = exports.helpserver = exports.ping = exports.nerdping = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("../util/util");
exports.nerdping = {
    name: "nerdping",
    description: "More Ping!",
    group: "misc",
    owner: false,
    async execute(message, client, args, ownerID) {
        const m = await message.channel.send("Ping?");
        await m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Discord API Latency is ${Math.round(client.ws.ping)}ms`);
    }
};
exports.ping = {
    name: "ping",
    group: "misc",
    description: "Ping!",
    owner: false,
    async execute(message, client, args) {
        await message.channel.send("Pong!");
    }
};
exports.helpserver = {
    name: "server",
    group: "misc",
    description: "Join the official help server for bot support",
    owner: false,
    async execute(message, client, args) {
        await message.channel.send(new discord_js_1.MessageEmbed()
            .setTitle("**Server**")
            .setURL('https://discord.gg/zraE4YBYv2')
            .setDescription('Official bot server. To help you with all your bot needs'));
    }
};
exports.botinvite = {
    name: "invite",
    group: "misc",
    description: "Want the bot in your own server? Now you can!",
    owner: false,
    async execute(message, client, args) {
        await message.channel.send(new discord_js_1.MessageEmbed()
            .setTitle("**Invite**")
            .setURL('https://discord.com/api/oauth2/authorize?client_id=786636785194762250&permissions=0&scope=bot%20applications.commands')
            .setDescription("Invite the bot to your own server!"));
    }
};
exports.rock8 = {
    name: "fuck",
    group: "misc",
    description: "",
    owner: false,
    async execute(message, client, args) {
        if (await util_1.getRndInteger(1, 5, true) !== 5) {
            return;
        }
        ;
        if (args.includes("fucking")) {
            let index = args.findIndex(x => x === "fucking");
            args[index] = "fuck";
        }
        if (args.includes("fucks")) {
            let index = args.findIndex(x => x === "fucks");
            args[index] = "fuck";
        }
        if (args.includes("fucked")) {
            let index = args.findIndex(x => x === "fucked");
            args[index] = "fuck";
        }
        if (args.includes("fuck")) {
            let one = args.join(" ").split("fuck")[0].split(" ");
            let two = args.join(" ").split("fuck")[1].split(" ");
            let string = "";
            if (one.join(" ")) {
                string += `guy named "${one.join(" ")}": 😏\n`;
            }
            if (two.join(" ")) {
                string += `girl named "${two.join(" ")}": 😳`;
            }
            if (string)
                return message.channel.send(string);
            else
                return;
        }
    }
};
