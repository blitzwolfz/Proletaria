import { Client, Message } from "discord.js"

import { Command } from "../../types"
import { getReminder, getUser, inserReminder, updateUser } from "../../util/db";
import { toHHMMSS } from "../../util/util";

// This will complain if you don't provide the right types for each property
export const work: Command = {
    name: "work",
    description: "You can work every 15 mins to earn money",
    group:"economy",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        let u = await getUser(message.author.id)

        if(!u){
            return message.reply("Please make a user account using the create command")
        }

        let r = await getReminder(`${message.author.id}money`)

        if(r === null ||Math.floor(Date.now()/1000) - r!.time > 900){
            let m = Math.floor(Math.random() * 1000) + 1;
            u.resources.money += m
    
            await updateUser(u)

            await inserReminder({
                _id:`${message.author.id}money`,
                type:"work",
                time: Math.floor(Date.now()/1000),
                channel:message.channel.id
            })
    
            return message.reply(`Congrats on working successfully, you earned ${m}. You can work again in 15 mins`)
        }

        else{
            return message.reply(`You can work again in ${await toHHMMSS(r.time, 900)}`)
        }
    }
}

export const beg: Command = {
    name:"beg",
    group:"economy",
    description:"You can beg for food every hour to earn food",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        let u = await getUser(message.author.id)

        if(!u){
            return message.reply("Please make a user account using the create command")
        }

        let r = await getReminder(`${message.author.id}food`)

        if(r === null || Math.floor(Date.now()/1000) - r!.time > 3600){
            let f = Math.floor(Math.random() * 1000) + 1;
            u.resources.food += f
    
            await updateUser(u)
    
            await inserReminder({
                _id:`${message.author.id}food`,
                type:"food",
                time: Math.floor(Date.now()/1000),
                channel:message.channel.id
            })
    
            return message.reply(`Congrats on begging successfully, you earned ${f} food. You can beg again in a hour`)
        }

        else{
            return message.reply(`You can beg again in ${await toHHMMSS(r.time, 3600)}`)
        }
    }
}
