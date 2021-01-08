import { Client, Message, MessageEmbed } from "discord.js"

import { Command } from "../../types"
import { getUser } from "../../util/db";

export const userstats: Command = {
    name: "stats",
    description: "View your stats",
    group:"stats",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        let u = await getUser(message.mentions?.users?.first()?.id || args[0] || message.author.id)
        let id = (message.mentions?.users?.first() || await client.users.cache.get(args[0]) || message.author);
        
        if(!u){
            return message.reply("Please make a user account using the create command")
        }
        
        return message.channel.send(
            new MessageEmbed()
            .setAuthor(`${id.tag}`)
            .setColor('#BC0057')
            .setThumbnail(`${id.displayAvatarURL()}`)
            .addFields(
                { name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline:false },

                //{ name: '\u200b', value: '\u200b' },
                { name: `Total Population`, value: `${u.resources.people.clone + u.resources.people.human} ${u.resources.peoplename}`, inline:true },
                { name: `Total Human Population`, value: `${u.resources.people.human} ${u.resources.peoplename}`, inline:true },
                { name: `Total Clone Population`, value: `${u.resources.people.clone} ${u.resources.peoplename}`, inline:true },
                
                //{ name: '\u200b', value: '\u200b' },
                { name: 'Food', value: u.resources.food, inline: true },
                { name: `Metal`, value: `${u.resources.metal}`, inline:true },
                { name: `Energy`, value: `${u.resources.energy}`, inline:true },
                
                //{ name: '\u200b', value: '\u200b' },
                { name: `${u.armyname}`, value: `${u.army.corpo+u.army.citizen} Total Soldiers`, inline: true },
                { name: `${u.armyname}`, value: `${u.army.citizen} ${u.resources.peoplename} Soldiers`, inline: true },
                { name: `${u.armyname}`, value: `${u.army.corpo} Private Soldiers`, inline: true },

                //{ name: '\u200b', value: '\u200b' },
                { name: `${u.navyname}`, value: `${u.navy.corpo+u.navy.citizen} Total Ships`, inline: true },
                { name: `${u.navyname}`, value: `${u.navy.citizen} ${u.resources.peoplename} Ships`, inline: true },
                { name: `${u.navyname}`, value: `${u.navy.corpo} Private Ship`, inline: true },

                //{ name: '\u200b', value: '\u200b' },
                { name: `Renewable Energy:`, value: `${u.generators.energy.renewable} Energy Farm`, inline: true },
                { name: `Hot Fusion`, value: `${u.generators.energy.hotfusion} Reactor`, inline: true },
                { name: `Cold Fusion`, value: `${u.generators.energy.coldfusion} Reactor`, inline: true },
            )
        )
    }
}

export const earnings: Command = {
    name: "earnings",
    description: "View your gross earning from resource generation",
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
            .setColor('#BC0057')
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addFields(
                { name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline:false },
            )
        )
    }
}

/*user {
    _id: string;
    resources:{
        money:number,
        currencyname:string;
        food:number;
        people:{
            clone:number,
            human:number;
        }
        peoplename:string;
        metal:number,
        energy:number
    };
    generators:{
        mines:number,
        energy:{
            renewable:number,
            hotfusion:number,
            coldfusion:number,
        }
    }
    army:{
        corpo:number,
        citizen:number;
    },
    armyname:string;
    navy:{
        corpo:number,
        citizen:number;
    },
    navyname:string;
}*/