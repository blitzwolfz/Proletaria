"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConfig = exports.updateConfig = exports.getConfig = exports.insertConfig = exports.deleteServer = exports.updateServer = exports.getServers = exports.getServer = exports.insertServer = exports.deleteReminder = exports.updateReminder = exports.getReminders = exports.getReminder = exports.inserReminder = exports.updateUser = exports.getUsers = exports.getUser = exports.deleteUser = exports.inserUser = exports.updater = exports.connectToDB = void 0;
const mongodb = __importStar(require("mongodb"));
require("dotenv").config();
const url = process.env.MONGOURL;
const client = new mongodb.MongoClient(url, { useNewUrlParser: true, connectWithNoPrimary: false, useUnifiedTopology: true });
const dbn = process.env.dbname;
async function connectToDB() {
    return await new Promise(resolve => {
        client.connect(async (err) => {
            if (err)
                throw err;
            try {
                await client.db(dbn).createCollection("users");
                await client.db(dbn).createCollection("servers");
                await client.db(dbn).createCollection("reminders");
                await client.db(dbn).createCollection("config");
            }
            catch (error) {
            }
            console.log("Successfully connected");
            await resolve();
        });
    });
}
exports.connectToDB = connectToDB;
async function updater(coll, filter, update) {
    await client.db(dbn).collection(coll).updateMany(filter, update);
}
exports.updater = updater;
async function inserUser(user) {
    await client.db(dbn).collection("users").insertOne(user);
}
exports.inserUser = inserUser;
async function deleteUser(id) {
    await client.db(dbn).collection("users").deleteOne({ _id: id });
}
exports.deleteUser = deleteUser;
async function getUser(id) {
    return await client.db(dbn).collection("users").findOne({ _id: id });
}
exports.getUser = getUser;
async function getUsers(field, secondary) {
    if (secondary)
        return await client.db(dbn).collection("users").find({}).sort({ [field]: -1, [secondary]: -1 }).toArray();
    if (field)
        return await client.db(dbn).collection("users").find({}).sort({ [field]: -1 }).toArray();
    return await client.db(dbn).collection("users").find({}).toArray();
}
exports.getUsers = getUsers;
async function updateUser(user) {
    await client.db(dbn).collection("users").updateOne({ _id: user._id }, { $set: user });
}
exports.updateUser = updateUser;
async function inserReminder(r) {
    await client.db(dbn).collection("reminder").insert(r);
}
exports.inserReminder = inserReminder;
async function getReminder(id) {
    return await client.db(dbn).collection("reminder").findOne({ _id: id });
}
exports.getReminder = getReminder;
async function getReminders(q) {
    if (q) {
        return await client.db(dbn).collection("reminder").find(q).toArray();
    }
    return await client.db(dbn).collection("reminder").find({}).toArray();
}
exports.getReminders = getReminders;
async function updateReminder(r) {
    await client.db(dbn).collection("reminder").updateOne({ _id: r._id }, { $set: r });
}
exports.updateReminder = updateReminder;
async function deleteReminder(r) {
    await client.db(dbn).collection("reminder").deleteOne({ _id: r._id });
}
exports.deleteReminder = deleteReminder;
async function insertServer(s) {
    await client.db(dbn).collection("servers").insertOne(s);
}
exports.insertServer = insertServer;
async function getServer(_id) {
    return client.db(dbn).collection("servers").findOne({ _id });
}
exports.getServer = getServer;
async function getServers() {
    return await client.db(dbn).collection("servers").find().toArray();
}
exports.getServers = getServers;
async function updateServer(server, upsert) {
    client.db(dbn).collection("servers").updateOne({ _id: server._id }, { $set: server }, { upsert: true });
}
exports.updateServer = updateServer;
async function deleteServer(_id) {
    client.db(dbn).collection("servers").deleteOne({ _id });
}
exports.deleteServer = deleteServer;
async function insertConfig(c) {
    await client.db(dbn).collection("config").insertOne(c);
}
exports.insertConfig = insertConfig;
async function getConfig() {
    return client.db(dbn).collection("config").findOne({ _id: 1 });
}
exports.getConfig = getConfig;
async function updateConfig(config, upsert) {
    client.db(dbn).collection("config").updateOne({ _id: config._id }, { $set: config }, { upsert: true });
}
exports.updateConfig = updateConfig;
async function deleteConfig(_id) {
    client.db(dbn).collection("config").deleteOne({ _id });
}
exports.deleteConfig = deleteConfig;
