const glob = require("glob") // included by discord.js allow this import
import { promisify } from "util" // Included by default
import { Command } from "./types"
import * as Discord from "discord.js"
import { connectToDB, deleteServer, getServer, getServers, insertServer, updateServer } from "./util/db"
require('dotenv').config()


// Make `glob` return a promise
//@ts-ignore
const globPromise = promisify(glob)

export const client = new Discord.Client


export let prefix: string = process.env.prefix!
import * as c from "./commands/index"
import { megaloop, payouts } from "./commands/util/loops"
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
  await connectToDB().then(async () => {
    console.log("\n")
    // await updater("users", {'generators.farms.citizen': {$exists : false}}, {$set: {'generators.farms.citizen': 0}})
    // await updater("users", {'generators.farms.corpo': {$exists : false}}, {$set: {'generators.farms.corpo': 0}})
  })

  setInterval(async function () {
    // console.log("A Kiss every 5 seconds");
    //console.time("Big loop goes brrr in")
    await megaloop(client)
    await payouts()
    //console.timeEnd("Big loop goes brrr in")
  }, 1000);

  try {
    getServers().then(server => {
      if (server.length < client.guilds.cache.array().length)
        client.guilds.cache.array().forEach(async (el) => {
          updateServer({
            _id: el.id,
            name: el.name,
            prefix: (await getServer(el.id))?.prefix || "p+"
          }, true);
        });
    });
  } catch (e) {
    console.log("Could not update all servers")
  }

  try {
    await getServers().then(async server => {
      server.forEach(async s => {
        if (!client.guilds.cache.array().find(x => x.id === s._id)) {
          deleteServer(s._id)
        }
      }
      )
    })
  } catch (error) {
    console.log("Removed servers")
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

  if(message.channel.type !== "text") return;

  const commandName: string | undefined = args?.shift()?.toLowerCase();

  if (!commandName) return

  const command = commands.find(c => c.name.toLowerCase() === commandName)

  if (commandName === "test") {
    if(message.author.id !== process.env.owner && !process.env.mods?.split(",").includes(message.author.id)){
      return await message.reply("nah b")
    }
  }

  else if (command) {
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
        .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")
      )
      }
    }

    else {
      try {
        await command.execute(message, client, args)
        
      } catch (error) {
        await message.channel.send(new Discord.MessageEmbed()
          .setFooter("blitzwolfz#9338", "https://cdn.discordapp.com/avatars/239516219445608449/12fa541557ca2635a34a5af5e8c65d26.webp?size=512")
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

if(process.env.dev) client.login(process.env.TOKEN!)
else client.login(process.env.token2!)