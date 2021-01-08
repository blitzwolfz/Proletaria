const glob = require("glob") // included by discord.js allow this import
import { promisify } from "util" // Included by default
import { Command } from "./types"
import * as Discord from "discord.js"
import { connectToDB, deleteServer, getConfig, getServer, getServers, insertServer, updateConfig, updateServer } from "./util/db"
require('dotenv').config()


// Make `glob` return a promise
//@ts-ignore
const globPromise = promisify(glob)

export const client = new Discord.Client


export let prefix: string = process.env.prefix!
import * as c from "./commands/index"
import { megaloop } from "./commands/util/loops"
//console.log(c.default)
//@ts-ignore
var commands: Command[] = c.default

//Express for hosting
const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
//@ts-ignore
var _server = http.createServer(app);

app.get('/', (_request: any, response: any) => {
  response.sendFile(__dirname + "/index.html");
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
//Express for hosting

client.once("ready", async () => {
  // Load all JavaScript / TypeScript files so it works properly after compiling
  // await commandloader(commands, `${__dirname}/commands/*.js`)
  // await commandloader(commands, `${__dirname}/commands/economy/*.js`)
  // await commandloader(commands, `${__dirname}/commands/util/*.js`)
  await connectToDB()


  setInterval(async function () {
    // console.log("A Kiss every 5 seconds");
    //console.time("Big loop goes brrr in")
    await megaloop(client)
    //console.timeEnd("Big loop goes brrr in")
  }, 1000);

  try {
    getServers().then(server => {
      if (server.length < client.guilds.cache.array().length)
        client.guilds.cache.array().forEach(async (el) => {
          updateServer({
            _id: el.id,
            name: el.name,
            prefix: (await getServer(el.id))?.prefix || "??"
          }, true);
        });
    });
  } catch (e) {
    console.log("Could not update all servers")
  }

  console.log(`Logged in as ${client.user?.tag}\nPrefix is ${prefix}`)
  console.log(`In ${client.guilds.cache.size} servers\nTotal users is ${client.users.cache.size}`)

})

client.on("guildCreate", async guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  await client.user!.setActivity(`??help | ${client.users.cache.size} users on ${client.guilds.cache.size} servers`);

  await insertServer({
    _id: guild.id,
    name: guild.name,
    prefix: "??"
  })
});

client.on("guildDelete", async guild => {
  console.log(`I have been removed from: ${guild?.name} (id: ${guild?.id})`);
  await client.user!.setActivity(`.help | ${client.users.cache.size} users on ${client.guilds.cache.size} servers`);
  if (guild) await deleteServer(guild.id);
});

client.on("message", async message => {
  // Prevent the bot from replying to itself or other bots
  if (message.author.bot) {
    return
  }

  prefix = (await getServer(message.guild?.id!))?.prefix;

  var args: Array<string>;

  //"Dynamic" Prefix handling
  if (message.content.startsWith(prefix)
    || message.content.startsWith(process.env.prefix!)
    || message.content.startsWith(`<@!${client.user?.id}>`)) {

    if (message.content.startsWith(process.env.prefix!)) {
      args = message.content.slice((process.env.prefix!.length)).trim().split(/ +/g);
    }

    else if (message.content.startsWith(`<@!${client.user?.id}>`)) {
      args = message.content.slice((`<@!${client.user?.id}>`.length)).trim().split(/ +/g);
    }

    else {
      args = message.content.slice((prefix.length)).trim().split(/ +/g);
    }
  } else return;


  const commandName: string | undefined = args?.shift()?.toLowerCase();

  if (!commandName) return

  console.log(commandName)

  if (commandName === "test") {
    if(message.author.id !== process.env.owner){
      await message.reply("nah b")
    }
  }

  if (commandName === "removecommands") {
    if(message.author.id !== process.env.owner){
      await message.reply("nah b")
    }
    await message.reply(await removecommands(commands, args))
  }

  if (commandName === "reloadcommands") {
    if(message.author.id !== process.env.owner){
      await message.reply("nah b")
    }
    await message.reply(await reloadcommands(commands))
  }

  if (commandName === "allcommands") {
    if(message.author.id !== process.env.owner){
      await message.reply("nah b")
    }
    await message.channel.send("Commands available are:")
    for(let cc of commands){
      if(!await (await getConfig()).removecommands.includes(cc.name))
      await message.channel.send(cc.name)
    }
  }

  const command = commands.find(c => c.name.toLowerCase() === commandName)

  if (command) {
    if (command.owner) {
      try {
        if(message.author.id !== process.env.owner) return message.reply("Can't use this command.")
        await command.execute(message, client, args, process.env.owner)
      } catch (error) {
        await message.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("ERROR")
        .addFields(
          { name: 'Channel Name', value: `${(<Discord.TextChannel>await client.channels.fetch(message.channel.id)).name}`, inline:true },
          { name: 'Channel Id', value: `${message.channel.id}`, inline:true },
          { name: 'Guild Id', value: `${message.guild?.id}`, inline:true },
          { name: 'Guild Name', value: `${message.guild?.name}`, inline:true },
          { name: 'User', value: `${message.author.tag}`, inline:true },
          { name: 'User Id', value: `${message.author.id}`, inline:true },
        )
        .setDescription(`\`\`\`${error.message}\`\`\``)
      )
      }
    }

    else {
      try {
        await command.execute(message, client, args)
        
      } catch (error) {
        await message.channel.send(new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("ERROR")
          .addFields(
            { name: 'Channel Name', value: `${(<Discord.TextChannel>await client.channels.fetch(message.channel.id)).name}`, inline:true },
            { name: 'Channel Id', value: `${message.channel.id}`, inline:true },
            { name: 'Guild Id', value: `${message.guild?.id}`, inline:true },
            { name: 'Guild Name', value: `${message.guild?.name}`, inline:true },
            { name: 'User', value: `${message.author.tag}`, inline:true },
            { name: 'User Id', value: `${message.author.id}`, inline:true },
          )
          .setDescription(`\`\`\`${error.message}\`\`\``)
        )
      }
    }
  }
})

export async function reloadcommands(localcommands: Command[]) {
  localcommands = c.default

  let config = await getConfig()
  config.removecommands = []

  await updateConfig(config, true)
  commands = localcommands
  return "Reloaded commands"
}

export async function removecommands(localcommands: Command[], args:string[]) {
  console.log(localcommands.length)
  args = args.join(" ").split(/[,]+/)
  console.log(args)
  let config = await getConfig()

  for(let co of localcommands){
    console.log(co.name)
    console.log(args.includes(co.name))
    if(args.includes(co.name)) config.removecommands.push(co.name)
  }
  await updateConfig(config, true)

  await updatecommands(localcommands)


  return "Removed commands"
}

export async function updatecommands(localcommands: Command[]) {
  localcommands = []
  console.log(localcommands)
  let config = await getConfig()

  for(let cc of c.default){
    if(!config.removecommands.includes(cc.name)) localcommands.push(cc)
  }
  console.log(localcommands)

  commands = localcommands
}

client.login(process.env.token2!)