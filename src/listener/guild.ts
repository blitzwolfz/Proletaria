//import * as Discord from "discord.js"
import { client, prefix } from ".."
import { deleteServer, insertServer } from "../util/db";

client.on("guildCreate", async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    await client.user!.setActivity(`??help | ${client.users.cache.size} users on ${client.guilds.cache.size} servers`);

    await insertServer({
        _id: guild.id,
        name:guild.name,
        prefix: prefix
    })
});

client.on("guildDelete", async guild => {
    console.log(`I have been removed from: ${guild?.name} (id: ${guild?.id})`);
    await client.user!.setActivity(`.help | ${client.users.cache.size} users on ${client.guilds.cache.size} servers`);
    if (guild) await deleteServer(guild.id);
});

export = client