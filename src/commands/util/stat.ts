import { Client, Message, MessageEmbed } from "discord.js"

import { Command } from "../../types"
import { getUser } from "../../util/db";

export const userstats: Command = {
    name: "stats",
    description: "View your stats",
    group:"stats",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        let u = await getUser(message.author.id)

        if(!u){
            return message.reply("Please make a user account using the create command")
        }
        

        return message.channel.send(
            new MessageEmbed()
            .setAuthor(`${message.author.tag}`)
            .setThumbnail(message.author.displayAvatarURL())
            .addFields(
                { name: `Total Population`, value: `${u.resources.people} ${u.resources.peoplename}`, inline:false },

                { name: '\u200b', value: '\u200b' },
                { name: 'Food', value: u.resources.food, inline: true },
                { name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline:true },

                { name: '\u200b', value: '\u200b' },
                { name: `${u.armyname}`, value: `${u.army} Soldiers`, inline: true },
                { name: `${u.navyname}`, value: `${u.navy} Ships`, inline: true },
            )
        )
    }
}