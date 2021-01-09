import * as mongodb from "mongodb"
import { config, reminder, server, user } from "../types"
require("dotenv").config();
const url: string = process.env.MONGOURL!;
const client = new mongodb.MongoClient(url, { useNewUrlParser: true, connectWithNoPrimary: false, useUnifiedTopology: true });
const dbn = process.env.dbname;

export async function connectToDB(): Promise<void> {
    return await new Promise(resolve => {
        client.connect(async (err: any) => {
            if (err) throw err;
            try {
                await client.db(dbn).createCollection("users");
                await client.db(dbn).createCollection("servers");
                await client.db(dbn).createCollection("reminders");
                await client.db(dbn).createCollection("config");
            } catch (error) {
                
            }
            console.log("Successfully connected");
            await resolve();
        });
    });
}

//General db commands
export async function updater(coll:string, filter:object, update:object){
    await client.db(dbn).collection(coll).updateMany(filter, update)
}

//User db commands
export async function inserUser(user:user) {
    await client.db(dbn).collection("users").insertOne(user) 
}

export async function deleteUser(id:string)  {
    await client.db(dbn).collection("users").deleteOne({_id:id})
}

export async function getUser(id:string): Promise<user | null> {
    return await client.db(dbn).collection("users").findOne({_id:id}) 
}

export async function getUsers(field?:string, secondary?:string): Promise<user[]> {
    if(secondary) return await client.db(dbn).collection("users").find({}).sort({[field!]: -1, [secondary!]: -1}).toArray()!
    if(field) return await client.db(dbn).collection("users").find({}).sort({[field!]: -1}).toArray()!
    return await client.db(dbn).collection("users").find({}).toArray()!
}

export async function updateUser(user:user) {
    await client.db(dbn).collection("users").updateOne({_id:user._id}, {$set: user})    
}

//Reminder db commands
export async function inserReminder(r:reminder) {
    await client.db(dbn).collection("reminder").insert(r) 
}

export async function getReminder(id:string): Promise<reminder | null> {
    return await client.db(dbn).collection("reminder").findOne({_id:id}) 
}

export async function getReminders(q?:object): Promise<reminder[]> {
    if(q){
        return await client.db(dbn).collection("reminder").find(q).toArray()
    }
    return await client.db(dbn).collection("reminder").find({}).toArray()
}

export async function updateReminder(r:reminder) {
    await client.db(dbn).collection("reminder").updateOne({_id:r._id}, {$set: r})    
}

export async function deleteReminder(r:reminder) {
    await client.db(dbn).collection("reminder").deleteOne({_id:r._id})  
}

//Server db commands
export async function insertServer(s:server) {
    await client.db(dbn).collection("servers").insertOne(s)
}

export async function getServer(_id: string): Promise<server> {
    return client.db(dbn).collection("servers").findOne({ _id })!;
}

export async function getServers(): Promise<server[]> {
    return await client.db(dbn).collection("servers").find().toArray()
}

export async function updateServer(server: server, upsert: boolean) {
    client.db(dbn).collection("servers").updateOne({ _id: server._id }, { $set: server }, { upsert:true });
}

export async function deleteServer(_id: string) {
    client.db(dbn).collection("servers").deleteOne({ _id });
}

//Config db commands
export async function insertConfig(c:config) {
    await client.db(dbn).collection("config").insertOne(c)
}

export async function getConfig(): Promise<config> {
    return client.db(dbn).collection("config").findOne({ _id:1 })!;
}

export async function updateConfig(config: config, upsert: boolean) {
    client.db(dbn).collection("config").updateOne({ _id: config._id }, { $set: config }, { upsert:true });
}

export async function deleteConfig(_id: string) {
    client.db(dbn).collection("config").deleteOne({ _id });
}