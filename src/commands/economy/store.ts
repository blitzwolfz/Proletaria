import { Client, Message, MessageEmbed } from "discord.js"
import { Command } from "../../types";
import { getServer, getUser, updateUser } from "../../util/db";


// This will complain if you don't provide the right types for each property
export const store: Command = {
    name: "store",
    description: "Brings you to economy store",
    group: "economy",
    owner: false,
    async execute(message: Message, client: Client, args: string[]) {

        if (args.length === 0) {
            //await message.channel.send()
            return message.channel.send("Three stores available: military, population, resources")
        }

        if (args[0].toLowerCase() === "military") {
            const militaryStore = new MessageEmbed()
                .setTitle("Military Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields(
                    { name: `Your balance:`, value: `${(await getUser(message.author.id))?.resources.money} ${(await getUser(message.author.id))?.resources.currencyname}`, inline: false },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Recuirt Soldiers:`, value: `Costs 1.5k. Recruit loyal citizens to fight for the motherland, with your pop decreasing by one, each soldier having 500 power. To maintain you need 750 food, and 250 money a day`, inline: true },
                    { name: `Private Corpo Soldiers:`, value: `Costs 12.5k. A Private Corporation will provide you with a soldier, each soldier having 1500 power. To maintain you need 2500 money a day`, inline: true },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Build a ship:`, value: `Costs 10.5k. Build ships to strengthen your Naval power. To maintain you need 550 food, and 1k money a day, 300 metal`, inline: true },
                    { name: `Private Corpo Ship:`, value: `Costs 25.5k. A Private Corporation will provide you with a ship. To maintain you need 10k money `, inline: true },
                )
                .setColor("RED")
                .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")


            await message.channel.send(militaryStore)
        }

        else if (args[0].toLowerCase() === "population") {
            const militaryStore = new MessageEmbed()
                .setTitle("Population Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields(
                    { name: `Your balance:`, value: `${(await getUser(message.author.id))?.resources.money} ${(await getUser(message.author.id))?.resources.currencyname}`, inline: false },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Immigration:`, value: `Costs 500/person. Open your broders to make loyal citizens for the motherland. Each person can become soldier. Each person costs 10 currency, 1 food to maintain.`, inline: true },
                    { name: `Cloning Vat:`, value: `Costs 5k/1000 people. A Private Corporation will grow you loyal citizens. Clones can't become soldiers. Each person costs 10 currency, 1 food to maintain.`, inline: true },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Farm:`, value: `Costs 1k currency, 500 metal. Each farm will provide you 1000 food daily. To maintain, you need 100 currency, 100 energy`, inline: true },
                    { name: `Private Corpo Farm:`, value: `Costs 100k. A Private Corporation will give you daily 10k food. To maintain, you need 1k currency`, inline: true },
                )
                .setColor("RED")
                .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")


            await message.channel.send(militaryStore)
        }

        else if (args[0].toLowerCase() === "resources") {
            const militaryStore = new MessageEmbed()
                .setTitle("Resources Store")
                .setDescription(`Currently available items Use ??item \`Item name\` buy to buy, and view to view `)
                .addFields(
                    { name: `Your balance:`, value: `${(await getUser(message.author.id))?.resources.money} ${(await getUser(message.author.id))?.resources.currencyname}`, inline: false },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Mine:`, value: `Costs 100 currency. Gives you 200 metal per day. To maintain it costs 50 currency, 10 energy.`, inline: true },
                    { name: `Food:`, value: `Costs 500 currency. Gives you 1000 per pack`, inline: true },
                    //{ name: `Cloning Vat:`, value:`Costs 10k/1000 people. A Private Corporation will grow you loyal slaves. Each person costs 10 currency, 1 food.`, inline:true },

                    { name: '\u200b', value: '\u200b' },
                    { name: `Renewables`, value: `Costs 1k currency, 2k metal. Will provide you with 350 Energy per day. To maintain, you need 100 currency, 100 energy`, inline: true },
                    { name: `Hot Fusion Reactor`, value: `Costs 10k currency, 9k metal, 2k energy. Will provide you with 1k Energy per day. To maintain, you need 4k currency, 3k metal`, inline: true },
                    { name: `Cold Fusion Reactor`, value: `Costs 500k currency, 250k metal, 750k energy. Will provide you with 200k Energy per day. To maintain, you need 50k currency, 20k metal`, inline: true },
                    //{ name: `Star Generator`, value:`Costs 1 Billion currency, 2k metal. Will provide you with 100 Energy per day. To maintain, you need 100 currency, 100 energy`, inline:true },
                )
                .setColor("RED")
                .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")


            await message.channel.send(militaryStore)
        }
    }
}

export const buy: Command = {
    name: "buy",
    description: "You can buy items from store",
    group: "economy",
    owner: false,
    async execute(message: Message, client: Client, args: string[]) {

        if (args.length === 0) {
            //await message.channel.send()
            return message.channel.send(`Please check \`${await (await getServer(message.guild!.id!)).prefix}store\` to see items availabe`)
        }

        let u = await getUser(message.author.id)

        if(!u) return message.reply(`Use \`${await (await getServer(message.guild!.id!)).prefix}create\` to make a profile`)

        let len = 0
        console.log(len)
        switch (args[0]) {
            case `food`:
                if(u.resources.money < (500 * parseInt(args[1]))){
                    return message.reply(`You need ${(500 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }
                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.resources.food += (500 * parseInt(args[1]))
                u.resources.money -= (500 * parseInt(args[1]))
                break;

            case "immigration":
                if(u.resources.money < (500 * parseInt(args[1]))){
                    return message.reply(`You need ${(500 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }
                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.resources.people.human += parseInt(args[1])
                u.resources.money -= (500 * parseInt(args[1]))
                break;

            case "clone":
                if(u.resources.money < (1000 * parseInt(args[1]))){
                    return message.reply(`You need ${(1000 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }
                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.resources.people.clone += (1000*parseInt(args[1]))
                u.resources.money -= (5000 * parseInt(args[1]))
                break;
            case "mines":
                if(u.resources.money < (100 * parseInt(args[1]))){
                    return message.reply(`You need ${(100 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }

                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.generators.mines += parseInt(args[1])
                u.resources.money -= (100 * parseInt(args[1]))
                break;
            
            case "renewable":
                if(u.resources.money < (1000 * parseInt(args[1]))){
                    return message.reply(`You need ${(1000 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }
                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.generators.energy.renewable += parseInt(args[1])
                u.resources.money -= (1000 * parseInt(args[1]))
                break;

            case "hotfusion":
                if(u.resources.money < (10000 * parseInt(args[1]))){
                    return message.reply(`You need ${(10000 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }
                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.generators.energy.hotfusion += parseInt(args[1])
                u.resources.money -= (10000 * parseInt(args[1]))
                break;

            case "coldfusion":
                if(u.resources.money < (500000 * parseInt(args[1]))){
                    return message.reply(`You need ${(500000 * parseInt(args[1]))} ${u.resources.currencyname}`)
                }
                if(!args[1]) return message.reply("Please state how many you wish to buy")
                u.generators.energy.coldfusion += parseInt(args[1])
                u.resources.money -= (500000 * parseInt(args[1]))
                break;

            case "country":
                if (args[1] === "ship") {
                    if(u.resources.money < (10500 * parseInt(args[2]))){
                        return message.reply(`You need ${(10500 * parseInt(args[2]))} ${u.resources.currencyname}`)
                    }
                    if(!args[2]) return message.reply("Please state how many you wish to buy")
                    u.navy.citizen += parseInt(args[2])
                    u.resources.money -= (10500 * parseInt(args[2]))
                }

                else if (args[1] === "soldier") {
                    if(u.resources.money < (1500 * parseInt(args[2]))){
                        return message.reply(`You need ${(1500 * parseInt(args[2]))} ${u.resources.currencyname}`)
                    }
                    if(!args[2]) return message.reply("Please state how many you wish to buy")
                    u.army.citizen += parseInt(args[2])
                    u.resources.money -= (1500 * parseInt(args[2]))
                }

                else if (args[1] === "farm") {
                    if(u.resources.money < (1000 * parseInt(args[2]))){
                        return message.reply(`You need ${(1000 * parseInt(args[2]))} ${u.resources.currencyname}`)
                    }
                    if(!args[2]) return message.reply("Please state how many you wish to buy")
                    u.generators.farms.citizen += parseInt(args[2])
                    u.resources.money -= (1000 * parseInt(args[2]))
                }

                break;

                case "corpo":
                    if (args[1] === "ship") {
                        if(u.resources.money < (25500 * parseInt(args[2]))){
                            return message.reply(`You need ${(25500 * parseInt(args[2]))} ${u.resources.currencyname}`)
                        }
                        if(!args[2]) return message.reply("Please state how many you wish to buy")
                        u.navy.corpo += parseInt(args[2])
                        u.resources.money -= (25500 * parseInt(args[2]))
                    }
    
                    else if (args[1] === "soldier") {
                        if(u.resources.money < (12500 * parseInt(args[2]))){
                            return message.reply(`You need ${(12500 * parseInt(args[2]))} ${u.resources.currencyname}`)
                        }
                        if(!args[2]) return message.reply("Please state how many you wish to buy")
                        u.army.corpo += parseInt(args[2])
                        u.resources.money -= (12500 * parseInt(args[2]))
                    }

                    else if (args[1] === "farm") {
                        if(u.resources.money < (100000 * parseInt(args[2]))){
                            return message.reply(`You need ${(100000 * parseInt(args[2]))} ${u.resources.currencyname}`)
                        }
                        if(!args[2]) return message.reply("Please state how many you wish to buy")
                        u.generators.farms.corpo += parseInt(args[2])
                        u.resources.money -= (100000 * parseInt(args[2]))
                    }
    
                    break;
    
            default:
                return message.reply("You must mention what you want to buy in one of these formats: "
                + "\`food, clone, immigration, mines, renewable, hotfusion, coldfusion, <corpo | country> < farm | ship | soldir>\`")
        }

        await updateUser(u)
        if(args.length === 2) return message.reply(`You successfully bought ${args[1]} ${args[0]}`)
        if(args.length === 3) return message.reply(`You successfully bought ${args[2]} ${args[0]} ${args[1]}`)

    }
}