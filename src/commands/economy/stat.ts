import { Client, Message, MessageEmbed } from "discord.js"

import { Command } from "../../types"
import { getConfig, getUser } from "../../util/db";
import { toHHMMSS } from "../../util/util";

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
                { name: 'Money', value: `${u.resources.money} ${u.resources.currencyname}`, inline:true },
                { name: `Total Population`, value: `${u.resources.people.clone + u.resources.people.human} ${u.resources.peoplename}`, inline:true },
                { name: 'Food', value: u.resources.food, inline: true },

                //{ name: '\u200b', value: '\u200b' },
                { name: 'Debt Capacity ', value: `${((u.resources.people.clone + u.resources.people.human)*0.5)*100}%`, inline:true },
                { name: `Total Human Population`, value: `${u.resources.people.human} ${u.resources.peoplename}`, inline:true },
                { name: `Total Clone Population`, value: `${u.resources.people.clone} ${u.resources.peoplename}`, inline:true },
                
                //{ name: '\u200b', value: '\u200b' },
                { name: 'Mines', value: `${u.generators.mines}`, inline:true },
                { name: 'Farms', value: u.generators.farms.citizen, inline: true },
                { name: 'Private Farms', value: u.generators.farms.corpo, inline: true },


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
            .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")
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

        let pE = `${10*(u.resources.people.human + u.resources.people.clone)} - ${15*(u.resources.people.human + u.resources.people.clone)}`
        let fE = `${(u.generators.farms.citizen * 1000) + (u.generators.farms.corpo * 10000)}`
        let mE = `${u.generators.mines * 200}`
        let eE = `${(u.generators.energy.renewable * 300) + (u.generators.energy.hotfusion * 1000) + (u.generators.energy.coldfusion * 20000)}`
        
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

        return message.channel.send(
            new MessageEmbed()
            .setAuthor(`${message.author.tag}`)
            .setColor('#BC0057')
            .setDescription(`**Next Payout:** ${await toHHMMSS((await (await getConfig()).lastpayout), 86400)}`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addFields(
                { name: 'Gross Taxes', value: `${pE} ${u.resources.currencyname}`, inline:true },
                { name: 'Gross Money Consumption', value: `${pC}`, inline:true },
                { name: 'Net Money', value: `${parseInt(pE.split(" - ")[0])-pC} to ${parseInt(pE.split(" - ")[1])-pC}`, inline:true },
                
                { name: 'Gross Food', value: `${fE}`, inline:true },
                { name: 'Gross Food Consumption', value: `${fC}`, inline:true },
                { name: 'Net Food', value: `${parseInt(fE) - fC}`, inline:true },

                { name: 'Gross Metal', value: `${mE}`, inline:true },
                { name: 'Gross Metal Consumption', value: `${mC}`, inline:true },
                { name: 'Net Metal', value: `${parseInt(mE)-mC}`, inline:true },

                { name: 'Gross Energy', value: `${eE}`, inline:true },
                { name: 'Gross Energy Consumption', value: `${eC}`, inline:true },
                { name: 'Net Energy', value: `${parseInt(eE)-eC}`, inline:true },
            )
            .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")

        )
    }
}

/*user {
    _id: string;
    resources: {
        money: number; 
        currencyname: string;
        food: number;
        people: {
            clone: number;
            human: number;
        },
        peoplename: string;
        metal: number;
        energy: number;
    },
    generators: {
        mines: number;
        energy: {
            renewable: number,
            hotfusion: number,
            coldfusion: number,
        },
        farms:{
            citizen:number,
            corpo:number,
        },
    },
    army: {
        corpo: number;
        citizen: number;
    },
    armyname: string,
    navy: {
        corpo: number,
        citizen: number;
    },
    navyname: string,
}*/