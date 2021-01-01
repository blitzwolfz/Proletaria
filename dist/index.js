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
exports.commandloader = exports.prefix = exports.client = void 0;
const glob = require("glob");
const util_1 = require("util");
const Discord = __importStar(require("discord.js"));
const db_1 = require("./util/db");
require('dotenv').config();
const globPromise = util_1.promisify(glob);
exports.client = new Discord.Client;
exports.prefix = "??";
const c = __importStar(require("./commands/index"));
const loops_1 = require("./commands/util/loops");
const commands = c.default;
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
    console.log(`Logged in as ${(_a = exports.client.user) === null || _a === void 0 ? void 0 : _a.tag}\nPrefix is ${exports.prefix}`);
    console.log(`In ${exports.client.guilds.cache.size} servers\nTotal users is ${exports.client.users.cache.size}`);
    setInterval(async function () {
        console.time("Big loop goes brrr in");
        await loops_1.megaloop(exports.client);
        console.timeEnd("Big loop goes brrr in");
    }, 1000);
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
    var _a, _b, _c;
    if (message.author.bot) {
        return;
    }
    exports.prefix = (_b = (await db_1.getServer((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id))) === null || _b === void 0 ? void 0 : _b.prefix;
    if (!message.content.includes(exports.prefix))
        return;
    var args = message.content.slice(exports.prefix.length).trim().split(/ +/g);
    const commandName = (_c = args === null || args === void 0 ? void 0 : args.shift()) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    if (!commandName)
        return;
    if (commandName === "test") {
    }
    const command = commands.find(c => c.name.toLowerCase() === commandName);
    if (command) {
        await command.execute(message, exports.client, args);
    }
});
async function commandloader(commands, local) {
    const commandFiles = await globPromise(local);
    console.log(local);
    for (const file of commandFiles) {
        const command = await Promise.resolve().then(() => __importStar(require(file)));
        commands.push(command);
    }
}
exports.commandloader = commandloader;
exports.client.login(process.env.TOKEN);
