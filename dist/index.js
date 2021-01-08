"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatecommands = exports.removecommands = exports.reloadcommands = exports.prefix = exports.client = void 0;
const glob = require("glob");
const util_1 = require("util");
const Discord = __importStar(require("discord.js"));
const db_1 = require("./util/db");
require('dotenv').config();
const globPromise = util_1.promisify(glob);
exports.client = new Discord.Client;
exports.prefix = process.env.prefix;
const c = __importStar(require("./commands/index"));
const loops_1 = require("./commands/util/loops");
var commands = c.default;
const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
var _server = http.createServer(app);
app.get('/', (_request, response) => {
    response.sendFile(__dirname + "/index.html");
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
exports.client.once("ready", async () => {
    var _a;
    await db_1.connectToDB();
    setInterval(async function () {
        await loops_1.megaloop(exports.client);
    }, 1000);
    try {
        db_1.getServers().then(server => {
            if (server.length < exports.client.guilds.cache.array().length)
                exports.client.guilds.cache.array().forEach(async (el) => {
                    var _a;
                    db_1.updateServer({
                        _id: el.id,
                        name: el.name,
                        prefix: ((_a = (await db_1.getServer(el.id))) === null || _a === void 0 ? void 0 : _a.prefix) || "??"
                    }, true);
                });
        });
    }
    catch (e) {
        console.log("Could not update all servers");
    }
    console.log(`Logged in as ${(_a = exports.client.user) === null || _a === void 0 ? void 0 : _a.tag}\nPrefix is ${exports.prefix}`);
    console.log(`In ${exports.client.guilds.cache.size} servers\nTotal users is ${exports.client.users.cache.size}`);
});
exports.client.on("guildCreate", async (guild) => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    await exports.client.user.setActivity(`??help | ${exports.client.users.cache.size} users on ${exports.client.guilds.cache.size} servers`);
    await db_1.insertServer({
        _id: guild.id,
        name: guild.name,
        prefix: "??"
    });
});
exports.client.on("guildDelete", async (guild) => {
    console.log(`I have been removed from: ${guild === null || guild === void 0 ? void 0 : guild.name} (id: ${guild === null || guild === void 0 ? void 0 : guild.id})`);
    await exports.client.user.setActivity(`.help | ${exports.client.users.cache.size} users on ${exports.client.guilds.cache.size} servers`);
    if (guild)
        await db_1.deleteServer(guild.id);
});
exports.client.on("message", async (message) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (message.author.bot) {
        return;
    }
    exports.prefix = (_b = (await db_1.getServer((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id))) === null || _b === void 0 ? void 0 : _b.prefix;
    var args;
    if (message.content.startsWith(exports.prefix)
        || message.content.startsWith(process.env.prefix)
        || message.content.startsWith(`<@!${(_c = exports.client.user) === null || _c === void 0 ? void 0 : _c.id}>`)) {
        if (message.content.startsWith(process.env.prefix)) {
            args = message.content.slice((process.env.prefix.length)).trim().split(/ +/g);
        }
        else if (message.content.startsWith(`<@!${(_d = exports.client.user) === null || _d === void 0 ? void 0 : _d.id}>`)) {
            args = message.content.slice((`<@!${(_e = exports.client.user) === null || _e === void 0 ? void 0 : _e.id}>`.length)).trim().split(/ +/g);
        }
        else {
            args = message.content.slice((exports.prefix.length)).trim().split(/ +/g);
        }
    }
    else
        return;
    const commandName = (_f = args === null || args === void 0 ? void 0 : args.shift()) === null || _f === void 0 ? void 0 : _f.toLowerCase();
    if (!commandName)
        return;
    console.log(commandName);
    if (commandName === "test") {
        if (message.author.id !== process.env.owner) {
            await message.reply("nah b");
        }
    }
    if (commandName === "removecommands") {
        if (message.author.id !== process.env.owner) {
            await message.reply("nah b");
        }
        await message.reply(await removecommands(commands, args));
    }
    if (commandName === "reloadcommands") {
        if (message.author.id !== process.env.owner) {
            await message.reply("nah b");
        }
        await message.reply(await reloadcommands(commands));
    }
    if (commandName === "allcommands") {
        if (message.author.id !== process.env.owner) {
            await message.reply("nah b");
        }
        await message.channel.send("Commands available are:");
        for (let cc of commands) {
            if (!await (await db_1.getConfig()).removecommands.includes(cc.name))
                await message.channel.send(cc.name);
        }
    }
    const command = commands.find(c => c.name.toLowerCase() === commandName);
    if (command) {
        if (command.owner) {
            try {
                if (message.author.id !== process.env.owner)
                    return message.reply("Can't use this command.");
                await command.execute(message, exports.client, args, process.env.owner);
            }
            catch (error) {
                await message.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("ERROR")
                    .addFields({ name: 'Channel Name', value: `${(await exports.client.channels.fetch(message.channel.id)).name}`, inline: true }, { name: 'Channel Id', value: `${message.channel.id}`, inline: true }, { name: 'Guild Id', value: `${(_g = message.guild) === null || _g === void 0 ? void 0 : _g.id}`, inline: true }, { name: 'Guild Name', value: `${(_h = message.guild) === null || _h === void 0 ? void 0 : _h.name}`, inline: true }, { name: 'User', value: `${message.author.tag}`, inline: true }, { name: 'User Id', value: `${message.author.id}`, inline: true })
                    .setDescription(`\`\`\`${error.message}\`\`\``));
            }
        }
        else {
            try {
                await command.execute(message, exports.client, args);
            }
            catch (error) {
                await message.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("ERROR")
                    .addFields({ name: 'Channel Name', value: `${(await exports.client.channels.fetch(message.channel.id)).name}`, inline: true }, { name: 'Channel Id', value: `${message.channel.id}`, inline: true }, { name: 'Guild Id', value: `${(_j = message.guild) === null || _j === void 0 ? void 0 : _j.id}`, inline: true }, { name: 'Guild Name', value: `${(_k = message.guild) === null || _k === void 0 ? void 0 : _k.name}`, inline: true }, { name: 'User', value: `${message.author.tag}`, inline: true }, { name: 'User Id', value: `${message.author.id}`, inline: true })
                    .setDescription(`\`\`\`${error.message}\`\`\``));
            }
        }
    }
});
async function reloadcommands(localcommands) {
    localcommands = c.default;
    let config = await db_1.getConfig();
    config.removecommands = [];
    await db_1.updateConfig(config, true);
    commands = localcommands;
    return "Reloaded commands";
}
exports.reloadcommands = reloadcommands;
async function removecommands(localcommands, args) {
    console.log(localcommands.length);
    args = args.join(" ").split(/[,]+/);
    console.log(args);
    let config = await db_1.getConfig();
    for (let co of localcommands) {
        console.log(co.name);
        console.log(args.includes(co.name));
        if (args.includes(co.name))
            config.removecommands.push(co.name);
    }
    await db_1.updateConfig(config, true);
    await updatecommands(localcommands);
    return "Removed commands";
}
exports.removecommands = removecommands;
async function updatecommands(localcommands) {
    localcommands = [];
    console.log(localcommands);
    let config = await db_1.getConfig();
    for (let cc of c.default) {
        if (!config.removecommands.includes(cc.name))
            localcommands.push(cc);
    }
    console.log(localcommands);
    commands = localcommands;
}
exports.updatecommands = updatecommands;
exports.client.login(process.env.token2);
