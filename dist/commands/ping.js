"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.nerdping = void 0;
exports.nerdping = {
    name: "nerdping",
    description: "Ping!",
    async execute(message, client, args) {
        const m = await message.channel.send("Ping?");
        await m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Discord API Latency is ${Math.round(client.ws.ping)}ms`);
    }
};
exports.ping = {
    name: "ping",
    description: "Ping!",
    async execute(message, client, args) {
        await message.channel.send("Pong!");
    }
};