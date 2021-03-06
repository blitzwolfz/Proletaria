"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guide = exports.help = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../../util/db");
const c = __importStar(require("./../index"));
exports.help = {
    name: "help",
    group: "help",
    description: "Access the help menu",
    owner: false,
    async execute(message, client, args) {
        if (args.length === 0) {
            let string = "";
            let array = [];
            c.default.forEach(c => array.push(c.group));
            array.splice(0, array.length, ...(new Set(array)));
            string = array.join(' ');
            return await message.channel.send(`The following command groups are availabe. Please do ${await (await db_1.getServer(message.guild.id)).prefix}help <group-name>:\n` +
                `\`${string}\``);
        }
        if (c.default.find(c => c.name === args[0])) {
            let g = args[0];
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`${await (await db_1.getServer(message.guild.id)).prefix}${g}`)
                .setDescription(c.default.map(cmd => {
                if (cmd.name === g)
                    return cmd.description;
            }))
                .setColor(await (await db_1.getConfig()).colour)
                .setFooter(`You can send \`${await (await db_1.getServer(message.guild.id)).prefix}help <command name>\` to get info on a specific command!`);
            await message.channel.send(embed);
        }
        if (c.default.find(c => c.group === args[0])) {
            let g = args[0];
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`Here's a list of my ${g} commands:`)
                .setDescription(c.default.map(cmd => {
                if (g === cmd.group) {
                    if (cmd.owner) {
                        return "`" + "§" + cmd.name + "`" + "\n";
                    }
                    return "`" + cmd.name + "`" + "\n";
                }
            }).join(""))
                .setColor(await (await db_1.getConfig()).colour)
                .setFooter(`You can send \`${await (await db_1.getServer(message.guild.id)).prefix}help <command name>\` to get info on a specific command!`);
            await message.channel.send(embed);
        }
    }
};
exports.guide = {
    name: "guide",
    group: "help",
    description: "Access the guide",
    owner: false,
    async execute(message, client, args) {
        let prefix = await (await db_1.getServer(message.guild.id)).prefix;
        let embed = new discord_js_1.MessageEmbed()
            .setTitle("A Guide to Proletaria")
            .setColor(await (await db_1.getConfig()).colour)
            .addFields({ name: "To begin", value: `\`${prefix}create\`. This will start you with 1000 of each resource` }, { name: "Earning money and food", value: `The basic commands \`${prefix}work\` and \`${prefix}beg\`` +
                "Work will get you a certain amount of money every 15 mins," +
                "and beg will get you a certain amount of food every hour. " +
                "In addition your population will be taxed every day, each" +
                "person bringing in 5-10 money.",
            inline: false
        }, { name: "Earning other resources", value: "In addition to food and money you have metal, people, and energy" +
                `You should check the ${prefix}store to see how to increase these resources`,
            inline: false
        }, { name: "Consumption", value: "All of your items, wheter it be people, or mines consume resources. " +
                "Before buying something in the store, make sure that" +
                "you have enough resources to buy, and that you produce " +
                "enough resources to sustain them. You can check these stats " +
                `using the \`${prefix}earnings\` command`,
            inline: false
        })
            .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512");
        await message.channel.send(embed);
    }
};
