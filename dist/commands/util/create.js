"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rename = exports.userdelete = exports.createuser = void 0;
const __1 = require("../..");
const db_1 = require("../../util/db");
exports.createuser = {
    name: "create",
    description: "Create your user profile",
    group: "utility",
    owner: true,
    async execute(message, client, args, ownerID) {
        if (await db_1.getUser(message.author.id))
            return message.reply("You already have an account");
        if (args.length < 4)
            return message
                .reply(`Error please follow command: ${await (await db_1.getServer(message.guild.id)).prefix || __1.prefix}create \`name of currency\`, \`name of people\`, \`name of army\`, \`name of navy\``);
        args = args.join(" ").split(/[,]+/);
        console.log(args);
        let u = {
            _id: message.author.id,
            resources: {
                money: 0,
                currencyname: args[0],
                food: 0,
                people: {
                    clone: 0,
                    human: 0,
                },
                peoplename: args[1],
                metal: 0,
                energy: 0,
            },
            generators: {
                mines: 0,
                energy: {
                    renewable: 0,
                    hotfusion: 0,
                    coldfusion: 0,
                }
            },
            army: {
                corpo: 0,
                citizen: 0,
            },
            armyname: args[2],
            navy: {
                corpo: 0,
                citizen: 0,
            },
            navyname: args[3],
        };
        if (message.author.id === ownerID) {
            u = {
                _id: message.author.id,
                resources: {
                    money: Infinity,
                    currencyname: args[0],
                    food: Infinity,
                    people: {
                        clone: Infinity,
                        human: Infinity,
                    },
                    peoplename: args[1],
                    metal: Infinity,
                    energy: Infinity,
                },
                generators: {
                    mines: Infinity,
                    energy: {
                        renewable: Infinity,
                        hotfusion: Infinity,
                        coldfusion: Infinity,
                    }
                },
                army: {
                    corpo: Infinity,
                    citizen: Infinity,
                },
                armyname: args[2],
                navy: {
                    corpo: Infinity,
                    citizen: Infinity,
                },
                navyname: args[3],
            };
        }
        await db_1.inserUser(u);
        await message.channel.send("User profile made");
    }
};
exports.userdelete = {
    name: "delete",
    description: "Create your user profile",
    group: "utility",
    owner: false,
    async execute(message, client, args) {
        const filter = (response) => {
            return (("yes").toLowerCase() === response.content.toLowerCase());
        };
        await message.channel.send(`${message.author}, are you sure? Type \`yes\` to continue`).then(async (userdm) => {
            await userdm.channel.awaitMessages(filter, { max: 1, time: 90000, errors: ['time'] })
                .then(async (collected) => {
                var _a, _b;
                if (((_a = collected.first()) === null || _a === void 0 ? void 0 : _a.content.toLowerCase()) === "yes") {
                    await db_1.deleteUser(message.author.id);
                    await message.channel.send("Profile deleted");
                }
                if (((_b = collected.first()) === null || _b === void 0 ? void 0 : _b.content.toLowerCase()) === "no") {
                    await userdm.channel.send(`<@${message.author.id}> deletion has been declined`);
                }
            })
                .catch(async () => {
                await userdm.channel.send(`<@${message.author.id}> deletion has declined`);
                return;
            });
        });
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
