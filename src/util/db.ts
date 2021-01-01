import * as mongodb from "mongodb"
import { reminder, server, user } from "../types"
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
            } catch (error) {
                
            }
            console.log("Successfully connected");
            await resolve();
        });
    });
}


//User db commands
export async function inserUser(user:user) {
    await client.db(dbn).collection("users").insertOne(user) 
}

export async function getUser(id:string): Promise<user | null> {
    return await client.db(dbn).collection("users").findOne({_id:id}) 
}

export async function getUsers(): Promise<user[]> {
    return await client.db(dbn).collection("users").find({}).toArray()!
}

export async function updateUser(user:user) {
    await client.db(dbn).collection("users").updateOne({_id:user._id}, {$set: user})    
}

//Reminder db commands
export async function inserReminder(r:reminder) {
    await client.db(dbn).collection("reminders").insertOne(r) 
}

export async function getReminder(id:string): Promise<reminder | null> {
    return await client.db(dbn).collection("reminders").findOne({_id:id}) 
}

export async function getReminders(q?:object): Promise<reminder[]> {
    if(q){
        return await client.db(dbn).collection("reminders").find(q).toArray()
    }
    return await client.db(dbn).collection("reminders").find({}).toArray()
}

export async function updateReminder(r:reminder) {
    await client.db(dbn).collection("reminders").updateOne({_id:r._id}, {$set: r})    
}

export async function deleteReminder(r:reminder) {
    await client.db(dbn).collection("reminders").deleteOne({_id:r._id})  
}

//Server db commands
export async function insertServer(s:server) {
    await client.db(dbn).collection("servers").insertOne(s)
}

export async function getServer(_id: string): Promise<server> {
    return client.db(dbn).collection("servers").findOne({ _id })!;
}

export async function updateServer(server: server, upsert: boolean) {
    client.db(dbn).collection("servers").updateOne({ _id: server._id }, { $set: server }, { upsert });
}

export async function deleteServer(_id: string) {
    client.db(dbn).collection("servers").deleteOne({ _id });
}