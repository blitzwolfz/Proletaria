import { TextChannel } from "discord.js";
import { Client } from "discord.js";
import { user } from "../../types";
import { deleteReminder, getConfig, getReminders, getUsers, updateConfig, updateUser } from "../../util/db";
import { getRndInteger } from "../../util/util";

export async function megaloop(client:Client) {
    try {
        await foodreminderloop(client) 
    } catch (error) {
        console.log(error.message)
    }

    try {
        await workreminderloop(client) 
    } catch (error) {
        console.log(error.message)
    }
}

export async function workreminderloop(client: Client) {
    let r = await getReminders(
        { type: "work" }
    )

    for (let i of r) {
        if (Math.floor(Date.now() / 1000) - i.time > 900){
            try {
                (<TextChannel>await client.channels.fetch(i.channel)).send(
                    `<@${i._id.replace("money", "")}>, you can work again`
                )
                await deleteReminder(i)
            } catch (error) {
                client.users.cache.get(i._id)?.send(`<@${i._id.replace("money", "")}>, you can work again`)
                await deleteReminder(i)
            }
        }
    }
}

export async function foodreminderloop(client:Client) {
    let r = await getReminders(
        { type : "food" } 
    )
    for (let i of r) {
        if (Math.floor(Date.now() / 1000) - i.time > 3600){
            try {
                (<TextChannel>await client.channels.fetch(i.channel)).send(
                    `<@${i._id.replace("food", "")}>, you can beg again`
                )
            } catch (error) {
                client.users.cache.get(i._id)?.send(`<@${i._id.replace("food", "")}>, you can beg again`)
            }

            await deleteReminder(i)
        }
    }
}

export async function payouts() {
    let c = await getConfig()
    let users = await getUsers()

    if(Math.floor(Date.now() / 1000) - c.lastpayout >= 86400){
        
        let totalpayouts = Math.floor(86400/ (Math.floor(Date.now() / 1000) - c.lastpayout))
        
        c.lastpayout += 86400
        await updateConfig(c, true)

        for(let u of users){
            for(let i = 0; i < totalpayouts; i++){
                await payout(u)
            }
        }
    }
}

export async function modpayouts() {
    let users = await getUsers()

    for(let u of users){
        await payout(u)
    }
}

export async function payout(u:user) {

    let pE = 0;

    for(let x = 0; x < (u.resources.people.human + u.resources.people.clone); x++){
        pE += await getRndInteger(15, 10, true)
    }


    let fE = (u.generators.farms.citizen * 1000) + (u.generators.farms.corpo * 10000)
    let mE = u.generators.mines * 200
    let eE = (u.generators.energy.renewable * 300) + (u.generators.energy.hotfusion * 1000) + (u.generators.energy.coldfusion * 20000)
    
    let pC = (u.resources.people.human + u.resources.people.clone)*10 
    + u.generators.farms.citizen * 100 
    + u.generators.farms.corpo * 1000
    + u.generators.mines * 50
    + u.generators.energy.renewable * 100
    + u.generators.energy.hotfusion * 4000
    + u.generators.energy.coldfusion * 50000
    + u.army.citizen * 250
    + u.army.corpo * 2500
    + u.navy.citizen * 1000
    + u.navy.corpo * 10000

    let fC = (u.resources.people.human + u.resources.people.clone)*1 
    + u.army.citizen * 750
    + u.army.corpo * 0
    + u.navy.citizen * 550
    + u.navy.corpo * 0

    let mC = u.generators.energy.hotfusion * 3000
    + u.generators.energy.coldfusion * 20000
    + u.navy.citizen * 300

    let eC = u.generators.farms.citizen * 100 
    + u.generators.mines * 10
    + u.generators.energy.renewable * 100

    u.resources.money += (pE - pC)
    u.resources.food += (fE - fC)
    u.resources.metal += (mE - mC)
    u.resources.energy += (eE - eC)

    await updateUser(u)
}