"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rename = exports.createuser = void 0;
const __1 = require("../..");
const db_1 = require("../../util/db");
exports.createuser = {
    name: "create",
    description: "Create your user profile",
    group: "utility",
    owner: false,
    async execute(message, client, args) {
        if (await db_1.getUser(message.author.id))
            return message.reply("You already have an account");
        if (args.length < 4)
            return message
                .reply(`Error please follow command: ${await (await db_1.getServer(message.guild.id)).prefix || __1.prefix}create \`name of currency\`, \`name of people\`, \`name of army\`, \`name of navy\``);
        console.log(args);
        console.log(args.join(" "));
        args = args.join(" ").split(/[,]+/);
        console.log(args);
        let u = {
            _id: message.author.id,
            resources: {
                money: 0,
                currencyname: args[0],
                food: 0,
                people: 0,
                peoplename: args[1]
            },
            army: 0,
            armyname: args[2],
            navy: 0,
            navyname: args[3],
        };
        await db_1.inserUser(u);
        await message.channel.send("User profile made");
    }
};
exports.rename = {
    name: "rename",
    description: "Rename stuff",
    group: "utility",
    owner: false,
    async execute(message, client, args) {
        if (args.length === 0)
            return message.reply("What do you want to rename? user");
        if (args[0].toLowerCase() === "user") {
            let u = await db_1.getUser(message.author.id);
            if (!u)
                return message.reply("plese use create command to make an account");
            if (args.length === 1)
                return message.reply("Please specifiy what you want to rename: pop, money, army, navy");
            else {
                let key = "";
                switch (args[1]) {
                    case 'pop':
                        key = "peoplename";
                        break;
                    case 'money':
                        key = 'currencyname';
                        break;
                    case 'army':
                        key = 'armyname';
                        break;
                    case 'navy':
                        key = 'navyname';
                        break;
                    default:
                        return message.reply("Please specifiy what you want to rename: pop, money, army, navy");
                }
                if (["peoplename", "currencyname"].includes(key)) {
                    u.resources[key] = args.splice(2).join(" ");
                }
                else {
                    u[key] = args.splice(2).join(" ");
                }
                await db_1.updateUser(u);
                return message.reply(`Rename succesful!`);
            }
        }
    }
};
