import { TextChannel } from "discord.js";
import { Client } from "discord.js";
import { deleteReminder, getReminders } from "../../util/db";

export async function megaloop(client:Client) {
    await workreminderloop(client)
    await foodreminderloop(client)
}

export async function workreminderloop(client:Client) {
    let r = await getReminders(
        { type : "work" } 
    )

    for(let i of r){
        if(Math.floor(Date.now()/1000) - i.time > 900){
            (<TextChannel>await client.channels.fetch(i.channel)).send(
                `<@${i._id.replace("money","")}>, you can work again`
            )
            await deleteReminder(i)
        }
    }
}

export async function foodreminderloop(client:Client) {
    let r = await getReminders(
        { type : "food" } 
    )

    for(let i of r){
        if(Math.floor(Date.now()/1000) - i.time > 3600){
            (<TextChannel>await client.channels.fetch(i.channel)).send(
                `<@${i._id.replace("food","")}>, you can beg again`
            )
            await deleteReminder(i)
        }
    }
}