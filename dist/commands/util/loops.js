"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payout = exports.payouts = exports.foodreminderloop = exports.workreminderloop = exports.megaloop = void 0;
const db_1 = require("../../util/db");
const util_1 = require("../../util/util");
async function megaloop(client) {
    try {
        await foodreminderloop(client);
    }
    catch (error) {
        console.log(error.message);
    }
    try {
        await workreminderloop(client);
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.megaloop = megaloop;
async function workreminderloop(client) {
    var _a;
    let r = await db_1.getReminders({ type: "work" });
    for (let i of r) {
        if (Math.floor(Date.now() / 1000) - i.time > 900) {
            try {
                (await client.channels.fetch(i.channel)).send(`<@${i._id.replace("money", "")}>, you can work again`);
                await db_1.deleteReminder(i);
            }
            catch (error) {
                (_a = client.users.cache.get(i._id)) === null || _a === void 0 ? void 0 : _a.send(`<@${i._id.replace("money", "")}>, you can work again`);
                await db_1.deleteReminder(i);
            }
        }
    }
}
exports.workreminderloop = workreminderloop;
async function foodreminderloop(client) {
    var _a;
    let r = await db_1.getReminders({ type: "food" });
    for (let i of r) {
        if (Math.floor(Date.now() / 1000) - i.time > 3600) {
            try {
                (await client.channels.fetch(i.channel)).send(`<@${i._id.replace("food", "")}>, you can beg again`);
            }
            catch (error) {
                (_a = client.users.cache.get(i._id)) === null || _a === void 0 ? void 0 : _a.send(`<@${i._id.replace("food", "")}>, you can beg again`);
            }
            await db_1.deleteReminder(i);
        }
    }
}
exports.foodreminderloop = foodreminderloop;
async function payouts() {
    let c = await db_1.getConfig();
    let users = await db_1.getUsers();
    if (Math.floor(Date.now() / 1000) - c.lastpayout >= 86400) {
        let totalpayouts = Math.floor(86400 / (Math.floor(Date.now() / 1000) - c.lastpayout));
        c.lastpayout += 86400;
        await db_1.updateConfig(c, true);
        for (let u of users) {
            for (let i = 0; i < totalpayouts; i++) {
                await payout(u);
            }
        }
    }
}
exports.payouts = payouts;
async function payout(u) {
    let pE = 0;
    for (let x = 0; x < (u.resources.people.human + u.resources.people.clone); x++) {
        pE += await util_1.getRndInteger(15, 10, true);
    }
    let fE = (u.generators.farms.citizen * 1000) + (u.generators.farms.corpo * 10000);
    let mE = u.generators.mines * 200;
    let eE = (u.generators.energy.renewable * 300) + (u.generators.energy.hotfusion * 1000) + (u.generators.energy.coldfusion * 20000);
    let pC = (u.resources.people.human + u.resources.people.clone) * 10
        + u.generators.farms.citizen * 100
        + u.generators.farms.corpo * 1000
        + u.generators.mines * 50
        + u.generators.energy.renewable * 100
        + u.generators.energy.hotfusion * 4000
        + u.generators.energy.coldfusion * 50000
        + u.army.citizen * 250
        + u.army.corpo * 2500
        + u.navy.citizen * 1000
        + u.navy.corpo * 10000;
    let fC = (u.resources.people.human + u.resources.people.clone) * 1
        + u.army.citizen * 750
        + u.army.corpo * 0
        + u.navy.citizen * 550
        + u.navy.corpo * 0;
    let mC = u.generators.energy.hotfusion * 3000
        + u.generators.energy.coldfusion * 20000
        + u.navy.citizen * 300;
    let eC = u.generators.farms.citizen * 100
        + u.generators.mines * 10
        + u.generators.energy.renewable * 100;
    u.resources.money += (pE - pC);
    u.resources.food += (fE - fC);
    u.resources.metal += (mE - mC);
    u.resources.energy += (eE - eC);
    await db_1.updateUser(u);
}
exports.payout = payout;
