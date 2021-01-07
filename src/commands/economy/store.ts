import { Client, Message, MessageEmbed } from "discord.js"
import { Command } from "../../types";
import { getServer, getUser } from "../../util/db";


// This will complain if you don't provide the right types for each property
export const store: Command = {
    name: "store",
    description: "Brings you to economy store",
    group:"economy",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){

        if(args.length === 0){
            //await message.channel.send()
            return message.channel.send("Three stores available: military, population, resources")
        }

        if(args[0].toLowerCase() === "military"){
            const militaryStore = new MessageEmbed()
                .setTitle("Military Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields(
                    { name: `Your balance:`, value:`${(await getUser(message.author.id))?.resources.money} ${(await getUser(message.author.id))?.resources.currencyname}`, inline:false },
                    
                    { name: '\u200b', value: '\u200b' },
                    { name: `Recuirt Soldiers:`, value:`Costs 1.5k. Recruit loyal citizens to fight for the motherland.`, inline:true },
                    { name: `Private Corpo Soldiers:`, value:`Costs 12.5k. A Private Corporation will provide you with a soldier.`, inline:true },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Build a ship:`, value:`Costs 10.5k. Build ships to strengthen your Naval power.`, inline:true },
                    { name: `Private Corpo Ship:`, value:`Costs 25.5k. A Private Corporation will provide you with a ship.`, inline:true },
                )
                .setColor("RED")

                await message.channel.send(militaryStore)
        }

        else if(args[0].toLowerCase() === "population"){
            const militaryStore = new MessageEmbed()
                .setTitle("Population Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields(
                    { name: `Your balance:`, value:`${(await getUser(message.author.id))?.resources.money} ${(await getUser(message.author.id))?.resources.currencyname}`, inline:false },
                    
                    { name: '\u200b', value: '\u200b' },
                    { name: `Immigration:`, value:`Costs 500/person. Open your broders to make loyal citizens for the motherland. Each person costs 10 currency, 1 food.`, inline:true },
                    { name: `Cloning Vat:`, value:`Costs 10k/1000 people. A Private Corporation will grow you loyal slaves. Each person costs 10 currency, 1 food.`, inline:true },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Farm:`, value:`Costs 1k currency, 500 metal. Each farm will provide you 1000 food daily. To maintain, you need 100 currency, 100 energy`, inline:true },
                    { name: `Private Corpo Farm:`, value:`Costs 100k. A Private Corporation will give you daily 10k food. To maintain, you need 1k currency`, inline:true },
                )
                .setColor("RED")

                await message.channel.send(militaryStore)
        }

        else if(args[0].toLowerCase() === "resources"){
            const militaryStore = new MessageEmbed()
                .setTitle("Resources Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields(
                    { name: `Your balance:`, value:`${(await getUser(message.author.id))?.resources.money} ${(await getUser(message.author.id))?.resources.currencyname}`, inline:false },
                    
                    { name: '\u200b', value: '\u200b' },
                    { name: `Mine:`, value:`Costs 100 currency. Gives you 200 metal. To maintain it costs 50 currency, 10 energy.`, inline:true },
                    //{ name: `Cloning Vat:`, value:`Costs 10k/1000 people. A Private Corporation will grow you loyal slaves. Each person costs 10 currency, 1 food.`, inline:true },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Renewables`, value:`Costs 1k currency, 2k metal. Will provide you with 100 Energy per day. To maintain, you need 100 currency, 100 energy`, inline:true },
                    { name: `Hot Fusion Reactor`, value:`Costs 10k currency, 9k metal, 2k energy. Will provide you with 1k Energy per day. To maintain, you need 4k currency, 3k metal`, inline:true },
                    { name: `Cold Fusion Reactor`, value:`Costs 500k currency, 250k metal, 750k energy. Will provide you with 200k Energy per day. To maintain, you need 50k currency, 20k metal`, inline:true },
                    //{ name: `Star Generator`, value:`Costs 1 Billion currency, 2k metal. Will provide you with 100 Energy per day. To maintain, you need 100 currency, 100 energy`, inline:true },
                )
                .setColor("RED")

                await message.channel.send(militaryStore)
        }
    }
}

export const buy: Command = {
    name: "buy",
    description: "You can buy items from store",
    group:"economy",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){

        if(args.length === 0){
            //await message.channel.send()
            message.channel.send(`Please check \`${await (await getServer(message.guild!.id!)).prefix}store\` to see items availabe`)
        }
    }
}