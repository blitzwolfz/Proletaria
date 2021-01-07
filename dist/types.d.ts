import { Client, Message } from "discord.js";
export interface Command {
    name: string;
    description: string;
    group: string;
    owner: boolean;
    execute(message: Message, client: Client, args?: string[], ownerID?: string): Promise<any>;
}
export interface user {
    _id: string;
    resources: {
        money: number;
        currencyname: string;
        food: number;
        people: number;
        peoplename: string;
    };
    army: number;
    armyname: string;
    navy: number;
    navyname: string;
}
export interface server {
    _id: string;
    name: string;
    prefix: string;
}
export interface reminder {
    _id: string;
    type: "food" | "work";
    time: number;
    channel: string;
}
