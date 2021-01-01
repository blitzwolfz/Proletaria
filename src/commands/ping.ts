import { Client, Message } from "discord.js"
import { Command } from "../types"

// This will complain if you don't provide the right types for each property
export const nerdping: Command = {
    name: "nerdping",
    description: "Ping!",
    async execute(message: Message, client:Client, args: string[]){
        const m: Message = await message.channel.send("Ping?") as Message;
        await m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Discord API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}

export const ping: Command = {
    name: "ping",
    description: "Ping!",
    async execute(message: Message, client:Client, args: string[]){
        await message.channel.send("Pong!")
    }
}