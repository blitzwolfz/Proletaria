"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodreminderloop = exports.workreminderloop = exports.megaloop = void 0;
const db_1 = require("../../util/db");
async function megaloop(client) {
    await workreminderloop(client);
    await foodreminderloop(client);
}
exports.megaloop = megaloop;
async function workreminderloop(client) {
    let r = await db_1.getReminders({ type: "work" });
    for (let i of r) {
        if (Math.floor(Date.now() / 1000) - i.time > 900) {
            (await client.channels.fetch(i.channel)).send(`<@${i._id.replace("money", "")}>, you can work again`);
            await db_1.deleteReminder(i);
        }
    }
}
exports.workreminderloop = workreminderloop;
async function foodreminderloop(client) {
    let r = await db_1.getReminders({ type: "food" });
    for (let i of r) {
        if (Math.floor(Date.now() / 1000) - i.time > 3600) {
            (await client.channels.fetch(i.channel)).send(`<@${i._id.replace("food", "")}>, you can beg again`);
            await db_1.deleteReminder(i);
        }
    }
}
exports.foodreminderloop = foodreminderloop;
