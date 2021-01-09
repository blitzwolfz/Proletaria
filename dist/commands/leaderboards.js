"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lb = void 0;
const db_1 = require("../util/db");
exports.lb = {
    name: "lb",
    description: "View your stats against everyone else",
    group: "lb",
    owner: false,
    async execute(message, client, args) {
        let symbol;
        let secondary = '';
        switch (args[0]) {
            case "money":
                symbol = "resources.money";
                break;
            case "people":
                {
                    symbol = "resources.people.human";
                    secondary = "resources.people.clones";
                }
                break;
            case "metal":
                symbol = "resources.metal";
                break;
            case "food":
                symbol = "resources.food";
                break;
            case "human":
                symbol = "resources.people.human";
                break;
            case "clone":
                symbol = "resources.people.clone";
                break;
            case "army":
                {
                    symbol = "army.citizen";
                    secondary = "army.corpo";
                }
                break;
            case "navy":
                {
                    symbol = "navy.citizen";
                    secondary = "navy.corpo";
                }
                break;
            default: return message.reply("The types are \`money\`, \`people\`, \`metal\`, \`food\`, \`human\`, \`clone\`, \`army\`, \`navy\`");
        }
        let us = await db_1.getUsers(symbol, secondary);
        let page = 1;
        const m = (await message.channel.send({ embed: await lbBuilder(page, client, us, message.author.id, symbol, secondary) }));
        await m.react("⬅");
        await m.react("➡");
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && !user.bot;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && !user.bot;
        const backwards = m.createReactionCollector(backwardsFilter, { time: 100000 });
        const forwards = m.createReactionCollector(forwardsFilter, { time: 100000 });
        backwards.on('collect', async () => {
            m.reactions.cache.forEach(reaction => reaction.users.remove(message.author.id));
            m.edit({ embed: await lbBuilder(--page, client, us, message.author.id, symbol, secondary) });
        });
        forwards.on('collect', async () => {
            m.reactions.cache.forEach(reaction => reaction.users.remove(message.author.id));
            m.edit({ embed: await lbBuilder(++page, client, us, message.author.id, symbol, secondary) });
        });
    }
};
async function lbBuilder(page = 1, client, data, id, symbol, secondary) {
    page = page < 1 ? 1 : page;
    if (page > Math.floor(data.length / 10)) {
        page = 1;
    }
    const fields = [];
    let index = (0 + page - 1) * 10;
    for (let i = index; i < index + 10; i++) {
        if (secondary) {
            let obj = data[i];
            try {
                fields.push({
                    name: `${i + 1}) ${await (await client.users.fetch(obj._id)).username}`,
                    value: `${obj[symbol.split(".")[0]][symbol.split(".")[1]] + obj[secondary.split(".")[0]][secondary.split(".")[1]]}`
                });
            }
            catch {
                continue;
            }
        }
        else if (symbol.split(".").length < 3) {
            let obj = data[i];
            try {
                fields.push({
                    name: `${i + 1}) ${await (await client.users.fetch(obj._id)).username}`,
                    value: `${obj[symbol.split(".")[0]][symbol.split(".")[1]]}`
                });
            }
            catch {
                continue;
            }
        }
        else {
            let obj = data[i];
            try {
                fields.push({
                    name: `${i + 1}) ${await (await client.users.fetch(obj._id)).username}`,
                    value: `${obj[symbol.split(".")[0]][symbol.split(".")[1]][symbol.split(".")[2]]}`
                });
            }
            catch {
                continue;
            }
        }
    }
    return {
        title: `. You are on page ${page || 1} of ${Math.floor(data.length / 10) + 1}`,
        description: `Your rank is: ${data.findIndex(item => item._id == id) + 1}`,
        fields,
        color: await (await db_1.getConfig()).colour,
        timestamp: new Date()
    };
}
