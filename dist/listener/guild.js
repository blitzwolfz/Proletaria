"use strict";
const __1 = require("..");
const db_1 = require("../util/db");
__1.client.on("guildCreate", async (guild) => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    await __1.client.user.setActivity(`??help | ${__1.client.users.cache.size} users on ${__1.client.guilds.cache.size} servers`);
    await db_1.insertServer({
        _id: guild.id,
        name: guild.name,
        prefix: __1.prefix
    });
});
__1.client.on("guildDelete", async (guild) => {
    console.log(`I have been removed from: ${guild === null || guild === void 0 ? void 0 : guild.name} (id: ${guild === null || guild === void 0 ? void 0 : guild.id})`);
    await __1.client.user.setActivity(`.help | ${__1.client.users.cache.size} users on ${__1.client.guilds.cache.size} servers`);
    if (guild)
        await db_1.deleteServer(guild.id);
});
module.exports = __1.client;
