import { Client, Message } from "discord.js"
import { prefix } from "../.."
import { Command, user } from "../../types"
import { deleteUser, getServer, getUser, inserUser, updateUser } from "../../util/db"

// This will complain if you don't provide the right types for each property
export const createuser: Command = {
    name: "create",
    description: "Create your user profile",
    group:"utility",
    owner:false,
    async execute(message: Message, client:Client, args: string[], ownerID:string){

        if(await getUser(message.author.id)) return message.reply("You already have an account")

        if(args.length < 4) return message
        .reply(`Error please follow command: ${await (await getServer(message.guild!.id)).prefix || prefix}create \`name of currency\`, \`name of people\`, \`name of army\`, \`name of navy\``)
        
        args = args.join(" ").split(/[,]+/)
        console.log(args)
        
        let u:user = {
            _id:message.author.id,
            resources:{
                money: 1000,
                currencyname:args[0],
                food: 1000,
                people:{
                    clone:0,
                    human:1000,
                },
                peoplename:args[1],
                metal: 1000,
                energy: 1000,
            },
            generators: {
                mines: 0,
                energy: {
                    renewable: 2,
                    hotfusion: 0,
                    coldfusion: 0,
                },
                farms:{
                    corpo: 0,
                    citizen:2,
                },
            },
            army:{
                corpo:0,
                citizen:0,
            },
            armyname: args[2],
            navy:{
                corpo:0,
                citizen:0,
            },
            navyname: args[3],
        }
        
        if(message.author.id === ownerID){
            u = {
                _id:message.author.id,
                resources:{
                    money: Infinity,
                    currencyname:args[0],
                    food: Infinity,
                    people:{
                        clone:Infinity,
                        human:Infinity,
                    },
                    peoplename:args[1],
                    metal: Infinity,
                    energy: Infinity,
                },
                generators: {
                    mines: Infinity,
                    energy: {
                        renewable: Infinity,
                        hotfusion: Infinity,
                        coldfusion: Infinity,
                    },
                    farms:{
                        corpo: Infinity,
                        citizen: Infinity,
                    }
                },
                army:{
                    corpo:Infinity,
                    citizen:Infinity,
                },
                armyname: args[2],
                navy:{
                    corpo:Infinity,
                    citizen:Infinity,
                },
                navyname: args[3],
            }
        }

        await inserUser(u)

        await message.channel.send("User profile made")
    }
}

export const userdelete: Command = {
    name: "delete",
    description: "Create your user profile",
    group:"utility",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){
        const filter = (response:any) => {
            return (("yes").toLowerCase() === response.content.toLowerCase());
        };

        await message.channel.send(`${message.author}, are you sure? Type \`yes\` to continue`).then(async (userdm:Message) => {
            //console.log(userdm.channel.id)
            await userdm.channel.awaitMessages(filter, { max: 1, time: 90000, errors: ['time'] })
                .then(async collected => {
                    if(collected.first()?.content.toLowerCase() === "yes"){
                        await deleteUser(message.author.id)
                        await message.channel.send("Profile deleted")
                    }

                    if(collected.first()?.content.toLowerCase() === "no"){
                        await userdm.channel.send(`<@${message.author.id}> deletion has been declined`);
                    }
                })
    
                .catch(async () => {
                    await userdm.channel.send(`<@${message.author.id}> deletion has declined`);
                    return;
                });
        });
    }
}

export const rename: Command = {
    name: "rename",
    description: "Rename stuff",
    group:"utility",
    owner:false,
    async execute(message: Message, client:Client, args: string[]){

        if(args.length === 0) return message.reply("What do you want to rename? user")

        if(args[0].toLowerCase() === "user"){
            let u = await getUser(message.author.id)
            if(!u) return message.reply("plese use create command to make an account")
            if(args.length === 1) return message.reply("Please specifiy what you want to rename: pop, money, army, navy")

            else{

                let key = ""

                switch(args[1]) {
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
                      return message.reply(`please specifiy which of these you want to rename: pop, money, army, navy.\n Example \`${await (await getServer(message.guild!.id)).prefix}rename user army Freedom Fighters\``)
                }


                if(["peoplename", "currencyname"].includes(key)){
                    //@ts-ignore
                    u!.resources[key] = args.splice(2).join(" ");
                }

                else{
                    //@ts-ignore
                    u![key] = args.splice(2).join(" ");
                }

                await updateUser(u)
                return message.reply(`Rename succesful!`)
            }
        }
    }
}


