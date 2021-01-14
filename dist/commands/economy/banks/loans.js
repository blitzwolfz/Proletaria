"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketoffer = exports.loanTerms = exports.applyloans = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../../../util/db");
exports.applyloans = {
    name: "loan-apply",
    description: "You can apply for a loan.\nLook at the current day offerings\n" +
        "from each central bank, and choose the best loan. If you need\n" +
        `help with terms, look at \`loan-term\` command for more info.`,
    group: "loans",
    owner: false,
    async execute(message, client, args, ownerID) {
        return message.reply("Not finished");
    }
};
exports.loanTerms = {
    name: "loan-terms",
    description: "Gives you basic knowledge of how loans work",
    group: "loans",
    owner: false,
    async execute(message, client, args, ownerID) {
        await message.channel.send(new discord_js_1.MessageEmbed()
            .setTitle("**Terms**")
            .setDescription("Before you tackle a loan onto your nation,\nit's best you know what you are signing up for.")
            .addFields({ name: "APR", value: "APR in the game stands for the interest rate you are paying.\n" +
                "Each bank has a different APR day to day. It always best to shop\n" +
                "around when looking for a loan. Remeber, you aren't being forced to\n" +
                "take the loan of a specific bank, and you can choose any of the banks."
        }, { name: "Down Payment", value: "Loans are risky, and they count towards your debt tolerance.\n" +
                "Each bank needs some assurance of profit before they give you a loan,\n" +
                "as such they have to be assured they have something on hand if your nation\n" +
                "dies. Each down payment is based on whatever the bank wants. It can be different\n" +
                "day to day. So remember to look around and make sure this is the loan you want.\n"
        }, { name: "User Loans", value: "Just like banks, players are allowed to give loans.\n" +
                "All the other terms apply to user loans. APR, Down Payments,\n" +
                "however the key difference is that Users can be nicer in terms\n" +
                "of how much interest you are paying or the down payment. In addition\n" +
                "User loans are backed by all the banks who charge a standard 10% fee\n" +
                "as such that users never have to worry about a loss, who will repay\n" +
                "the 90% of the profit that would have been made and the loan itself.\n"
        })
            .setColor(await (await db_1.getConfig()).colour)
            .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512"));
    }
};
exports.marketoffer = {
    name: "market-offer",
    description: "Post a loan offer for your fellow players.",
    group: "loans",
    owner: false,
    async execute(message, client, args, ownerID) {
        return message.reply("Not finished");
    }
};
