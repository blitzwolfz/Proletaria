import { Client, Message } from "discord.js"
import { Command } from "../../../types"
import { getUser, updateUser } from "../../../util/db"
import { modpayouts, payout } from "../../util/loops"

require('dotenv').config()


export const modadd: Command = {
    name: "mod-add",
    description: "Allows mod to give you an item",
    group: "economy",
    owner: true,
    async execute(message: Message, client: Client, args: string[], ownerID: string) {

        if (message.author.id !== ownerID && !process.env.mods?.split(",").includes(message.author.id)) {
            return await message.reply("You are not allowed to use this command. If you feel that this is in error, contact owner.")
        }

        if (message.mentions.users.array().length === 0 && args.length === 0) {
            return await message.reply("You either must mention the user, or give the user's id")
        }

        else {
            let u = await getUser(message.mentions?.users?.first()?.id || args[0])

            if (!u) return await message.reply("This user could not be found.")

            if (message.mentions.users.array().length > 0 || args.length > 3) args.shift()

            //money, food, clone, human, mines, renewable, hotfusion, coldfusion, <corpo | citizen> <ship | soldir>
            if (args.length === 0 || args.length === 1) return message.reply("You must mention the type of resource using dot format. "
                + "\`money, food, clone, human, mines, renewable, hotfusion, coldfusion, <corpo | citizen> <ship | soldir>\`")

            let len = 1
            switch (args[0]) {
                case "money":
                    u.resources.money += parseInt(args[1])
                    break;

                case "food":
                    u.resources.food += parseInt(args[1])
                    break;

                case "human":
                    u.resources.people.human += parseInt(args[1])
                    break;

                case "clone":
                    u.resources.people.clone += parseInt(args[1])
                    break;

                case "mines":
                    u.generators.mines += parseInt(args[1])
                    break;

                case "renewable":
                    u.generators.energy.renewable += parseInt(args[1])
                    break;

                case "hotfusion":
                    u.generators.energy.hotfusion += parseInt(args[1])
                    break;

                case "corpo":
                    if (args[1] === "ship") {
                        u.navy.corpo += parseInt(args[2])
                    }

                    else if (args[1] === "soldier") {
                        u.army.corpo += parseInt(args[2])
                    }
                    len += 1

                    break;

                case "citizen":
                    if (args[1] === "ship") {
                        u.navy.citizen += parseInt(args[2])
                    }

                    else if (args[1] === "soldier") {
                        u.army.citizen += parseInt(args[2])
                    }

                    len += 1
                    break;
                default:
                    return message.reply("That is not a supported type")
            }

            await updateUser(u)

            return message.reply(`Added ${args[len-1]} ${args.slice(0, len-1).join('')} to user.`)
        }

    }
}

export const payoutUser: Command = {
    name: "payoutuser",
    description: "Allows mod to give a user a payout",
    group: "economy",
    owner: true,

    async execute(message: Message, client: Client, args: string[], ownerID: string) {
        if (message.author.id !== ownerID && !process.env.mods?.split(",").includes(message.author.id)) {
            return await message.reply("You are not allowed to use this command. If you feel that this is in error, contact owner.")
        }

        let id = message.mentions.users.first()?.id || args[0]

        let u = await getUser(id)

        if(!u) return message.reply("This user does not exist? Please try again")

        await payout(u)
    }
}

export const payouAllUsers: Command = {
    name: "payoutalluser",
    description: "Gives a payout to all users. Can only be used by mods",
    group: "economy",
    owner: true,

    async execute(message: Message, client: Client, args: string[], ownerID: string) {
        if (message.author.id !== ownerID) {
            return await message.reply("You are not allowed to use this command. If you feel that this is in error, contact owner.")
        }

        await modpayouts()
    }
}