import { Client, Message } from "discord.js"
import { Command } from "../../types"
import { getServer, updateServer } from "../../util/db"

require('dotenv').config()

export const prefix: Command = {
    name: "prefix",
    description: "View server prefix or add an arg to change it",
    group:"server",
    owner:true,
    async execute(message: Message, client:Client, args: string[], ownerID:string){
        let s = await getServer(message.guild!.id!)
        console.log(args)
        if(args.length === 0){
            return message.reply(`The server prefix is ${s.prefix}`)
        }

        if(!(
            message.member?.hasPermission(["ADMINISTRATOR", "MANAGE_GUILD"])
        ) && !(
            ownerID === process.env.owner
        )&& !(
            process.env.mods!.split(",").includes(message.author.id)
        )
        
        )  return message.reply("you need manage server permissions to change the prefix!");

        
        if (!args[0]) return message.reply(`please follow the syntax of ${s.prefix}prefix \`new prefix\``);
        
        s.prefix = args[0]

        updateServer(s, true).then(() => message.reply(`New prefix of \`${args[0]}\` has updated on ${message.guild?.name}`));

    }
}
