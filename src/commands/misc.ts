import { Client, Message, MessageEmbed } from "discord.js"
import { Command } from "../types"

// This will complain if you don't provide the right types for each property
export const nerdping: Command = {
    name: "nerdping",
    description: "More Ping!",
    group:"misc",
    owner:false,
    async execute(message: Message, client:Client, args: string[], ownerID:string){
        const m: Message = await message.channel.send("Ping?") as Message;
        await m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Discord API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}

export const ping: Command = {
    name: "ping",
    group:"misc",
    description: "Ping!",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        await message.channel.send("Pong!")
    }
}

export const helpserver: Command = {
    name: "server",
    group:"misc",
    description: "Join the official help server for bot support",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        await message.channel.send(
            new MessageEmbed()
            .setTitle("**Server**")
            .setURL('https://discord.gg/zraE4YBYv2')
            .setDescription('Official bot server. To help you with all your bot needs')
        )
    }
}

export const botinvite: Command = {
    name: "invite",
    group:"misc",
    description: "Want the bot in your own server? Now you can!",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        await message.channel.send(
            new MessageEmbed()
            .setTitle("**Invite**")
            .setURL('https://discord.com/api/oauth2/authorize?client_id=786636785194762250&permissions=0&scope=bot%20applications.commands')
            .setDescription("Invite the bot to your own server!")
        )
    }
}