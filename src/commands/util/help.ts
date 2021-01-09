import { Client, Message, MessageEmbed } from "discord.js"
import { Command } from "../../types"
import { getConfig, getServer } from "../../util/db"
import * as c from "./../index"

export const help: Command = {
    name: "help",
    group:"help",
    description: "Access the help menu",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        if(args.length === 0){

            let string:any = ""
            let array:Array<String> = []
            c.default.forEach(c => array.push(c.group))

            array.splice(0, array.length, ...(new Set(array)))
            string = array.join(' ')

            return await message.channel.send(
                `The following command groups are availabe. Please do ${await (await getServer(message.guild!.id)).prefix}help <group-name>:\n` +
                `\`${string}\``
            )
        }

        if(c.default.find(c => c.name === args[0])){
            let g = args[0]

            const embed = new MessageEmbed()
                .setTitle(`${await (await getServer(message!.guild!.id!)).prefix}${g}`)

                .setDescription(c.default.map(
                    cmd => {
                        if(cmd.name === g) return cmd.description
                    }
                ))
                .setColor(await (await getConfig()).colour)
                .setFooter(`You can send \`${await (await getServer(message!.guild!.id!)).prefix}help <command name>\` to get info on a specific command!`);

            await message.channel.send(embed)
        }

        if(c.default.find(c => c.group === args[0])){
            let g = args[0]

            const embed = new MessageEmbed()
                .setTitle(`Here's a list of my ${g} commands:`)

                .setDescription(c.default.map(cmd => {
                    if (g === cmd.group) {
                        if (cmd.owner) {
                            return "`"+"§" + cmd.name + "`" + "\n"
                        }

                        return "`" + cmd.name + "`" + "\n"
                    }

                }
                ).join(""))
                .setColor(await (await getConfig()).colour)
                .setFooter(`You can send \`${await (await getServer(message!.guild!.id!)).prefix}help <command name>\` to get info on a specific command!`);

            await message.channel.send(embed)
        }
    }
}

export const guide: Command = {
    name: "guide",
    group:"help",
    description: "Access the guide",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        let prefix = await (await getServer(message.guild!.id)).prefix
        let embed = new MessageEmbed()
        .setTitle("A Guide to Proletaria")
        .setColor(await (await getConfig()).colour)
        .addFields(
            {name: "To begin", value: `\`${prefix}create\`. This will start you with 1000 of each resource`},


            {name: "Earning money and food", value: `The basic commands \`${prefix}work\` and \`${prefix}beg\`` +
                                                "Work will get you a certain amount of money every 15 mins,"+
                                                "and beg will get you a certain amount of food every hour. "+
                                                "In addition your population will be taxed every day, each"+
                                                "person bringing in 5-10 money.",
            inline:false
            },
            
            {name: "Earning other resources", value: "In addition to food and money you have metal, people, and energy" +
                                                `You should check the ${prefix}store to see how to increase these resources`,
            inline:false
            },

            {name: "Consumption", value: "All of your items, wheter it be people, or mines consume resources. " +
                                                "Before buying something in the store, make sure that"+
                                                "you have enough resources to buy, and that you produce "+
                                                "enough resources to sustain them. You can check these stats " +
                                                `using the \`${prefix}earnings\` command`,
            inline:false
            }
        )
        .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")
        
        await message.channel.send(embed)
    }
}