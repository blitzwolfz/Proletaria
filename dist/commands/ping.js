"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.nerdping = void 0;
exports.nerdping = {
    name: "nerdping",
    description: "Ping!",
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
