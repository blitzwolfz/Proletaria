import { Client, Message, User } from "discord.js"
import { Command, user } from "../types";
import { getConfig, getUsers } from "../util/db";


export const lb: Command = {
    name: "lb",
    description: "View your stats against everyone else",
    group:"lb",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){

        let symbol:string;
        let secondary:string = '';

        switch (args[0]) {
            case "money": symbol = "resources.money"; break;
            case "people": {
                symbol = "resources.people.human";
                secondary = "resources.people.clones"
            } break;
            case "metal": symbol = "resources.metal"; break;
            case "food": symbol = "resources.food"; break;
            case "human": symbol = "resources.people.human"; break;
            case "clone": symbol = "resources.people.clone"; break;
            case "army": {
                symbol = "army.citizen";
                secondary = "army.corpo"
            } break;
            case "navy": {
                symbol = "navy.citizen";
                secondary = "navy.corpo"
            } break;
            default: return message.reply("The types are \`money\`, \`people\`, \`metal\`, \`food\`, \`human\`, \`clone\`, \`army\`, \`navy\`");
        }

        let us = await getUsers(symbol, secondary)
        let page = 1
        const m = <Message>(await message.channel.send({ embed: await lbBuilder(page, client, us, message.author.id, symbol, secondary) }));
        await m.react("⬅")
        await m.react("➡");
        const backwardsFilter = (reaction: { emoji: { name: string; }; }, user: User) => reaction.emoji.name === '⬅' && !user.bot;
        const forwardsFilter = (reaction: { emoji: { name: string; }; }, user: User) => reaction.emoji.name === '➡' && !user.bot;
    
        const backwards = m.createReactionCollector(backwardsFilter, { time: 100000 });
        const forwards = m.createReactionCollector(forwardsFilter, { time: 100000 });
    
        backwards.on('collect', async () => {
            m.reactions.cache.forEach(reaction => reaction.users.remove(message.author.id));
            m.edit({ embed: await lbBuilder(--page, client, us, message.author.id, symbol, secondary)});
        });
        forwards.on('collect', async () => {
            m.reactions.cache.forEach(reaction => reaction.users.remove(message.author.id));
            m.edit({ embed: await lbBuilder(++page, client, us, message.author.id, symbol, secondary) });
        });

    }
}

async function lbBuilder(page: number = 1, client: Client, data: user[], id:string, symbol:string, secondary?:string, ) {
    page = page < 1 ? 1 : page;

    if(page > Math.floor(data.length/10)){
        page = 1
    }

    const fields = [];
    let index = (0 + page - 1) * 10

    for (let i = index; i < index + 10; i++){
        if(secondary){
            let obj = data[i]
            try{
                fields.push({
                    name: `${i+1}) ${await (await client.users.fetch(obj._id)).username}`,
                    //`${rest[1] === "memesvoted" ? "memesvoted" : rest[1]}`
                    //@ts-ignore
                    value: `${obj[symbol.split(".")[0]][symbol.split(".")[1]]+obj[secondary.split(".")[0]][secondary.split(".")[1]]}`
                });
            }
            catch{
                continue;
            }
        }

        else if(symbol.split(".").length < 3){
            let obj = data[i]
            try{
                fields.push({
                    name: `${i+1}) ${await (await client.users.fetch(obj._id)).username}`,
                    //`${rest[1] === "memesvoted" ? "memesvoted" : rest[1]}`
                    //@ts-ignore
                    value: `${obj[symbol.split(".")[0]][symbol.split(".")[1]]}`
                });
            }
            catch{
                continue;
            }
        }

        else{
            let obj = data[i]
            try{
                fields.push({
                    name: `${i+1}) ${await (await client.users.fetch(obj._id)).username}`,
                    //`${rest[1] === "memesvoted" ? "memesvoted" : rest[1]}`
                    //@ts-ignore
                    value: `${obj[symbol.split(".")[0]][symbol.split(".")[1]][symbol.split(".")[2]]}`
                });
            }
            catch{
                continue;
            }
        }
    }

    let itemSort = await (await myFunction(symbol, secondary))


    return {
        title: `Leaderboard sorted by ${itemSort}.\nYou are on page ${page! || 1} of ${Math.floor(data.length / 10) + 1}`,
        description: `Your rank is: ${data.findIndex(item => item._id == id) + 1}`,
        fields,
        color: await (await getConfig()).colour,
        timestamp: new Date()
    };
}

async function myFunction(symbol:string, s?:string) {
    if(symbol.split(".").length === 3){
        return symbol.split(".")[2].charAt(0).toUpperCase() + symbol.split(".")[2].slice(1)
    }

    else{
        //symbol.charAt(0).toUpperCase() + symbol.slice(1);
        if(symbol.split(".")[0] === "army" || symbol.split(".")[0] === "navy") return symbol.split(".")[0].charAt(0).toUpperCase() + symbol.split(".")[0].slice(1)
       
        return symbol.split(".")[1].charAt(0).toUpperCase() + symbol.split(".")[1].slice(1)
    }
}
  

// export async function winlistEmbed(page: number = 1, client: Discord.Client, ratings: user[],...rest:any){

//     //let signup = await getSignups()
//     //let guild = client.guilds.cache.get("719406444109103117")

//     page = page < 1 ? 1 : page;

//     if(page > ratings.length){
//         page = 0
//     }
//     const fields = [];
//     let index = (0 + page - 1) * 10
//     for (let i = index; i < index + 10; i++){

//         let obj = ratings[i]
//         try{
//             fields.push({
//                 name: `${i+1}) ${await (await client.users.fetch(ratings[i]._id)).username}`,
//                 //`${rest[1] === "memesvoted" ? "memesvoted" : rest[1]}`
//                 //@ts-ignore
//                 value: `${rest[1] === "memesvoted" ? "Memes voted on" : `${rest[1][0].toUpperCase()}${rest[1].substring(1)}`}: ${obj[rest[1]]}`
//             });
//         }
//         catch{
//             continue;
//         }

//     }


//     return {
//         title: `Leaderboard sorted by ${rest[1] === "votes" ? "Memes voted for" : rest[1]}. You are on page ${page! || 1} of ${Math.floor(ratings.length / 10) + 1}`,
//         description: `Your rank is: ${ratings.findIndex(item => item._id == rest[0]) + 1}`,
//         fields,
//         color: "#d7be26",
//         timestamp: new Date()
//     };
// }